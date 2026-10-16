import React, { useState, useEffect, useCallback } from 'react';
import { DEFAULT_DATA } from './defaultData';
import { UI_TEXT, getActiveResume, getAllResumes } from './i18n';
import { buildExperienceDeck, buildEducationDeck } from './constants/visuals';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Interests from './components/Interests';
import Footer from './components/Footer';
import CarouselModal from './components/CarouselModal';

export default function App() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("usama_lang");
    if (saved && ["en", "it", "es"].includes(saved)) return saved;
    const browser = navigator.language?.slice(0, 2).toLowerCase();
    return ["it", "es"].includes(browser) ? browser : "en";
  });

  // Light / Dark Theme State with System Detection
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("usama_theme");
    if (saved === "light" || saved === "dark") return saved;
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    return "dark";
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const saved = localStorage.getItem("usama_theme");
      if (!saved) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("usama_theme", next);
      return next;
    });
  }, []);

  const [data, setData] = useState(DEFAULT_DATA);
  const [showAllExp, setShowAllExp] = useState(false);
  const [activeSkillIdx, setActiveSkillIdx] = useState(0);
  const [activeProjIdx, setActiveProjIdx] = useState(0);

  // Carousel Modal State
  const [modalDeck, setModalDeck] = useState(null);
  const [deckDirection, setDeckDirection] = useState(0);

  const [clock, setClock] = useState({ years: 6, months: 5, days: 14, hours: "00", mins: "00", secs: "00" });

  const ui = UI_TEXT[lang] || UI_TEXT.en;

  useEffect(() => {
    localStorage.setItem("usama_lang", lang);
    document.documentElement.lang = lang;

    const fileUrl = lang === "en" ? "./data.json" : `./data.${lang}.json`;
    fetch(fileUrl)
      .then((r) => (r.ok ? r.json() : fetch("./data.json").then((res) => res.json())))
      .then((json) => {
        setData(json);
        if (json.personal?.firstName && json.personal?.lastName) {
          const roleSubtitle = lang === "it"
            ? "Architettura Cloud & DevOps"
            : lang === "es"
            ? "Arquitectura Cloud y DevOps"
            : "Cloud & DevOps Architecture";
          document.title = `${json.personal.firstName} ${json.personal.lastName} — ${roleSubtitle}`;
        }
      })
      .catch(() => setData(DEFAULT_DATA));
  }, [lang]);

  // Live Experience Counter
  useEffect(() => {
    const startStr = data.experienceCounter?.startDate || "2020-05-01T00:00:00";
    const start = new Date(startStr);
    const tick = () => {
      const now = new Date();
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      if (days < 0) {
        months -= 1;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      setClock({
        years,
        months,
        days,
        hours: String(now.getHours()).padStart(2, "0"),
        mins: String(now.getMinutes()).padStart(2, "0"),
        secs: String(now.getSeconds()).padStart(2, "0")
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [data]);

  const { personal, experiences = [], education = [], skills = [], projects = [], interests = [] } = data;
  const latestExp = experiences[0] || {};
  const degrees = education.filter((e) => e.gpa);
  const scholarships = education.filter((e) => e.scholarship);

  const experienceDeck = buildExperienceDeck(experiences, ui);
  const educationDeck = buildEducationDeck(degrees, scholarships, ui);

  const openModalDeck = useCallback((items, index = 0, type = null) => {
    setDeckDirection(0);
    setModalDeck({ items, index, type });
  }, []);

  // Re-synchronize active modal deck content when language/data updates
  useEffect(() => {
    if (!modalDeck || !modalDeck.type) return;
    if (modalDeck.type === "experience") {
      setModalDeck((prev) => (prev ? { ...prev, items: experienceDeck } : null));
    } else if (modalDeck.type === "education") {
      setModalDeck((prev) => (prev ? { ...prev, items: educationDeck } : null));
    } else if (modalDeck.type === "bio") {
      const currentResume = getActiveResume(personal, lang);
      const allResumes = getAllResumes(personal, lang);
      const bioItem = {
        id: "bio-sheet",
        badge: ui.hero.badge,
        period: personal.location,
        title: `${personal.firstName} ${personal.lastName}`,
        subtitle: personal.email,
        img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85",
        highlights: [
          personal.bio,
          `${ui.hero.emailLabel || "Email"}: ${personal.email}`,
          `${ui.hero.phoneLabel || "Phone"}: ${personal.phone}`,
          `${ui.hero.locationLabel || "Location"}: ${personal.location}`
        ],
        links: [
          { label: `${ui.nav.resumeBtn} (${currentResume.label})`, url: currentResume.url },
          ...allResumes.filter((r) => !r.isActive).map((r) => ({ label: `${ui.nav.resumeBtn} (${r.nativeLabel || r.label})`, url: r.url })),
          ...(personal.socialLinks || []).map((s) => ({ label: s.platform, url: s.url }))
        ]
      };
      setModalDeck((prev) => (prev ? { ...prev, items: [bioItem, ...experienceDeck] } : null));
    }
  }, [experienceDeck, educationDeck, ui, personal, lang]);

  const stepModal = useCallback((dir) => {
    setDeckDirection(dir);
    setModalDeck((prev) => {
      if (!prev || prev.items.length <= 1) return prev;
      const nextIndex = (prev.index + dir + prev.items.length) % prev.items.length;
      return { ...prev, index: nextIndex };
    });
  }, []);

  const goToModalIndex = useCallback((idx) => {
    setModalDeck((prev) => {
      if (!prev || idx === prev.index) return prev;
      setDeckDirection(idx > prev.index ? 1 : -1);
      return { ...prev, index: idx };
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-slate-900 dark:bg-[#050508] dark:text-slate-100 relative selection:bg-sky-500 selection:text-white transition-colors duration-300">
      {/* Ambient Apple Mesh Backdrops */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-48 -left-40 w-[650px] h-[650px] rounded-full bg-sky-400/10 dark:bg-sky-500/15 blur-[150px] animate-float-slow" />
        <div className="absolute top-1/3 -right-48 w-[600px] h-[600px] rounded-full bg-purple-400/10 dark:bg-purple-600/15 blur-[160px] animate-float-slow" />
        <div className="absolute -bottom-48 left-1/4 w-[580px] h-[580px] rounded-full bg-rose-400/8 dark:bg-rose-500/10 blur-[150px] animate-float-slow" />
      </div>

      <Navbar
        personal={personal}
        ui={ui}
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <Hero
        personal={personal}
        latestExp={latestExp}
        ui={ui}
        lang={lang}
        experienceDeck={experienceDeck}
        openModalDeck={openModalDeck}
      />

      <Overview
        data={data}
        ui={ui}
        clock={clock}
        experienceDeck={experienceDeck}
        openModalDeck={openModalDeck}
      />

      <Experience
        experiences={experiences}
        personal={personal}
        ui={ui}
        lang={lang}
        showAllExp={showAllExp}
        setShowAllExp={setShowAllExp}
        experienceDeck={experienceDeck}
        openModalDeck={openModalDeck}
      />

      <Education
        degrees={degrees}
        scholarships={scholarships}
        ui={ui}
        educationDeck={educationDeck}
        openModalDeck={openModalDeck}
      />

      <Skills
        skills={skills}
        ui={ui}
        lang={lang}
        activeSkillIdx={activeSkillIdx}
        setActiveSkillIdx={setActiveSkillIdx}
      />

      <Projects
        projects={projects}
        ui={ui}
        lang={lang}
        activeProjIdx={activeProjIdx}
        setActiveProjIdx={setActiveProjIdx}
      />

      <Interests
        interests={interests}
        ui={ui}
      />

      <Footer personal={personal} />

      <CarouselModal
        modalDeck={modalDeck}
        setModalDeck={setModalDeck}
        deckDirection={deckDirection}
        stepModal={stepModal}
        goToModalIndex={goToModalIndex}
        ui={ui}
      />
    </div>
  );
}
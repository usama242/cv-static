import React, { useState, useEffect, useCallback } from 'react';
import { DEFAULT_DATA } from './defaultData';
import { getUiText, getActiveResume, getAllResumes, LANGUAGE_NAMES, LANGUAGE_FLAGS } from './i18n';
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
  const [availableLanguages, setAvailableLanguages] = useState([
    { code: "en", label: "EN", name: "English", flag: "🇬🇧", file: "./data.json" }
  ]);

  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("portfolio_lang") || localStorage.getItem("usama_lang");
    if (saved) return saved;
    const browser = navigator.language?.slice(0, 2).toLowerCase();
    return browser || "en";
  });

  // Light / Dark Theme State with System Detection
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("portfolio_theme") || localStorage.getItem("usama_theme");
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
      const saved = localStorage.getItem("portfolio_theme") || localStorage.getItem("usama_theme");
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
      localStorage.setItem("portfolio_theme", next);
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

  // 1. Initial Language Discovery: Inspect base data.json to dynamically discover supported languages
  useEffect(() => {
    let isMounted = true;

    fetch("./data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Could not fetch ./data.json");
        return res.json();
      })
      .then((baseJson) => {
        if (!isMounted) return;

        let langs = [];
        if (Array.isArray(baseJson.languages) && baseJson.languages.length > 0) {
          langs = baseJson.languages.map((l) => {
            const code = typeof l === "string" ? l : l.code;
            return {
              code,
              label: (typeof l === "object" && l.label) || code.toUpperCase(),
              name: (typeof l === "object" && l.name) || LANGUAGE_NAMES[code] || code.toUpperCase(),
              flag: (typeof l === "object" && l.flag) || LANGUAGE_FLAGS[code] || "🌐",
              file: (typeof l === "object" && l.file) || (code === "en" ? "./data.json" : `./data.${code}.json`)
            };
          });
        } else if (Array.isArray(baseJson.personal?.resumeDownloads) && baseJson.personal.resumeDownloads.length > 0) {
          langs = baseJson.personal.resumeDownloads.map((r) => ({
            code: r.lang,
            label: r.lang.toUpperCase(),
            name: r.label || LANGUAGE_NAMES[r.lang] || r.lang.toUpperCase(),
            flag: r.flag || LANGUAGE_FLAGS[r.lang] || "🌐",
            file: r.lang === "en" ? "./data.json" : `./data.${r.lang}.json`
          }));
        } else {
          langs = [{ code: "en", label: "EN", name: "English", flag: "🇬🇧", file: "./data.json" }];
        }

        setAvailableLanguages(langs);

        // Ensure current language is valid among discovered languages
        const validCodes = langs.map((l) => l.code);
        setLang((currLang) => {
          if (validCodes.includes(currLang)) return currLang;
          const browser = navigator.language?.slice(0, 2).toLowerCase();
          if (validCodes.includes(browser)) return browser;
          return validCodes[0] || "en";
        });
      })
      .catch((err) => {
        console.warn("Failed to discover languages from ./data.json:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Load localized data based on active language
  useEffect(() => {
    let isMounted = true;
    localStorage.setItem("portfolio_lang", lang);
    localStorage.setItem("usama_lang", lang);
    document.documentElement.lang = lang;

    const langConfig = availableLanguages.find((l) => l.code === lang);
    const fileUrl = langConfig?.file || (lang === "en" ? "./data.json" : `./data.${lang}.json`);

    fetch(fileUrl)
      .then((res) => {
        if (!res.ok) {
          // If the localized file is missing, fall back to base ./data.json instead of throwing error
          if (fileUrl !== "./data.json") {
            console.warn(`Language file "${fileUrl}" not found. Gracefully falling back to "./data.json".`);
            return fetch("./data.json").then((r) => {
              if (!r.ok) throw new Error("Fallback to ./data.json failed");
              return r.json();
            });
          }
          throw new Error("Failed to load ./data.json");
        }
        return res.json();
      })
      .then((json) => {
        if (!isMounted) return;
        setData(json);

        // Dynamically update document title from personal information
        const firstName = json.personal?.firstName || "";
        const lastName = json.personal?.lastName || "";
        const name = `${firstName} ${lastName}`.trim();
        const role = json.personal?.title || json.personal?.role || "";
        document.title = [name, role].filter(Boolean).join(" — ") || "Portfolio";

        // Dynamically update favicon if provided
        if (json.personal?.favicon) {
          const link = document.querySelector("link[rel*='icon']");
          if (link) link.href = json.personal.favicon;
        }
      })
      .catch((err) => {
        console.warn("Error loading data file:", err);
        if (isMounted) setData(DEFAULT_DATA);
      });

    return () => {
      isMounted = false;
    };
  }, [lang, availableLanguages]);

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
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours: String(now.getHours()).padStart(2, "0"),
        mins: String(now.getMinutes()).padStart(2, "0"),
        secs: String(now.getSeconds()).padStart(2, "0")
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [data]);

  const ui = getUiText(lang, data.ui);

  const { personal = {}, experiences = [], education = [], skills = [], projects = [], interests = [] } = data;
  const latestExp = experiences[0] || {};
  const degrees = education.filter((e) => !e.scholarship && e.type !== "certificate" && e.type !== "scholarship");
  const scholarships = education.filter((e) => e.scholarship || e.type === "certificate" || e.type === "scholarship");

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
      const heroBadge = personal.title || personal.role || ui.hero.badge || "Portfolio";
      const bioItem = {
        id: "bio-sheet",
        badge: heroBadge,
        period: personal.location,
        title: `${personal.firstName || ""} ${personal.lastName || ""}`.trim(),
        subtitle: personal.email,
        img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85",
        highlights: [
          personal.bio,
          ...(personal.email ? [`${ui.hero.emailLabel || "Email"}: ${personal.email}`] : []),
          ...(personal.phone ? [`${ui.hero.phoneLabel || "Phone"}: ${personal.phone}`] : []),
          ...(personal.location ? [`${ui.hero.locationLabel || "Location"}: ${personal.location}`] : [])
        ],
        links: [
          ...(currentResume ? [{ label: `${ui.nav.resumeBtn} (${currentResume.label})`, url: currentResume.url }] : []),
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
      {/* Ambient Mesh Backdrops */}
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
        availableLanguages={availableLanguages}
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
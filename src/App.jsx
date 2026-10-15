import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEFAULT_DATA } from './defaultData';
import { UI_TEXT } from './i18n';

const ROLE_VISUALS = [
  {
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1400&q=85",
    accent: "text-sky-400",
    border: "hover:border-sky-400/60",
    badge: "bg-sky-500/20 text-sky-300 border-sky-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    accent: "text-violet-400",
    border: "hover:border-violet-400/60",
    badge: "bg-violet-500/20 text-violet-300 border-violet-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
    accent: "text-emerald-400",
    border: "hover:border-emerald-400/60",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80",
    accent: "text-amber-400",
    border: "hover:border-amber-400/60",
    badge: "bg-amber-500/20 text-amber-300 border-amber-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    accent: "text-cyan-400",
    border: "hover:border-cyan-400/60",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    accent: "text-rose-400",
    border: "hover:border-rose-400/60",
    badge: "bg-rose-500/20 text-rose-300 border-rose-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    accent: "text-indigo-400",
    border: "hover:border-indigo-400/60",
    badge: "bg-indigo-500/20 text-indigo-300 border-indigo-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80",
    accent: "text-teal-400",
    border: "hover:border-teal-400/60",
    badge: "bg-teal-500/20 text-teal-300 border-teal-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
    accent: "text-fuchsia-400",
    border: "hover:border-fuchsia-400/60",
    badge: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/30"
  }
];

const INTEREST_IMAGES = [
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80"
];

function getBentoSpan(index, total) {
  if (total === 4) return "md:col-span-6";
  if (total === 5) return index < 2 ? "md:col-span-6" : "md:col-span-4";
  if (total % 3 === 1 && index === total - 1) return "md:col-span-12";
  if (total % 3 === 2 && index >= total - 2) return "md:col-span-6";
  return "md:col-span-4";
}

export default function App() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("usama_lang");
    if (saved && ["en", "it", "es"].includes(saved)) return saved;
    const browser = navigator.language?.slice(0, 2).toLowerCase();
    return ["it", "es"].includes(browser) ? browser : "en";
  });

  const [data, setData] = useState(DEFAULT_DATA);
  const [showAllExp, setShowAllExp] = useState(false);
  const [activeSkillIdx, setActiveSkillIdx] = useState(0);
  const [activeProjIdx, setActiveProjIdx] = useState(0);

  // Carousel Modal State: { items: Array<Card>, index: number } | null
  const [modalDeck, setModalDeck] = useState(null);

  const [clock, setClock] = useState({ years: 6, months: 5, days: 14, hours: "00", mins: "00", secs: "00" });

  const ui = UI_TEXT[lang] || UI_TEXT.en;

  useEffect(() => {
    localStorage.setItem("usama_lang", lang);
    document.documentElement.lang = lang;

    const fileUrl = lang === "en" ? "./data.json" : `./data.${lang}.json`;
    fetch(fileUrl)
      .then((r) => (r.ok ? r.json() : fetch("./data.json").then((res) => res.json())))
      .then((json) => setData(json))
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
  const coreRecentExp = experiences.slice(1, 4);
  const earlierExp = experiences.slice(4);
  const degrees = education.filter((e) => e.gpa);
  const scholarships = education.filter((e) => e.scholarship);

  const currentSkillGroup = skills[activeSkillIdx] || skills[0] || { category: "", items: [] };
  const currentProjGroup = projects[activeProjIdx] || projects[0] || { category: "", items: [] };

  // Build normalized decks for seamless Left/Right Cover-Flow navigation
  const experienceDeck = experiences.map((exp, i) => {
    const vis = ROLE_VISUALS[i % ROLE_VISUALS.length];
    return {
      id: `exp-${i}`,
      badge: i === 0 ? ui.experience.latestBadge : exp.company,
      period: exp.period,
      title: exp.role,
      subtitle: exp.company,
      img: vis.img,
      highlights: exp.highlights || [],
      links: exp.companyUrl ? [{ label: exp.company, url: exp.companyUrl }] : []
    };
  });

  const orderedEducation = [...degrees, ...scholarships];
  const educationDeck = orderedEducation.map((edu, i) => {
    const isDeg = Boolean(edu.gpa);
    const img = isDeg
      ? i === 0
        ? "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
        : "https://images.unsplash.com/photo-1517976487468-f20514c44525?auto=format&fit=crop&w=1200&q=80"
      : "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1100&q=80";

    return {
      id: `edu-${i}`,
      badge: isDeg ? edu.gpa?.text : ui.education.scholarshipLabel,
      period: edu.period,
      title: edu.program,
      subtitle: edu.institution,
      img,
      highlights: edu.scholarship ? [edu.scholarship.text, ...(edu.highlights || [])] : edu.highlights || [],
      links: [
        ...(edu.programUrl ? [{ label: edu.programDownload ? "Degree PDF" : "Program", url: edu.programUrl }] : []),
        ...(edu.gpa?.url ? [{ label: edu.gpa.text, url: edu.gpa.url }] : []),
        ...(edu.scholarship?.credentialUrl ? [{ label: "Certificate", url: edu.scholarship.credentialUrl }] : []),
        ...(edu.institutionUrl ? [{ label: edu.institution, url: edu.institutionUrl }] : [])
      ]
    };
  });

  // Carousel Navigation Handlers
  const stepModal = useCallback((dir) => {
    setModalDeck((prev) => {
      if (!prev || prev.items.length <= 1) return prev;
      const nextIndex = (prev.index + dir + prev.items.length) % prev.items.length;
      return { ...prev, index: nextIndex };
    });
  }, []);

  useEffect(() => {
    if (!modalDeck) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setModalDeck(null);
      if (e.key === "ArrowLeft") stepModal(-1);
      if (e.key === "ArrowRight") stepModal(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalDeck, stepModal]);

  const activeCard = modalDeck ? modalDeck.items[modalDeck.index] : null;
  const hasMultipleCards = modalDeck && modalDeck.items.length > 1;
  const prevIndex = hasMultipleCards ? (modalDeck.index - 1 + modalDeck.items.length) % modalDeck.items.length : null;
  const nextIndex = hasMultipleCards ? (modalDeck.index + 1) % modalDeck.items.length : null;
  const prevCard = prevIndex !== null ? modalDeck.items[prevIndex] : null;
  const nextCard = nextIndex !== null ? modalDeck.items[nextIndex] : null;

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 relative selection:bg-sky-500 selection:text-white">
      {/* Ambient Apple Mesh Backdrops */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-48 -left-40 w-[650px] h-[650px] rounded-full bg-sky-500/15 blur-[150px] animate-float-slow" />
        <div className="absolute top-1/3 -right-48 w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[160px] animate-float-slow" />
        <div className="absolute -bottom-48 left-1/4 w-[580px] h-[580px] rounded-full bg-rose-500/10 blur-[150px] animate-float-slow" />
      </div>

      {/* Sticky Frosted Glass Navbar */}
      <header className="fixed top-0 inset-x-0 h-16 bg-[#08080c]/75 backdrop-blur-2xl border-b border-white/10 z-40">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-3">
          <a href="#hero" className="flex items-center gap-2.5 font-bold tracking-tight text-white shrink-0">
            <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-rose-500" />
            <span>{personal.firstName} <span className="text-sky-400 hidden sm:inline">{personal.lastName}</span></span>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <a href="#overview" className="hover:text-white transition">{ui.nav.overview}</a>
            <a href="#experience" className="hover:text-white transition">{ui.nav.experience}</a>
            <a href="#education" className="hover:text-white transition">{ui.nav.credentials}</a>
            <a href="#skills" className="hover:text-white transition">{ui.nav.arsenal}</a>
            <a href="#projects" className="hover:text-white transition">{ui.nav.projects}</a>
            <a href="#interests" className="hover:text-white transition">{ui.nav.lifestyle}</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center bg-white/5 p-1 rounded-full border border-white/10">
              {[
                { code: "en", label: "EN", title: "English" },
                { code: "it", label: "IT", title: "Italiano" },
                { code: "es", label: "ES", title: "Español" }
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  title={l.title}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold transition ${lang === l.code
                      ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                    }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <a
              href={personal.resumeDownloads?.[0]?.url || "assets/Resume_MohamadUsamaKUNNATHUR_DevOps.pdf"}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-sky-500/25 hover:brightness-110 transition shrink-0"
            >
              <i className="fas fa-file-arrow-down sm:mr-1.5" />
              <span className="hidden sm:inline">{ui.nav.resumeBtn}</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-32 pb-24 px-6 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[36px] overflow-hidden border border-white/15 bg-[#0c0d14] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=85"
              alt="Cloud Network"
              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-sky-950/80 via-[#07080d]/90 to-purple-950/80" />

            <div className="relative z-10 p-8 md:p-16 lg:p-20 grid lg:grid-cols-12 gap-10 items-center">
              <motion.div
                key={lang}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-8 space-y-6"
              >
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider uppercase text-sky-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {ui.hero.badge} • {personal.location}
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.04]">
                  {ui.hero.titleLine1}<br />
                  <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">
                    {ui.hero.titleLine2}
                  </span>
                </h1>

                <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                  {personal.bio}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#experience"
                    className="px-7 py-3.5 rounded-full font-semibold text-sm bg-white text-slate-950 hover:bg-sky-400 transition shadow-xl"
                  >
                    {ui.hero.exploreBtn} <i className="fas fa-arrow-down ml-2" />
                  </a>
                  <button
                    onClick={() =>
                      setModalDeck({
                        index: 0,
                        items: [
                          {
                            id: "bio-sheet",
                            badge: ui.hero.badge,
                            period: personal.location,
                            title: `${personal.firstName} ${personal.lastName}`,
                            subtitle: personal.email,
                            img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85",
                            highlights: [
                              personal.bio,
                              `Email: ${personal.email}`,
                              `Phone: ${personal.phone}`,
                              `Location: ${personal.location}`
                            ],
                            links: [
                              { label: ui.nav.resumeBtn, url: personal.resumeDownloads?.[0]?.url || "assets/Resume_MohamadUsamaKUNNATHUR_DevOps.pdf" },
                              ...(personal.socialLinks || []).map((s) => ({ label: s.platform, url: s.url }))
                            ]
                          },
                          ...experienceDeck
                        ]
                      })
                    }
                    className="px-7 py-3.5 rounded-full font-semibold text-sm bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white transition"
                  >
                    {ui.hero.contactBtn}
                  </button>
                  <div className="flex items-center gap-2.5 ml-2">
                    {(personal.socialLinks || []).map((s, i) => (
                      <a
                        key={i}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-11 h-11 rounded-full bg-white/10 hover:bg-sky-500 border border-white/15 grid place-items-center text-white transition"
                        title={s.platform}
                      >
                        <i className={s.icon} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-sky-500 via-violet-500 to-rose-500 opacity-75 blur-xl group-hover:opacity-100 transition duration-500" />
                  <div className="relative rounded-[28px] overflow-hidden border-2 border-white/25 bg-slate-900 w-72 sm:w-80 shadow-2xl">
                    <img
                      src={personal.profileImage || "assets/img/profile.jpg"}
                      alt={personal.pageTitle}
                      className="w-full h-80 object-cover object-top group-hover:scale-105 transition duration-700"
                    />
                    <div className="p-4 bg-slate-950/90 backdrop-blur-md border-t border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider">{ui.hero.currentMission}</p>
                        <p className="text-sm font-bold text-white">{latestExp.company} • {latestExp.role}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        {ui.hero.active}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO EXECUTIVE OVERVIEW */}
      <section id="overview" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">{ui.overview.eyebrow}</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">{ui.overview.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-7 relative rounded-[30px] overflow-hidden border border-white/15 bg-gradient-to-br from-sky-950/60 via-[#0d0f18] to-indigo-950/60 p-8 flex flex-col justify-between shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                alt="Telemetry"
                className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-screen"
              />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  <i className="fas fa-satellite-dish animate-pulse" /> {data.experienceCounter?.title}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold mt-4">{ui.overview.uptimeTitle}</h3>
                <p className="text-slate-400 text-sm mt-1">{ui.overview.uptimeDesc}</p>
              </div>

              <div className="relative z-10 grid grid-cols-3 sm:grid-cols-6 gap-3 mt-8">
                {[
                  { label: ui.overview.units[0], val: clock.years, color: "text-sky-400" },
                  { label: ui.overview.units[1], val: clock.months, color: "text-indigo-400" },
                  { label: ui.overview.units[2], val: clock.days, color: "text-violet-400" },
                  { label: ui.overview.units[3], val: clock.hours, color: "text-fuchsia-400" },
                  { label: ui.overview.units[4], val: clock.mins, color: "text-rose-400" },
                  { label: ui.overview.units[5], val: clock.secs, color: "text-emerald-400" }
                ].map((unit, i) => (
                  <div key={i} className="rounded-2xl bg-black/45 backdrop-blur-md border border-white/10 p-3 text-center">
                    <div className={`font-mono text-2xl sm:text-3xl font-extrabold ${unit.color}`}>{unit.val}</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-1">{unit.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => setModalDeck({ items: experienceDeck, index: 0 })}
              className="md:col-span-5 cursor-pointer relative rounded-[30px] overflow-hidden border border-white/15 bg-gradient-to-br from-purple-950/60 via-[#0d0f18] to-rose-950/50 p-8 flex flex-col justify-between shadow-xl group"
            >
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
                alt="Analytics"
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition duration-700"
              />
              <div className="relative z-10">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-400/30">
                  {ui.overview.finopsBadge}
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white mt-5 tracking-tight">
                  $10k<span className="text-rose-400 text-2xl font-bold">{ui.overview.savedUnit}</span>
                </div>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">{ui.overview.finopsDesc}</p>
              </div>
              <div className="relative z-10 pt-6 flex items-center text-xs font-bold text-rose-300 group-hover:translate-x-1 transition">
                {ui.overview.finopsCta} <i className="fas fa-arrow-right ml-2" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">{ui.experience.eyebrow}</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">{ui.experience.title}</h2>
            </div>
            <button
              onClick={() => setShowAllExp(!showAllExp)}
              className="self-start md:self-auto px-5 py-2.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition flex items-center gap-2"
            >
              <i className={`fas ${showAllExp ? 'fa-compress-alt' : 'fa-layer-group'} text-sky-400`} />
              {showAllExp ? ui.experience.showCompact : `${ui.experience.expandAll} ${experiences.length} ${ui.experience.careerRoles}`}
            </button>
          </div>

          {latestExp.role && (
            <motion.div
              whileHover={{ scale: 1.008 }}
              onClick={() => setModalDeck({ items: experienceDeck, index: 0 })}
              className="cursor-pointer relative rounded-[32px] overflow-hidden border border-sky-400/40 bg-[#0d101b] shadow-2xl group"
            >
              <div className="grid lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-br from-sky-950/50 via-[#0d101b] to-indigo-950/40">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        {ui.experience.latestBadge}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{latestExp.period}</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black text-white">
                      {latestExp.role} <span className="text-sky-400">@ {latestExp.company}</span>
                    </h3>
                    <p className="text-slate-300 text-base leading-relaxed">
                      {latestExp.highlights?.[0]} {latestExp.highlights?.[1]}
                    </p>
                  </div>

                  <div className="pt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 mt-8">
                    <div className="flex flex-wrap gap-2">
                      {["NEXI Blockchain", "Linux VMs", "Kubernetes", "Playwright", "Selenium", "Postman"].map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-sky-400 group-hover:translate-x-1 transition">
                      {ui.experience.openSpec} ({latestExp.highlights?.length} {ui.experience.deliverables}) &rarr;
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 relative min-h-[260px] overflow-hidden">
                  <img
                    src={ROLE_VISUALS[0].img}
                    alt={latestExp.company}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0d101b] via-[#0d101b]/40 to-transparent" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Symmetric 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreRecentExp.map((exp, idx) => {
              const vis = ROLE_VISUALS[idx + 1] || ROLE_VISUALS[0];
              return (
                <motion.article
                  key={idx}
                  whileHover={{ y: -8 }}
                  onClick={() => setModalDeck({ items: experienceDeck, index: idx + 1 })}
                  className={`cursor-pointer rounded-[28px] overflow-hidden border border-white/10 ${vis.border} bg-[#0e1017] flex flex-col justify-between transition duration-300 shadow-xl group`}
                >
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img src={vis.img} alt={exp.company} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-transparent to-transparent" />
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${vis.badge}`}>
                        {exp.period}
                      </span>
                    </div>

                    <div className="p-6">
                      <h4 className="text-2xl font-bold text-white">{exp.company}</h4>
                      <p className={`text-sm font-semibold mt-0.5 ${vis.accent}`}>{exp.role}</p>
                      <p className="text-slate-400 text-sm mt-3 line-clamp-3">{exp.highlights?.[0]}</p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-white">
                    <span>{ui.experience.inspectHighlights} ({exp.highlights?.length || 0})</span>
                    <i className={`fas fa-plus-circle text-base ${vis.accent}`} />
                  </div>
                </motion.article>
              );
            })}
          </div>

          <AnimatePresence>
            {showAllExp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden pt-4"
              >
                <h3 className="text-xl font-bold text-slate-200 mb-6">{ui.experience.earlierHeading}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {earlierExp.map((exp, idx) => {
                    const vis = ROLE_VISUALS[(idx + 4) % ROLE_VISUALS.length];
                    return (
                      <motion.article
                        key={idx}
                        whileHover={{ y: -6 }}
                        onClick={() => setModalDeck({ items: experienceDeck, index: idx + 4 })}
                        className={`cursor-pointer rounded-[26px] overflow-hidden border border-white/10 ${vis.border} bg-[#0e1017] flex flex-col justify-between transition group`}
                      >
                        <div>
                          <div className="relative h-36 overflow-hidden">
                            <img src={vis.img} alt={exp.company} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] to-transparent" />
                            <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${vis.badge}`}>
                              {exp.period}
                            </span>
                          </div>
                          <div className="p-6">
                            <h4 className="text-xl font-bold text-white">{exp.company}</h4>
                            <p className={`text-xs font-semibold mt-0.5 ${vis.accent}`}>{exp.role}</p>
                            <p className="text-slate-400 text-sm mt-2.5 line-clamp-2">{exp.highlights?.[0]}</p>
                          </div>
                        </div>
                        <div className="px-6 pb-5 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-white">
                          <span>{ui.experience.inspectRole}</span>
                          <i className={`fas fa-arrow-up-right-from-square ${vis.accent}`} />
                        </div>
                      </motion.article>
                    );
                  })}

                  <motion.a
                    whileHover={{ y: -6 }}
                    href={personal.resumeDownloads?.[0]?.url || "assets/Resume_MohamadUsamaKUNNATHUR_DevOps.pdf"}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[26px] p-7 border border-dashed border-sky-400/40 bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-purple-500/15 flex flex-col justify-between group"
                  >
                    <div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300">
                        {ui.experience.dossierBadge}
                      </span>
                      <h4 className="text-2xl font-extrabold text-white mt-4">{ui.experience.dossierTitle}</h4>
                      <p className="text-slate-300 text-sm mt-2">{ui.experience.dossierDesc}</p>
                    </div>
                    <div className="pt-6 text-xs font-bold text-sky-300 group-hover:translate-x-1 transition">
                      {ui.experience.dossierCta} <i className="fas fa-file-pdf ml-1.5" />
                    </div>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* EDUCATION & GLOBAL SCHOLARSHIPS */}
      <section id="education" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">{ui.education.eyebrow}</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">{ui.education.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {degrees.map((deg, idx) => {
              const img = idx === 0
                ? "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
                : "https://images.unsplash.com/photo-1517976487468-f20514c44525?auto=format&fit=crop&w=1200&q=80";
              return (
                <motion.article
                  key={idx}
                  whileHover={{ y: -6 }}
                  onClick={() => setModalDeck({ items: educationDeck, index: idx })}
                  className="cursor-pointer rounded-[30px] overflow-hidden border border-white/15 hover:border-amber-400/60 bg-[#0e1017] flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden">
                      <img src={img} alt={deg.institution} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-[#0e1017]/40 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/25 text-amber-300 border border-amber-400/40 backdrop-blur-md">
                          <i className="fas fa-graduation-cap mr-1" /> {deg.gpa?.text}
                        </span>
                      </div>
                      <span className="absolute bottom-3 left-6 text-xs font-mono text-slate-300">{deg.period}</span>
                    </div>
                    <div className="p-7">
                      <h3 className="text-2xl font-extrabold text-white">{deg.program}</h3>
                      <p className="text-amber-400 font-semibold text-sm mt-1">{deg.institution}</p>
                      <p className="text-slate-300 text-sm mt-3">{deg.highlights?.[0]}</p>
                    </div>
                  </div>
                  <div className="px-7 pb-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-amber-300">
                    <span>{ui.education.verifyDegCta}</span>
                    <i className="fas fa-arrow-right" />
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scholarships.map((sch, idx) => {
              const colors = [
                "from-emerald-500/20 to-teal-900/30 border-emerald-400/30 text-emerald-300",
                "from-sky-500/20 to-indigo-900/30 border-sky-400/30 text-sky-300",
                "from-purple-500/20 to-fuchsia-900/30 border-purple-400/30 text-purple-300"
              ][idx % 3];
              return (
                <motion.article
                  key={idx}
                  whileHover={{ y: -6 }}
                  onClick={() => setModalDeck({ items: educationDeck, index: degrees.length + idx })}
                  className={`cursor-pointer rounded-[26px] p-7 border bg-gradient-to-br ${colors} flex flex-col justify-between shadow-lg group`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono opacity-80">
                      <span><i className="fas fa-award mr-1" /> {ui.education.scholarshipLabel}</span>
                      <span>{sch.period}</span>
                    </div>
                    <h4 className="text-xl font-extrabold text-white mt-4">{sch.program}</h4>
                    <p className="text-xs font-semibold uppercase tracking-wider mt-1 opacity-90">{sch.institution}</p>
                    <p className="text-slate-200 text-sm mt-3">{sch.scholarship?.text}</p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white">
                    <span>{ui.education.inspectCert}</span>
                    <i className="fas fa-external-link-alt group-hover:translate-x-1 transition" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECHNICAL ARSENAL */}
      <section id="skills" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">{ui.skills.eyebrow}</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">{ui.skills.title}</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSkillIdx(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition ${activeSkillIdx === idx
                      ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25"
                      : "bg-white/5 hover:bg-white/15 text-slate-300 border border-white/10"
                    }`}
                >
                  {s.category} ({s.items.length})
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={`${lang}-${activeSkillIdx}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-5"
          >
            {currentSkillGroup.items.map((item, idx) => {
              const spanClass = getBentoSpan(idx, currentSkillGroup.items.length);
              const isLang = activeSkillIdx === 4;
              const pct = item.icon.includes("full") ? 100 : 78;
              return (
                <div
                  key={idx}
                  className={`${spanClass} rounded-[24px] p-6 border border-white/10 hover:border-sky-400/50 bg-[#0d1018]/90 backdrop-blur-xl flex items-start gap-4 transition group`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500/20 to-purple-500/20 border border-white/10 grid place-items-center text-sky-400 text-xl shrink-0 group-hover:scale-110 transition">
                    <i className={item.icon} />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-white leading-snug">{item.text}</p>
                    {isLang ? (
                      <div className="mt-3">
                        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-400 mt-1 inline-block">
                          {pct === 100 ? ui.skills.nativeFluency : ui.skills.workingFluency}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 mt-1 inline-block">
                        {currentSkillGroup.category} {ui.skills.ecosystem}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* PROJECTS & RESEARCH PUBLICATIONS */}
      <section id="projects" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-400">{ui.projects.eyebrow}</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">{ui.projects.title}</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {projects.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveProjIdx(idx)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition ${activeProjIdx === idx
                      ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg"
                      : "bg-white/5 hover:bg-white/15 text-slate-300 border border-white/10"
                    }`}
                >
                  {p.category} ({p.items.length})
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={`${lang}-${activeProjIdx}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {currentProjGroup.items.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                onClick={() => {
                  if (item.url) window.open(item.url, "_blank");
                }}
                className={`rounded-[26px] p-7 border border-white/10 ${item.url ? "hover:border-rose-400/60 cursor-pointer" : ""
                  } bg-gradient-to-b from-white/[0.06] to-[#0b0d14] flex flex-col justify-between group`}
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-rose-500/15 border border-rose-400/30 grid place-items-center text-rose-400 text-lg mb-5">
                    <i className={item.icon} />
                  </div>
                  <h4 className="text-lg font-bold text-white leading-snug">{item.text}</h4>
                </div>
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold">
                  {item.url ? (
                    <span className="text-rose-300 group-hover:translate-x-1 transition">
                      {ui.projects.inspectOn} {activeProjIdx === 0 ? "GitHub" : "ResearchGate"} &rarr;
                    </span>
                  ) : (
                    <span className="text-slate-400">{ui.projects.researchPaper}</span>
                  )}
                  <i className="fas fa-arrow-up-right-from-square text-slate-400" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* INTERESTS / LIFESTYLE BENTO */}
      <section id="interests" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">{ui.interests.eyebrow}</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">{ui.interests.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {interests.map((int, idx) => {
              const span = getBentoSpan(idx, interests.length);
              const bgImg = INTEREST_IMAGES[idx % INTEREST_IMAGES.length];
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.015 }}
                  className={`${span} relative rounded-[28px] overflow-hidden border border-white/15 min-h-[240px] p-7 flex flex-col justify-end group shadow-xl`}
                >
                  <img
                    src={bgImg}
                    alt={int.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 grid place-items-center text-sky-300 mb-3">
                      <i className={int.icon} />
                    </div>
                    <h3 className="text-xl font-extrabold text-white">{int.title}</h3>
                    <p className="text-slate-200 text-sm mt-1">{int.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-6 relative z-10 bg-[#040407]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-400">
          <div>
            <p className="font-bold text-white">{personal.firstName} {personal.lastName}</p>
            <p>{personal.location} • {personal.email} • {personal.phone}</p>
          </div>
          <div className="flex items-center gap-3">
            {(personal.socialLinks || []).map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-sky-500 text-white grid place-items-center transition"
              >
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* =====================================================================
          APPLE 3D COVER-FLOW / STAGE MANAGER CAROUSEL MODAL
         ===================================================================== */}
      <AnimatePresence>
        {modalDeck && activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalDeck(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-50 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
          >
            {/* 3D Stage Container */}
            <div
              className="relative w-full max-w-7xl flex items-center justify-center"
              style={{ perspective: "1600px" }}
            >
              {/* LEFT BLURRED BACKGROUND CARD (Click to bring into focus) */}
              {hasMultipleCards && prevCard && (
                <motion.div
                  key={`prev-${prevCard.id}`}
                  initial={{ opacity: 0, x: -460, scale: 0.7, rotateY: 22 }}
                  animate={{ opacity: 0.42, x: -390, scale: 0.78, rotateY: 16 }}
                  whileHover={{ opacity: 0.72, scale: 0.82, x: -370 }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    stepModal(-1);
                  }}
                  className="hidden lg:flex flex-col w-[520px] h-[520px] rounded-[30px] overflow-hidden border border-white/15 bg-[#0e1018] shadow-2xl cursor-pointer absolute z-10 blur-[2.5px] hover:blur-[0.5px] transition-all"
                  title={`Previous: ${prevCard.subtitle} — ${prevCard.title}`}
                >
                  <div className="relative h-44 w-full shrink-0 overflow-hidden">
                    <img src={prevCard.img} alt={prevCard.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1018] via-[#0e1018]/50 to-transparent" />
                    <span className="absolute top-4 left-5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 text-white backdrop-blur-md">
                      &larr; Previous
                    </span>
                    <span className="absolute bottom-3 left-5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/30 text-sky-200 border border-sky-400/40">
                      {prevCard.badge} • {prevCard.period}
                    </span>
                  </div>
                  <div className="p-7 space-y-4 overflow-hidden">
                    <div>
                      <h4 className="text-2xl font-black text-white truncate">{prevCard.title}</h4>
                      <p className="text-sky-400 font-semibold text-sm">{prevCard.subtitle}</p>
                    </div>
                    <ul className="space-y-2.5">
                      {(prevCard.highlights || []).slice(0, 3).map((h, i) => (
                        <li key={i} className="text-slate-300 text-xs line-clamp-2 flex items-start gap-2">
                          <span className="text-sky-400">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* CENTER ACTIVE FOCUS CARD */}
              <motion.div
                key={`active-${activeCard.id}`}
                initial={{ opacity: 0, scale: 0.9, y: 24 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-30 w-full max-w-2xl rounded-[32px] overflow-hidden border border-white/25 bg-[#0e1018] shadow-[0_30px_90px_rgba(0,0,0,0.85)] max-h-[84vh] flex flex-col select-text"
              >
                {activeCard.img && (
                  <div className="relative h-56 w-full shrink-0 overflow-hidden">
                    <img src={activeCard.img} alt={activeCard.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1018] via-[#0e1018]/40 to-transparent" />

                    {/* Top Right Counter & Close Controls */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      {hasMultipleCards && (
                        <span className="px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-black/60 text-slate-200 border border-white/15 backdrop-blur-md">
                          {modalDeck.index + 1} / {modalDeck.items.length}
                        </span>
                      )}
                      <button
                        onClick={() => setModalDeck(null)}
                        className="w-10 h-10 rounded-full bg-black/60 hover:bg-rose-500 text-white grid place-items-center text-xl border border-white/20 transition"
                        aria-label="Close modal"
                      >
                        &times;
                      </button>
                    </div>

                    <span className="absolute bottom-4 left-7 px-3.5 py-1 rounded-full text-xs font-bold bg-sky-500/30 text-sky-200 border border-sky-400/40 backdrop-blur-md">
                      {activeCard.badge} • {activeCard.period}
                    </span>
                  </div>
                )}

                <div className="p-7 sm:p-9 overflow-y-auto space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">{activeCard.title}</h3>
                    <p className="text-sky-400 font-semibold text-base mt-1">{activeCard.subtitle}</p>
                  </div>

                  <ul className="space-y-3.5">
                    {(activeCard.highlights || []).map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-200 text-sm sm:text-base leading-relaxed">
                        <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 grid place-items-center text-xs font-bold shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom Action Links + Quick Prev/Next Controls */}
                  <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-3">
                      {(activeCard.links || []).map((lnk, i) => (
                        <a
                          key={i}
                          href={lnk.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:brightness-110 transition shadow-lg shadow-sky-500/20"
                        >
                          {lnk.label} <i className="fas fa-arrow-up-right-from-square ml-1.5" />
                        </a>
                      ))}
                    </div>

                    {hasMultipleCards && (
                      <div className="flex items-center gap-2 ml-auto">
                        <button
                          onClick={() => stepModal(-1)}
                          className="px-3.5 py-2 rounded-full text-xs font-bold bg-white/5 hover:bg-white/15 border border-white/15 text-slate-200 transition flex items-center gap-1.5"
                          title="Previous Card (Left Arrow)"
                        >
                          <i className="fas fa-chevron-left text-sky-400" /> Prev
                        </button>
                        <button
                          onClick={() => stepModal(1)}
                          className="px-3.5 py-2 rounded-full text-xs font-bold bg-white/5 hover:bg-white/15 border border-white/15 text-slate-200 transition flex items-center gap-1.5"
                          title="Next Card (Right Arrow)"
                        >
                          Next <i className="fas fa-chevron-right text-sky-400" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* RIGHT BLURRED BACKGROUND CARD (Click to bring into focus) */}
              {hasMultipleCards && nextCard && (
                <motion.div
                  key={`next-${nextCard.id}`}
                  initial={{ opacity: 0, x: 460, scale: 0.7, rotateY: -22 }}
                  animate={{ opacity: 0.42, x: 390, scale: 0.78, rotateY: -16 }}
                  whileHover={{ opacity: 0.72, scale: 0.82, x: 370 }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    stepModal(1);
                  }}
                  className="hidden lg:flex flex-col w-[520px] h-[520px] rounded-[30px] overflow-hidden border border-white/15 bg-[#0e1018] shadow-2xl cursor-pointer absolute z-10 blur-[2.5px] hover:blur-[0.5px] transition-all"
                  title={`Next: ${nextCard.subtitle} — ${nextCard.title}`}
                >
                  <div className="relative h-44 w-full shrink-0 overflow-hidden">
                    <img src={nextCard.img} alt={nextCard.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1018] via-[#0e1018]/50 to-transparent" />
                    <span className="absolute top-4 right-5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 text-white backdrop-blur-md">
                      Next &rarr;
                    </span>
                    <span className="absolute bottom-3 left-5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/30 text-sky-200 border border-sky-400/40">
                      {nextCard.badge} • {nextCard.period}
                    </span>
                  </div>
                  <div className="p-7 space-y-4 overflow-hidden">
                    <div>
                      <h4 className="text-2xl font-black text-white truncate">{nextCard.title}</h4>
                      <p className="text-sky-400 font-semibold text-sm">{nextCard.subtitle}</p>
                    </div>
                    <ul className="space-y-2.5">
                      {(nextCard.highlights || []).slice(0, 3).map((h, i) => (
                        <li key={i} className="text-slate-300 text-xs line-clamp-2 flex items-start gap-2">
                          <span className="text-sky-400">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Apple-Style Interactive Pagination Dots at Bottom */}
            {hasMultipleCards && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md z-30"
              >
                {modalDeck.items.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setModalDeck({ ...modalDeck, index: idx })}
                    title={`${item.subtitle} — ${item.title}`}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === modalDeck.index
                        ? "w-7 bg-sky-400"
                        : "w-2 bg-white/25 hover:bg-white/60"
                      }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEFAULT_DATA } from './defaultData';

// Curated High-Res Visuals & Multi-Color Gradients for Apple Product-Page Aesthetic
const ROLE_VISUALS = [
  {
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1400&q=85",
    gradient: "from-sky-500/30 via-indigo-600/20 to-purple-700/30",
    accent: "text-sky-400",
    border: "hover:border-sky-400/60",
    badge: "bg-sky-500/20 text-sky-300 border-sky-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-violet-600/30 via-fuchsia-600/15 to-indigo-900/30",
    accent: "text-violet-400",
    border: "hover:border-violet-400/60",
    badge: "bg-violet-500/20 text-violet-300 border-violet-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-emerald-500/30 via-teal-600/15 to-cyan-900/30",
    accent: "text-emerald-400",
    border: "hover:border-emerald-400/60",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-amber-500/30 via-orange-600/15 to-rose-900/30",
    accent: "text-amber-400",
    border: "hover:border-amber-400/60",
    badge: "bg-amber-500/20 text-amber-300 border-amber-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-cyan-500/30 via-blue-600/15 to-indigo-900/30",
    accent: "text-cyan-400",
    border: "hover:border-cyan-400/60",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    gradient: "from-rose-500/30 via-pink-600/15 to-purple-900/30",
    accent: "text-rose-400",
    border: "hover:border-rose-400/60",
    badge: "bg-rose-500/20 text-rose-300 border-rose-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    gradient: "from-indigo-500/30 via-blue-600/15 to-slate-900/30",
    accent: "text-indigo-400",
    border: "hover:border-indigo-400/60",
    badge: "bg-indigo-500/20 text-indigo-300 border-indigo-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80",
    gradient: "from-teal-500/30 via-emerald-600/15 to-slate-900/30",
    accent: "text-teal-400",
    border: "hover:border-teal-400/60",
    badge: "bg-teal-500/20 text-teal-300 border-teal-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
    gradient: "from-fuchsia-500/30 via-purple-600/15 to-slate-900/30",
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

// Helper to guarantee ZERO empty spaces in a 12-column Bento grid
function getBentoSpan(index, total) {
  if (total === 4) return "md:col-span-6"; // 2x2 symmetric grid
  if (total === 5) return index < 2 ? "md:col-span-6" : "md:col-span-4"; // Row 1: 2x6, Row 2: 3x4
  if (total % 3 === 1 && index === total - 1) return "md:col-span-12"; // Last single item spans full width
  if (total % 3 === 2 && index >= total - 2) return "md:col-span-6"; // Last 2 items span 6 cols each
  return "md:col-span-4"; // Standard 3-per-row
}

export default function App() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [showAllExp, setShowAllExp] = useState(false);
  const [activeSkillCat, setActiveSkillCat] = useState("Developer");
  const [activeProjCat, setActiveProjCat] = useState("Developer Github");
  const [modalItem, setModalItem] = useState(null);
  const [clock, setClock] = useState({ years: 6, months: 5, days: 14, hours: "00", mins: "00", secs: "00" });

  // Fetch live data.json from public root so edits to data.json work dynamically
  useEffect(() => {
    fetch('./data.json')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        setData(json);
        if (json.skills?.[0]?.category) setActiveSkillCat(json.skills[0].category);
        if (json.projects?.[0]?.category) setActiveProjCat(json.projects[0].category);
      })
      .catch(() => {});
  }, []);

  // Live Experience Counter Telemetry
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
  // Exactly 3 cards for row 1 -> zero orphan space!
  const coreRecentExp = experiences.slice(1, 4);
  // Remaining 5 roles + 1 Full Career Dossier card = 6 cards (symmetric 3x2 grid!)
  const earlierExp = experiences.slice(4);

  const degrees = education.filter((e) => e.gpa);
  const scholarships = education.filter((e) => e.scholarship);
  const currentSkillGroup = skills.find((s) => s.category === activeSkillCat) || skills[0] || { items: [] };
  const currentProjGroup = projects.find((p) => p.category === activeProjCat) || projects[0] || { items: [] };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 relative selection:bg-sky-500 selection:text-white">
      {/* Multi-Color Ambient Apple Mesh Backdrops */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-48 -left-40 w-[650px] h-[650px] rounded-full bg-sky-500/15 blur-[150px] animate-float-slow" />
        <div className="absolute top-1/3 -right-48 w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[160px] animate-float-slow" />
        <div className="absolute -bottom-48 left-1/4 w-[580px] h-[580px] rounded-full bg-rose-500/10 blur-[150px] animate-float-slow" />
      </div>

      {/* Sticky Frosted Apple Glass Navigation */}
      <header className="fixed top-0 inset-x-0 h-16 bg-[#08080c]/75 backdrop-blur-2xl border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 font-bold tracking-tight text-white">
            <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-rose-500" />
            <span>{personal.firstName} <span className="text-sky-400">{personal.lastName}</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#overview" className="hover:text-white transition">Overview</a>
            <a href="#experience" className="hover:text-white transition">Experience</a>
            <a href="#education" className="hover:text-white transition">Credentials</a>
            <a href="#skills" className="hover:text-white transition">Arsenal</a>
            <a href="#projects" className="hover:text-white transition">Projects</a>
            <a href="#interests" className="hover:text-white transition">Lifestyle</a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${personal.email}`}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 grid place-items-center text-slate-200 transition"
              title="Email Usama"
            >
              <i className="fas fa-envelope text-sm" />
            </a>
            <a
              href={personal.resumeDownloads?.[0]?.url || "assets/Resume_MohamadUsamaKUNNATHUR_DevOps.pdf"}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-sky-500/25 hover:brightness-110 transition"
            >
              <i className="fas fa-file-arrow-down mr-1.5" /> Resume PDF
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH CINEMATIC BACKDROP */}
      <section id="hero" className="relative pt-32 pb-24 px-6 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[36px] overflow-hidden border border-white/15 bg-[#0c0d14] shadow-2xl">
            {/* Hero Background Image + Color Mesh */}
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=85"
              alt="Cloud Network"
              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-sky-950/80 via-[#07080d]/90 to-purple-950/80" />

            <div className="relative z-10 p-8 md:p-16 lg:p-20 grid lg:grid-cols-12 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-8 space-y-6"
              >
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider uppercase text-sky-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  DevOps & Cloud Architect • {personal.location}
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.04]">
                  Cloud Infrastructure.<br />
                  <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">
                    Engineered like art.
                  </span>
                </h1>

                <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                  {personal.bio}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#experience"
                    className="px-7 py-3.5 rounded-full font-semibold text-sm bg-white text-slate-950 hover:bg-sky-400 hover:text-slate-950 transition shadow-xl"
                  >
                    Explore Experience <i className="fas fa-arrow-down ml-2" />
                  </a>
                  <button
                    onClick={() =>
                      setModalItem({
                        badge: "Executive Dossier",
                        period: personal.location,
                        title: `${personal.firstName} ${personal.lastName}`,
                        subtitle: "DevOps & Cloud Engineer • M.Sc. Engineering & Management",
                        img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85",
                        highlights: [
                          personal.bio,
                          `Direct Email: ${personal.email}`,
                          `Direct Phone: ${personal.phone}`,
                          `Location: ${personal.location} (Open to international opportunities)`
                        ],
                        links: [
                          { label: "Download Full CV (PDF)", url: personal.resumeDownloads?.[0]?.url || "assets/Resume_MohamadUsamaKUNNATHUR_DevOps.pdf" },
                          ...(personal.socialLinks || []).map((s) => ({ label: s.platform, url: s.url }))
                        ]
                      })
                    }
                    className="px-7 py-3.5 rounded-full font-semibold text-sm bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white transition"
                  >
                    Contact & Bio Sheet <i className="fas fa-sparkles ml-1.5 text-amber-300" />
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

              {/* Hero Portrait Card with Glass Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="lg:col-span-4 flex justify-center"
              >
                <div className="relative group">
                  <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-sky-500 via-violet-500 to-rose-500 opacity-75 blur-xl group-hover:opacity-100 transition duration-500" />
                  <div className="relative rounded-[28px] overflow-hidden border-2 border-white/25 bg-slate-900 w-72 sm:w-80 shadow-2xl">
                    <img
                      src={personal.profileImage || "assets/img/profile.jpg"}
                      alt={personal.pageTitle}
                      className="w-full h-80 object-cover object-top group-hover:scale-105 transition duration-700"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <div className="p-4 bg-slate-950/90 backdrop-blur-md border-t border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider">Current Mission</p>
                        <p className="text-sm font-bold text-white">{latestExp.company} • {latestExp.role}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        ACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO EXECUTIVE OVERVIEW (Symmetric 12-Col Layout) */}
      <section id="overview" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">Apple Bento Telemetry</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">
              Six+ years of cloud craftsmanship.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Tile 1: Live Experience Counter (7 cols) */}
            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-7 relative rounded-[30px] overflow-hidden border border-white/15 bg-gradient-to-br from-sky-950/60 via-[#0d0f18] to-indigo-950/60 p-8 flex flex-col justify-between shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                alt="Circuit Telemetry"
                className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-screen"
              />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  <i className="fas fa-satellite-dish animate-pulse" /> {data.experienceCounter?.title}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold mt-4">Live Production Uptime</h3>
                <p className="text-slate-400 text-sm mt-1">
                  Continuously orchestrating AWS, Azure, Kubernetes, and Terraform pipelines since May 2020.
                </p>
              </div>

              <div className="relative z-10 grid grid-cols-3 sm:grid-cols-6 gap-3 mt-8">
                {[
                  { label: "Years", val: clock.years, color: "text-sky-400" },
                  { label: "Months", val: clock.months, color: "text-indigo-400" },
                  { label: "Days", val: clock.days, color: "text-violet-400" },
                  { label: "Hours", val: clock.hours, color: "text-fuchsia-400" },
                  { label: "Minutes", val: clock.mins, color: "text-rose-400" },
                  { label: "Seconds", val: clock.secs, color: "text-emerald-400" }
                ].map((unit, i) => (
                  <div key={i} className="rounded-2xl bg-black/45 backdrop-blur-md border border-white/10 p-3 text-center">
                    <div className={`font-mono text-2xl sm:text-3xl font-extrabold ${unit.color}`}>{unit.val}</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-1">{unit.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tile 2: Cost & Enterprise Impact (5 cols) */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() =>
                setModalItem({
                  badge: "Enterprise Highlights",
                  period: "2020 — Present",
                  title: "High-Impact Architecture & FinOps",
                  subtitle: "NEXI • Enel-X • InfoCert SPID • Sense Reply",
                  img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
                  highlights: [
                    "Saved ~$10,000/month at Reply through strategic AWS serverless & IoT resource redimensioning.",
                    "Modernized critical national digital identity platforms (SPID, GoSign) at InfoCert.",
                    "Automated mission-critical blockchain infrastructure and Playwright/Selenium test suites for NEXI at LTIMindtree.",
                    "Upgraded distributed Linux Site Controllers via Ansible, Terraform, and Sensu observability at Sense Reply."
                  ],
                  links: [{ label: "Jump to Experience", url: "#experience" }]
                })
              }
              className="md:col-span-5 cursor-pointer relative rounded-[30px] overflow-hidden border border-white/15 bg-gradient-to-br from-purple-950/60 via-[#0d0f18] to-rose-950/50 p-8 flex flex-col justify-between shadow-xl group"
            >
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
                alt="Analytics"
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition duration-700"
              />
              <div className="relative z-10">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-400/30">
                  FinOps & High Availability
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white mt-5 tracking-tight">
                  $10k<span className="text-rose-400 text-2xl font-bold">/mo saved</span>
                </div>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  Proven record of cloud cost optimization, zero-downtime Kubernetes migrations, and enterprise observability across Italy’s top payment & identity providers.
                </p>
              </div>
              <div className="relative z-10 pt-6 flex items-center text-xs font-bold text-rose-300 group-hover:translate-x-1 transition">
                Click to inspect enterprise milestones <i className="fas fa-arrow-right ml-2" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION (Progressive Disclosure + Zero Empty Grid Cells) */}
      <section id="experience" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">Progressive Career Disclosure</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">
                Latest mission first. Click any tile to dive deep.
              </h2>
            </div>
            <button
              onClick={() => setShowAllExp(!showAllExp)}
              className="self-start md:self-auto px-5 py-2.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition flex items-center gap-2"
            >
              <i className={`fas ${showAllExp ? 'fa-compress-alt' : 'fa-layer-group'} text-sky-400`} />
              {showAllExp ? "Show Compact View (Top 4)" : `Expand All ${experiences.length} Career Roles`}
            </button>
          </div>

          {/* FEATURED LATEST EXPERIENCE BANNER (LTIMindtree) */}
          {latestExp.role && (
            <motion.div
              whileHover={{ scale: 1.008 }}
              onClick={() =>
                setModalItem({
                  badge: "Current Role",
                  period: latestExp.period,
                  title: latestExp.role,
                  subtitle: latestExp.company,
                  img: ROLE_VISUALS[0].img,
                  highlights: latestExp.highlights,
                  links: latestExp.companyUrl ? [{ label: `Visit ${latestExp.company}`, url: latestExp.companyUrl }] : []
                })
              }
              className="cursor-pointer relative rounded-[32px] overflow-hidden border border-sky-400/40 bg-[#0d101b] shadow-2xl group"
            >
              <div className="grid lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-br from-sky-950/50 via-[#0d101b] to-indigo-950/40">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        ● LATEST EXPERIENCE
                      </span>
                      <span className="text-xs font-mono text-slate-400">{latestExp.period}</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black text-white">
                      {latestExp.role} <span className="text-sky-400">@ {latestExp.company}</span>
                    </h3>
                    <p className="text-slate-300 text-base leading-relaxed">
                      {latestExp.highlights?.[0]}. {latestExp.highlights?.[1]}
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
                      Open Full Spec ({latestExp.highlights?.length} deliverables) &rarr;
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

          {/* SYMMETRIC 3-COLUMN GRID (Sense Reply, Infocert, Idea 75) -> NO EMPTY FOURTH SLOT! */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreRecentExp.map((exp, idx) => {
              const vis = ROLE_VISUALS[idx + 1] || ROLE_VISUALS[0];
              return (
                <motion.article
                  key={idx}
                  whileHover={{ y: -8 }}
                  onClick={() =>
                    setModalItem({
                      badge: "Cloud & DevOps Tenure",
                      period: exp.period,
                      title: exp.role,
                      subtitle: exp.company,
                      img: vis.img,
                      highlights: exp.highlights,
                      links: exp.companyUrl ? [{ label: `Visit ${exp.company}`, url: exp.companyUrl }] : []
                    })
                  }
                  className={`cursor-pointer rounded-[28px] overflow-hidden border border-white/10 ${vis.border} bg-[#0e1017] flex flex-col justify-between transition duration-300 shadow-xl group`}
                >
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={vis.img}
                        alt={exp.company}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-[#0e1017] via-transparent to-transparent`} />
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${vis.badge}`}>
                        {exp.period}
                      </span>
                    </div>

                    <div className="p-6">
                      <h4 className="text-2xl font-bold text-white">{exp.company}</h4>
                      <p className={`text-sm font-semibold mt-0.5 ${vis.accent}`}>{exp.role}</p>
                      <p className="text-slate-400 text-sm mt-3 line-clamp-3">
                        {exp.highlights?.[0]}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-white">
                    <span>Inspect {exp.highlights?.length || 0} architectural highlights</span>
                    <i className={`fas fa-plus-circle text-base ${vis.accent}`} />
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* PROGRESSIVE DISCLOSURE: EARLIER ROLES (5 Roles + 1 Summary Tile = Symmetric 3x2 Grid!) */}
          <AnimatePresence>
            {showAllExp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden pt-4"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-200">
                    Earlier Cloud, Project Management & International Roles (Symmetric 3×2 Grid)
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {earlierExp.map((exp, idx) => {
                    const vis = ROLE_VISUALS[(idx + 4) % ROLE_VISUALS.length];
                    return (
                      <motion.article
                        key={idx}
                        whileHover={{ y: -6 }}
                        onClick={() =>
                          setModalItem({
                            badge: "Career Milestone",
                            period: exp.period,
                            title: exp.role,
                            subtitle: exp.company,
                            img: vis.img,
                            highlights: exp.highlights,
                            links: exp.companyUrl ? [{ label: `Visit ${exp.company}`, url: exp.companyUrl }] : []
                          })
                        }
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
                          <span>Inspect Role</span>
                          <i className={`fas fa-arrow-up-right-from-square ${vis.accent}`} />
                        </div>
                      </motion.article>
                    );
                  })}

                  {/* 6th Tile to complete the 3x2 grid with zero empty space */}
                  <motion.a
                    whileHover={{ y: -6 }}
                    href={personal.resumeDownloads?.[0]?.url || "assets/Resume_MohamadUsamaKUNNATHUR_DevOps.pdf"}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[26px] p-7 border border-dashed border-sky-400/40 bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-purple-500/15 flex flex-col justify-between group"
                  >
                    <div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300">
                        Complete Dossier
                      </span>
                      <h4 className="text-2xl font-extrabold text-white mt-4">
                        Download Printable PDF Curriculum Vitae
                      </h4>
                      <p className="text-slate-300 text-sm mt-2">
                        Prefer a traditional offline document? Grab the official English DevOps PDF resume directly from the vault.
                      </p>
                    </div>
                    <div className="pt-6 text-xs font-bold text-sky-300 group-hover:translate-x-1 transition">
                      Download PDF Now <i className="fas fa-file-pdf ml-1.5" />
                    </div>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* EDUCATION & GLOBAL SCHOLARSHIPS (2 Degrees + 3 Scholarships = Zero Empty Space) */}
      <section id="education" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Academic Pedigree & Scholarships</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">
              Engineering degrees & global tech honors.
            </h2>
          </div>

          {/* 2 University Degrees -> Symmetric 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {degrees.map((deg, idx) => {
              const img = idx === 0
                ? "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
                : "https://images.unsplash.com/photo-1517976487468-f20514c44525?auto=format&fit=crop&w=1200&q=80";
              return (
                <motion.article
                  key={idx}
                  whileHover={{ y: -6 }}
                  onClick={() =>
                    setModalItem({
                      badge: deg.gpa?.text || "University Degree",
                      period: deg.period,
                      title: deg.program,
                      subtitle: deg.institution,
                      img,
                      highlights: deg.highlights,
                      links: [
                        ...(deg.programUrl ? [{ label: deg.programDownload ? "Download Degree PDF" : "Program Page", url: deg.programUrl }] : []),
                        ...(deg.gpa?.url ? [{ label: `Official Transcript (${deg.gpa.text})`, url: deg.gpa.url }] : []),
                        ...(deg.institutionUrl ? [{ label: "University Website", url: deg.institutionUrl }] : [])
                      ]
                    })
                  }
                  className="cursor-pointer rounded-[30px] overflow-hidden border border-white/15 hover:border-amber-400/60 bg-[#0e1017] flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden">
                      <img src={img} alt={deg.institution} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-[#0e1017]/40 to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
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
                    <span>Click to verify GPA, thesis & official PDFs</span>
                    <i className="fas fa-arrow-right" />
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* 3 Udacity Scholarships -> Symmetric 3-Column Grid */}
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
                  onClick={() =>
                    setModalItem({
                      badge: "Global Scholarship Winner",
                      period: sch.period,
                      title: sch.program,
                      subtitle: sch.institution,
                      img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1100&q=80",
                      highlights: [sch.scholarship?.text, ...(sch.highlights || [])],
                      links: [
                        ...(sch.scholarship?.credentialUrl ? [{ label: "Verify Certificate", url: sch.scholarship.credentialUrl }] : []),
                        ...(sch.programUrl ? [{ label: "Nanodegree Syllabus", url: sch.programUrl }] : [])
                      ]
                    })
                  }
                  className={`cursor-pointer rounded-[26px] p-7 border bg-gradient-to-br ${colors} flex flex-col justify-between shadow-lg group`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono opacity-80">
                      <span><i className="fas fa-award mr-1" /> SCHOLARSHIP</span>
                      <span>{sch.period}</span>
                    </div>
                    <h4 className="text-xl font-extrabold text-white mt-4">{sch.program}</h4>
                    <p className="text-xs font-semibold uppercase tracking-wider mt-1 opacity-90">{sch.institution}</p>
                    <p className="text-slate-200 text-sm mt-3">{sch.scholarship?.text}</p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white">
                    <span>Inspect Curriculum & Certificate</span>
                    <i className="fas fa-external-link-alt group-hover:translate-x-1 transition" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECHNICAL ARSENAL (Interactive Filter Tabs + Dynamic Span Math = Zero Empty Spaces) */}
      <section id="skills" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Multidisciplinary Stack</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">
                Interactive Skill Matrix.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <button
                  key={s.category}
                  onClick={() => setActiveSkillCat(s.category)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                    activeSkillCat === s.category
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
            key={activeSkillCat}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-5"
          >
            {currentSkillGroup.items.map((item, idx) => {
              const spanClass = getBentoSpan(idx, currentSkillGroup.items.length);
              const isLang = activeSkillCat === "Languages";
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
                          {pct === 100 ? "Native / Bilingual Fluency" : "Professional Working Fluency"}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 mt-1 inline-block">{activeSkillCat} Ecosystem</span>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* PROJECTS & RESEARCH PUBLICATIONS (9 GitHub = 3x3, 6 Publications = 3x2 -> Symmetric!) */}
      <section id="projects" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-400">Open Source & Peer-Reviewed Research</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">
                GitHub Labs & Publications.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {projects.map((p) => (
                <button
                  key={p.category}
                  onClick={() => setActiveProjCat(p.category)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition ${
                    activeProjCat === p.category
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
            key={activeProjCat}
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
                className={`rounded-[26px] p-7 border border-white/10 ${
                  item.url ? "hover:border-rose-400/60 cursor-pointer" : ""
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
                      Inspect on {activeProjCat.includes("Github") ? "GitHub" : "ResearchGate"} &rarr;
                    </span>
                  ) : (
                    <span className="text-slate-400">Aerospace & Mechanics Research</span>
                  )}
                  <i className="fas fa-arrow-up-right-from-square text-slate-400" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* INTERESTS / LIFESTYLE BENTO (5 Items = Row 1: 2x6 cols, Row 2: 3x4 cols -> ZERO Empty Space!) */}
      <section id="interests" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">The Human Behind the Terminal</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">
              Passions & Perspectives.
            </h2>
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

      {/* APPLE STORE-STYLE FROSTED SPECIFICATION MODAL */}
      <AnimatePresence>
        {modalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalItem(null)}
            className="fixed inset-0 bg-black/75 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-[32px] overflow-hidden border border-white/20 bg-[#0e1018] shadow-2xl max-h-[88vh] flex flex-col"
            >
              {modalItem.img && (
                <div className="relative h-52 w-full shrink-0 overflow-hidden">
                  <img src={modalItem.img} alt={modalItem.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1018] via-[#0e1018]/40 to-transparent" />
                  <button
                    onClick={() => setModalItem(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white grid place-items-center text-xl border border-white/20"
                  >
                    &times;
                  </button>
                  <span className="absolute bottom-4 left-6 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/30 text-sky-200 border border-sky-400/40 backdrop-blur-md">
                    {modalItem.badge} • {modalItem.period}
                  </span>
                </div>
              )}

              <div className="p-7 sm:p-9 overflow-y-auto space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">{modalItem.title}</h3>
                  <p className="text-sky-400 font-semibold text-base mt-1">{modalItem.subtitle}</p>
                </div>

                <ul className="space-y-3">
                  {(modalItem.highlights || []).map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-200 text-sm sm:text-base leading-relaxed">
                      <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 grid place-items-center text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {modalItem.links?.length > 0 && (
                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                    {modalItem.links.map((lnk, i) => (
                      <a
                        key={i}
                        href={lnk.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:brightness-110 transition"
                      >
                        {lnk.label} <i className="fas fa-arrow-up-right-from-square ml-1.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

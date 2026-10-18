import React from 'react';
import { motion } from 'framer-motion';
import { getActiveResume, getAllResumes } from '../i18n';

export default function Hero({ personal, latestExp, ui, lang, experienceDeck, openModalDeck }) {
  const currentResume = getActiveResume(personal, lang);
  const allResumes = getAllResumes(personal, lang);

  const heroBadge = personal.title || personal.role || ui.hero.badge || "Portfolio";
  const titleLine1 = personal.heroTitleLine1 || ui.hero.titleLine1 || "Creative Solutions.";
  const titleLine2 = personal.heroTitleLine2 || ui.hero.titleLine2 || "Engineered with precision.";

  return (
    <section id="hero" className="relative pt-32 pb-24 px-6 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[36px] overflow-hidden border border-slate-200/90 dark:border-white/15 bg-white/90 dark:bg-[#0c0d14] backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] dark:shadow-2xl transition duration-300">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=85"
            alt={heroBadge}
            className="absolute inset-0 w-full h-full object-cover opacity-15 dark:opacity-30 mix-blend-luminosity scale-105 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/80 via-white/80 to-purple-50/70 dark:from-sky-950/80 dark:via-[#07080d]/90 dark:to-purple-950/80 pointer-events-none" />

          <div className="relative z-10 p-8 md:p-16 lg:p-20 grid lg:grid-cols-12 gap-10 items-center">
            <motion.div
              key={lang}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-8 space-y-6"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-500/10 dark:bg-white/10 backdrop-blur-md border border-sky-500/25 dark:border-white/15 text-xs font-semibold tracking-wider uppercase text-sky-800 dark:text-sky-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
                {heroBadge}{personal.location ? ` • ${personal.location}` : ""}
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.04] text-slate-900 dark:text-white">
                {titleLine1}<br />
                <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 dark:from-sky-400 dark:via-violet-400 dark:to-rose-400 bg-clip-text text-transparent">
                  {titleLine2}
                </span>
              </h1>

              <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                {personal.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#experience"
                  className="px-7 py-3.5 rounded-full font-semibold text-sm bg-slate-950 hover:bg-sky-600 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-sky-400 transition shadow-xl shadow-slate-950/20"
                >
                  {ui.hero.exploreBtn} <i className="fas fa-arrow-down ml-2" />
                </a>
                <button
                  onClick={() =>
                    openModalDeck(
                      [
                        {
                          id: "bio-sheet",
                          badge: heroBadge,
                          period: personal.location,
                          title: `${personal.firstName} ${personal.lastName}`,
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
                        },
                        ...experienceDeck
                      ],
                      0,
                      "bio"
                    )
                  }
                  className="px-7 py-3.5 rounded-full font-semibold text-sm bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/20 dark:text-white backdrop-blur-md transition cursor-pointer shadow-xs"
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
                      className="w-11 h-11 rounded-full bg-white hover:bg-sky-500 hover:text-white border border-slate-200/90 text-slate-700 dark:bg-white/10 dark:hover:bg-sky-500 dark:border-white/15 dark:text-white grid place-items-center transition shadow-xs"
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
                <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-sky-400 via-indigo-400 to-rose-400 dark:from-sky-500 dark:via-violet-500 dark:to-rose-500 opacity-60 dark:opacity-75 blur-xl group-hover:opacity-100 transition duration-500" />
                <div className="relative rounded-[28px] overflow-hidden border-2 border-slate-200/90 dark:border-white/25 bg-white dark:bg-slate-900 w-72 sm:w-80 shadow-2xl">
                  <img
                    src={personal.profileImage || "assets/img/profile.jpg"}
                    alt={personal.pageTitle || `${personal.firstName} ${personal.lastName}`}
                    className="w-full h-80 object-cover object-[center_20%] group-hover:scale-105 transition duration-700"
                  />
                  <div className="p-4 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border-t border-white/10">
                    <p className="text-[10px] text-sky-400 font-semibold uppercase tracking-wider">{ui.hero.currentMission}</p>
                    <p className="text-xs font-bold text-white mt-0.5 leading-snug">
                      {latestExp?.company || heroBadge}
                    </p>
                    <div className="flex items-center justify-between mt-1.5">
                      <p className="text-[11px] text-slate-300 leading-tight">{latestExp?.role}</p>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shrink-0 ml-2">
                        {ui.hero.active}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
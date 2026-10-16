import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROLE_VISUALS } from '../constants/visuals';
import { getActiveResume, getAllResumes } from '../i18n';

export default function Experience({
  experiences,
  personal,
  ui,
  lang,
  showAllExp,
  setShowAllExp,
  experienceDeck,
  openModalDeck
}) {
  const currentResume = getActiveResume(personal, lang);
  const allResumes = getAllResumes(personal, lang);

  const latestExp = experiences[0] || {};
  const coreRecentExp = experiences.slice(1, 4);
  const earlierExp = experiences.slice(4);

  return (
    <section id="experience" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">{ui.experience.eyebrow}</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-slate-900 dark:text-white">{ui.experience.title}</h2>
          </div>
          <button
            onClick={() => setShowAllExp(!showAllExp)}
            className="self-start md:self-auto px-5 py-2.5 rounded-full text-xs font-bold bg-white hover:bg-slate-50 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-200/90 dark:border-white/20 text-slate-800 dark:text-white transition flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <i className={`fas ${showAllExp ? 'fa-compress-alt' : 'fa-layer-group'} text-sky-500 dark:text-sky-400`} />
            {showAllExp ? ui.experience.showCompact : `${ui.experience.expandAll} ${experiences.length} ${ui.experience.careerRoles}`}
          </button>
        </div>

        {latestExp.role && (
          <motion.div
            whileHover={{ scale: 1.008 }}
            onClick={() => openModalDeck(experienceDeck, 0, "experience")}
            className="cursor-pointer relative rounded-[32px] overflow-hidden border border-sky-300/90 dark:border-sky-400/40 bg-white dark:bg-[#0d101b] shadow-[0_12px_36px_rgba(14,165,233,0.12)] hover:shadow-[0_18px_48px_rgba(14,165,233,0.18)] dark:shadow-2xl group transition-shadow"
          >
            <div className="grid lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-br from-sky-50/80 via-white to-indigo-50/50 dark:from-sky-950/50 dark:via-[#0d101b] dark:to-indigo-950/40">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-400/30">
                      {ui.experience.latestBadge}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">{latestExp.period}</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                    {latestExp.role} <span className="text-sky-600 dark:text-sky-400">@ {latestExp.company}</span>
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                    {latestExp.highlights?.[0]} {latestExp.highlights?.[1]}
                  </p>
                </div>

                <div className="pt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/90 dark:border-white/10 mt-8">
                  <div className="flex flex-wrap gap-2">
                    {["NEXI Blockchain", "Linux VMs", "Kubernetes", "Playwright", "Selenium", "Postman"].map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100/90 dark:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-transparent">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition">
                    {ui.experience.openSpec} ({latestExp.highlights?.length} {ui.experience.deliverables}) &rarr;
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[260px] overflow-hidden">
                <img
                  src={ROLE_VISUALS[0].img}
                  alt={latestExp.company}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white via-white/50 to-transparent dark:from-[#0d101b] dark:via-[#0d101b]/40 to-transparent pointer-events-none" />
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
                onClick={() => openModalDeck(experienceDeck, idx + 1, "experience")}
                className={`cursor-pointer rounded-[28px] overflow-hidden border border-slate-200/90 dark:border-white/10 ${vis.border} bg-white dark:bg-[#0e1017] flex flex-col justify-between transition duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] dark:shadow-xl group`}
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img src={vis.img} alt={exp.company} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#0e1017] dark:via-transparent to-transparent pointer-events-none" />
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${vis.badge}`}>
                      {exp.period}
                    </span>
                  </div>

                  <div className="p-6">
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{exp.company}</h4>
                    <p className={`text-sm font-semibold mt-0.5 ${vis.accent}`}>{exp.role}</p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 line-clamp-3 leading-relaxed">{exp.highlights?.[0]}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-slate-950 dark:text-slate-300 dark:group-hover:text-white">
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
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200 mb-6">{ui.experience.earlierHeading}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {earlierExp.map((exp, idx) => {
                  const vis = ROLE_VISUALS[(idx + 4) % ROLE_VISUALS.length];
                  return (
                    <motion.article
                      key={idx}
                      whileHover={{ y: -6 }}
                      onClick={() => openModalDeck(experienceDeck, idx + 4, "experience")}
                      className={`cursor-pointer rounded-[26px] overflow-hidden border border-slate-200/90 dark:border-white/10 ${vis.border} bg-white dark:bg-[#0e1017] flex flex-col justify-between transition group shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] dark:shadow-none`}
                    >
                      <div>
                        <div className="relative h-36 overflow-hidden">
                          <img src={vis.img} alt={exp.company} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 pointer-events-none" />
                          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-[#0e1017] to-transparent pointer-events-none" />
                          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${vis.badge}`}>
                            {exp.period}
                          </span>
                        </div>
                        <div className="p-6">
                          <h4 className="text-xl font-bold text-slate-900 dark:text-white">{exp.company}</h4>
                          <p className={`text-xs font-semibold mt-0.5 ${vis.accent}`}>{exp.role}</p>
                          <p className="text-slate-600 dark:text-slate-300 text-sm mt-2.5 line-clamp-2 leading-relaxed">{exp.highlights?.[0]}</p>
                        </div>
                      </div>
                      <div className="px-6 pb-5 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-slate-950 dark:text-slate-400 dark:group-hover:text-white">
                        <span>{ui.experience.inspectRole}</span>
                        <i className={`fas fa-arrow-up-right-from-square ${vis.accent}`} />
                      </div>
                    </motion.article>
                  );
                })}

                <motion.div
                  whileHover={{ y: -6 }}
                  className="rounded-[26px] p-7 border-2 border-dashed border-sky-300 dark:border-sky-400/50 bg-gradient-to-br from-sky-50/60 via-white to-purple-50/50 dark:from-sky-500/15 dark:via-indigo-500/10 dark:to-purple-500/15 flex flex-col justify-between group shadow-[0_4px_20px_rgba(14,165,233,0.08)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/15 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300 border border-sky-400/30">
                        {ui.experience.dossierBadge}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-700 dark:text-sky-300">
                        {lang}
                      </span>
                    </div>
                    <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-4">{ui.experience.dossierTitle}</h4>
                    <p className="text-slate-700 dark:text-slate-300 text-sm mt-2 leading-relaxed">{ui.experience.dossierDesc}</p>
                  </div>

                  <div className="pt-6 space-y-4">
                    {/* Primary Action: Downloads CV in currently active language */}
                    <a
                      href={currentResume.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center w-full px-5 py-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white shadow-md shadow-sky-500/20 hover:brightness-110 transition gap-2"
                    >
                      <span>{ui.experience.dossierCta} ({currentResume.label})</span>
                      <i className="fas fa-file-arrow-down" />
                    </a>

                    {/* Language Selection Pills for either CV */}
                    <div>
                      <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2">
                        {ui.experience.otherFormats || "Available languages:"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {allResumes.map((r) => (
                          <a
                            key={r.lang}
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                              r.isActive
                                ? "bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-400/40 font-bold"
                                : "bg-white/70 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-white/20 border border-slate-200/80 dark:border-white/10"
                            }`}
                          >
                            <span className="text-xs">{r.flag}</span>
                            <span>{r.nativeLabel || r.label}</span>
                            <i className="fas fa-arrow-up-right-from-square text-[9px] opacity-60" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
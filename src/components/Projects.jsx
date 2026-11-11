import React from 'react';
import { motion } from 'framer-motion';
import { getPlatformLabel, buildProjectsDeck } from '../constants/visuals';

export default function Projects({
  projects = [],
  ui,
  lang,
  activeProjIdx,
  setActiveProjIdx,
  openModalDeck
}) {
  const currentProjGroup = projects[activeProjIdx] || projects[0] || { category: "", items: [] };
  const currentDeck = buildProjectsDeck(currentProjGroup.items || [], ui);

  return (
    <section id="projects" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">{ui.projects.eyebrow}</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-slate-900 dark:text-white">{ui.projects.title}</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {projects.map((p, idx) => {
              const isActive = activeProjIdx === idx;
              const activeGrad = idx % 2 === 0
                ? "bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 text-white shadow-md shadow-sky-500/25"
                : "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-md shadow-violet-500/25";
              return (
                <button
                  key={idx}
                  onClick={() => setActiveProjIdx(idx)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${
                    isActive
                      ? activeGrad
                      : "bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200/90 shadow-xs dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 dark:hover:text-white dark:border-white/10"
                  }`}
                >
                  {p.category} ({p.items?.length || 0})
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={`${lang}-${activeProjIdx}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {(currentProjGroup.items || []).map((item, idx) => {
            const platform = getPlatformLabel(item, ui.projects.viewProject);
            const hasUrl = Boolean(item.url);

            const isAlt = idx % 2 === 1;
            const hoverBorder = isAlt
              ? "hover:border-violet-500/70 dark:hover:border-violet-400/60"
              : "hover:border-sky-500/70 dark:hover:border-sky-400/60";
            const ctaColor = isAlt
              ? "text-violet-600 dark:text-violet-400"
              : "text-sky-600 dark:text-sky-400";
            const hoverGlow = isAlt
              ? "hover:shadow-[0_16px_36px_rgba(139,92,246,0.12)]"
              : "hover:shadow-[0_16px_36px_rgba(14,165,233,0.12)]";

            const defaultImg = isAlt
              ? "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
              : "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";

            return (
              <motion.article
                key={idx}
                whileHover={{ y: -8 }}
                onClick={() => {
                  if (typeof openModalDeck === "function") {
                    openModalDeck(currentDeck, idx, "project");
                  }
                }}
                className={`cursor-pointer rounded-[28px] overflow-hidden border border-slate-200/90 dark:border-white/10 ${hoverBorder} bg-white dark:bg-[#0e1017] flex flex-col justify-between transition duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] ${hoverGlow} dark:shadow-xl group`}
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.image || defaultImg}
                      alt={item.text}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent dark:from-[#0e1017] dark:via-transparent to-transparent pointer-events-none" />
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${
                        isAlt
                          ? "bg-violet-500/20 text-violet-800 dark:text-violet-300 border-violet-400/40"
                          : "bg-sky-500/20 text-sky-800 dark:text-sky-300 border-sky-400/40"
                      }`}
                    >
                      <i className={`${item.icon || "fas fa-folder"} mr-1.5`} />
                      {item.badge || platform}
                    </span>
                  </div>

                  <div className="p-6">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                      {item.text}
                    </h4>
                    {item.description && (
                      <p className="text-slate-600 dark:text-slate-300 text-sm mt-2.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    {Array.isArray(item.tags) && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {item.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                            +{item.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-5 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-bold">
                  <span className={`${ctaColor} flex items-center gap-1.5 group-hover:translate-x-1 transition`}>
                    <span>{ui.projects.viewDetails || ui.projects.details || "View Details"}</span>
                    <i className="fas fa-plus-circle text-sm" />
                  </span>

                  {hasUrl && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(item.url, "_blank", "noopener,noreferrer");
                      }}
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
                      title={`${ui.projects.inspectOn || "Open on"} ${platform}`}
                    >
                      <span>{platform}</span>
                      <i className="fas fa-arrow-up-right-from-square text-[10px] opacity-75" />
                    </button>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

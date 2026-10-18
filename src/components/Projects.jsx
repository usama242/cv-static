import React from 'react';
import { motion } from 'framer-motion';

function getPlatformLabel(item, defaultLabel = "Project") {
  if (item.platform) return item.platform;
  if (!item.url) return null;
  try {
    const host = new URL(item.url).hostname.toLowerCase();
    if (host.includes("github.com")) return "GitHub";
    if (host.includes("researchgate.net")) return "ResearchGate";
    if (host.includes("gitlab.com")) return "GitLab";
    if (host.includes("linkedin.com")) return "LinkedIn";
    if (host.includes("behance.net")) return "Behance";
    if (host.includes("dribbble.com")) return "Dribbble";
    if (host.includes("medium.com")) return "Medium";
    if (host.includes("youtube.com") || host.includes("youtu.be")) return "YouTube";
    return host.replace(/^www\./, "");
  } catch {
    return defaultLabel;
  }
}

export default function Projects({ projects = [], ui, lang, activeProjIdx, setActiveProjIdx }) {
  const currentProjGroup = projects[activeProjIdx] || projects[0] || { category: "", items: [] };

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
              const isYouTubeTab = p.category?.toLowerCase().includes("orbit") || p.category?.toLowerCase().includes("teach") || p.category?.toLowerCase().includes("youtube");
              const activeGrad = isYouTubeTab
                ? "bg-gradient-to-r from-red-600 via-rose-600 to-red-500 text-white shadow-md shadow-red-500/25"
                : idx % 2 === 0
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
            const isVideo = Boolean(item.youtubeId);
            const spanClass = item.colSpan || "md:col-span-1";

            const isAlt = idx % 2 === 1;
            const hoverBorder = isVideo
              ? "hover:border-red-500/70 dark:hover:border-red-400/60"
              : isAlt
              ? "hover:border-violet-500/70 dark:hover:border-violet-400/60"
              : "hover:border-sky-500/70 dark:hover:border-sky-400/60";

            const iconBox = isVideo
              ? "bg-red-500/10 dark:bg-red-500/15 border-red-300/70 dark:border-red-400/30 text-red-600 dark:text-red-400"
              : isAlt
              ? "bg-violet-500/10 dark:bg-violet-500/15 border-violet-300/70 dark:border-violet-400/30 text-violet-600 dark:text-violet-400"
              : "bg-sky-500/10 dark:bg-sky-500/15 border-sky-300/70 dark:border-sky-400/30 text-sky-600 dark:text-sky-400";

            const ctaColor = isVideo
              ? "text-red-600 dark:text-red-400"
              : isAlt
              ? "text-violet-600 dark:text-violet-400"
              : "text-sky-600 dark:text-sky-400";

            const hoverGlow = isVideo
              ? "hover:shadow-[0_16px_36px_rgba(239,68,68,0.12)]"
              : isAlt
              ? "hover:shadow-[0_16px_36px_rgba(139,92,246,0.12)]"
              : "hover:shadow-[0_16px_36px_rgba(14,165,233,0.12)]";

            return (
              <motion.div
                key={idx}
                whileHover={{ y: isVideo ? -3 : hasUrl ? -6 : -2 }}
                onClick={() => {
                  if (isVideo) return;
                  if (item.url) window.open(item.url, "_blank");
                }}
                className={`${spanClass} rounded-[26px] p-7 border border-slate-200/90 dark:border-white/10 ${
                  hasUrl && !isVideo ? `${hoverBorder} cursor-pointer` : hoverBorder
                } bg-white dark:bg-[#0d101b] dark:hover:bg-[#111524] flex flex-col justify-between group shadow-[0_4px_20px_rgba(0,0,0,0.05)] ${hoverGlow} dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition duration-300`}
              >
                <div>
                  {isVideo ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/30">
                          <i className="fab fa-youtube text-red-600 dark:text-red-400" /> {item.badge || "YouTube Video"}
                        </span>
                        {item.channelUrl && (
                          <a
                            href={item.channelUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline inline-flex items-center gap-1"
                          >
                            <span>@PMOrbit-engr</span>
                            <i className="fas fa-arrow-up-right-from-square text-[10px]" />
                          </a>
                        )}
                      </div>

                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-lg bg-black">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}`}
                          title={item.text}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-11 h-11 rounded-2xl border grid place-items-center text-lg transition group-hover:scale-105 ${iconBox}`}>
                        <i className={item.icon || "fas fa-folder"} />
                      </div>
                      {item.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}

                  <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-slate-950 dark:group-hover:text-slate-100 mt-2">
                    {item.text}
                  </h4>
                  {item.description && (
                    <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-bold">
                  {isVideo ? (
                    <div className="flex flex-wrap items-center gap-3 w-full justify-between">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition shadow-xs"
                      >
                        <i className="fab fa-youtube text-sm" />
                        <span>Watch on YouTube</span>
                      </a>
                      {item.channelUrl && (
                        <a
                          href={item.channelUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-slate-200 transition"
                        >
                          <i className="fas fa-satellite-dish text-xs text-red-500" />
                          <span>Visit PM Orbit Channel</span>
                        </a>
                      )}
                    </div>
                  ) : hasUrl ? (
                    <>
                      <span className={`${ctaColor} group-hover:translate-x-1 transition`}>
                        {ui.projects.inspectOn} {platform} &rarr;
                      </span>
                      <i className="fas fa-arrow-up-right-from-square text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition" />
                    </>
                  ) : (
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      {item.type || item.badge || item.category || ui.projects.details || "Details"}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
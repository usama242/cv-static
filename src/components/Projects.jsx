import React from 'react';
import { motion } from 'framer-motion';

export default function Projects({ projects, ui, lang, activeProjIdx, setActiveProjIdx }) {
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
                            const activeGrad = idx === 0
                                ? "bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 text-white shadow-md shadow-sky-500/25"
                                : "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-md shadow-violet-500/25";
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveProjIdx(idx)}
                                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${isActive
                                            ? activeGrad
                                            : "bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200/90 shadow-xs dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 dark:hover:text-white dark:border-white/10"
                                        }`}
                                >
                                    {p.category} ({p.items.length})
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
                    {currentProjGroup.items.map((item, idx) => {
                        const isGithub = activeProjIdx === 0;
                        const hoverBorder = isGithub
                            ? "hover:border-sky-500/70 dark:hover:border-sky-400/60"
                            : "hover:border-violet-500/70 dark:hover:border-violet-400/60";
                        const iconBox = isGithub
                            ? "bg-sky-500/10 dark:bg-sky-500/15 border-sky-300/70 dark:border-sky-400/30 text-sky-600 dark:text-sky-400"
                            : "bg-violet-500/10 dark:bg-violet-500/15 border-violet-300/70 dark:border-violet-400/30 text-violet-600 dark:text-violet-400";
                        const ctaColor = isGithub
                            ? "text-sky-600 dark:text-sky-400"
                            : "text-violet-600 dark:text-violet-400";
                        const hoverGlow = isGithub
                            ? "hover:shadow-[0_16px_36px_rgba(14,165,233,0.12)]"
                            : "hover:shadow-[0_16px_36px_rgba(139,92,246,0.12)]";

                        return (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -6 }}
                                onClick={() => {
                                    if (item.url) window.open(item.url, "_blank");
                                }}
                                className={`rounded-[26px] p-7 border border-slate-200/90 dark:border-white/10 ${item.url ? `${hoverBorder} cursor-pointer` : ""
                                    } bg-white dark:bg-[#0d101b] dark:hover:bg-[#111524] flex flex-col justify-between group shadow-[0_4px_20px_rgba(0,0,0,0.05)] ${hoverGlow} dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition duration-300`}
                            >
                                <div>
                                    <div className={`w-11 h-11 rounded-2xl border grid place-items-center text-lg mb-5 transition group-hover:scale-105 ${iconBox}`}>
                                        <i className={item.icon} />
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-slate-950 dark:group-hover:text-slate-100">{item.text}</h4>
                                </div>
                                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-bold">
                                    {item.url ? (
                                        <span className={`${ctaColor} group-hover:translate-x-1 transition`}>
                                            {ui.projects.inspectOn} {activeProjIdx === 0 ? "GitHub" : "ResearchGate"} &rarr;
                                        </span>
                                    ) : (
                                        <span className="text-slate-500 dark:text-slate-400 font-medium">{ui.projects.researchPaper}</span>
                                    )}
                                    <i className="fas fa-arrow-up-right-from-square text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition" />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
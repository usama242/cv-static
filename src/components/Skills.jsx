import React from 'react';
import { motion } from 'framer-motion';
import { getBentoSpan } from '../constants/visuals';

export default function Skills({ skills = [], ui, lang, activeSkillIdx, setActiveSkillIdx }) {
  const currentSkillGroup = skills[activeSkillIdx] || skills[0] || { category: "", items: [] };

  return (
    <section id="skills" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">{ui.skills.eyebrow}</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-slate-900 dark:text-white">{ui.skills.title}</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSkillIdx(idx)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeSkillIdx === idx
                    ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/25"
                    : "bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200/90 shadow-xs dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 dark:hover:text-white dark:border-white/10"
                }`}
              >
                {s.category} ({s.items?.length || 0})
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
          {(currentSkillGroup.items || []).map((item, idx) => {
            const spanClass = getBentoSpan(idx, currentSkillGroup.items.length);
            const isLang =
              currentSkillGroup.category?.toLowerCase().includes("lang") ||
              item.icon?.includes("battery") ||
              item.proficiency !== undefined;

            const pct =
              item.proficiency ??
              (item.icon?.includes("battery-full")
                ? 100
                : item.icon?.includes("battery-three-quarters")
                ? 75
                : item.icon?.includes("battery-half")
                ? 50
                : 80);

            return (
              <div
                key={idx}
                className={`${spanClass} rounded-[24px] p-6 border border-slate-200/90 dark:border-white/10 hover:border-sky-400/80 dark:hover:border-sky-400/50 bg-white dark:bg-[#0d1018]/90 backdrop-blur-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition group flex items-start gap-4`}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500/10 to-indigo-500/10 dark:from-sky-500/20 dark:to-purple-500/20 border border-slate-200/80 dark:border-white/10 grid place-items-center text-sky-600 dark:text-sky-400 text-xl shrink-0 group-hover:scale-110 transition">
                  <i className={item.icon || "fas fa-check"} />
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-slate-900 dark:text-white leading-snug">{item.text}</p>
                  {isLang ? (
                    <div className="mt-3">
                      <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 inline-block font-medium">
                        {pct >= 90 ? ui.skills.nativeFluency : ui.skills.workingFluency}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 inline-block font-medium">
                      {item.category || currentSkillGroup.category} {ui.skills.ecosystem}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
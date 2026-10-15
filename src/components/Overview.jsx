import React from 'react';
import { motion } from 'framer-motion';

export default function Overview({ data, ui, clock, experienceDeck, openModalDeck }) {
  return (
    <section id="overview" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">{ui.overview.eyebrow}</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-slate-900 dark:text-white">{ui.overview.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-7 relative rounded-[30px] overflow-hidden border border-slate-200/90 dark:border-white/15 bg-gradient-to-br from-sky-50/70 via-white to-indigo-50/50 dark:from-sky-950/60 dark:via-[#0d0f18] dark:to-indigo-950/60 p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] dark:shadow-xl transition-shadow"
          >
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
              alt={ui.overview.uptimeTitle}
              className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-15 mix-blend-multiply dark:mix-blend-screen pointer-events-none"
            />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-sky-500/15 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300 border border-sky-400/30">
                <i className="fas fa-satellite-dish animate-pulse" /> {data.experienceCounter?.title}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold mt-4 text-slate-900 dark:text-white">{ui.overview.uptimeTitle}</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{ui.overview.uptimeDesc}</p>
            </div>

            <div className="relative z-10 grid grid-cols-3 sm:grid-cols-6 gap-3 mt-8">
              {[
                { label: ui.overview.units[0], val: clock.years, color: "text-sky-600 dark:text-sky-400" },
                { label: ui.overview.units[1], val: clock.months, color: "text-indigo-600 dark:text-indigo-400" },
                { label: ui.overview.units[2], val: clock.days, color: "text-violet-600 dark:text-violet-400" },
                { label: ui.overview.units[3], val: clock.hours, color: "text-fuchsia-600 dark:text-fuchsia-400" },
                { label: ui.overview.units[4], val: clock.mins, color: "text-rose-600 dark:text-rose-400" },
                { label: ui.overview.units[5], val: clock.secs, color: "text-emerald-600 dark:text-emerald-400" }
              ].map((unit, i) => (
                <div key={i} className="rounded-2xl bg-white/95 dark:bg-black/45 backdrop-blur-md border border-slate-200/90 dark:border-white/10 p-3 text-center shadow-xs">
                  <div className={`font-mono text-2xl sm:text-3xl font-extrabold ${unit.color}`}>{unit.val}</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold mt-1">{unit.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            onClick={() => openModalDeck(experienceDeck, 0, "experience")}
            className="md:col-span-5 cursor-pointer relative rounded-[30px] overflow-hidden border border-slate-200/90 dark:border-white/15 bg-gradient-to-br from-purple-50/70 via-white to-rose-50/50 dark:from-purple-950/60 dark:via-[#0d0f18] dark:to-rose-950/50 p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] dark:shadow-xl transition-shadow group"
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
              alt={ui.overview.finopsBadge}
              className="absolute inset-0 w-full h-full object-cover opacity-15 dark:opacity-20 group-hover:scale-105 transition duration-700 pointer-events-none"
            />
            <div className="relative z-10">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-400/30">
                {ui.overview.finopsBadge}
              </span>
              <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mt-5 tracking-tight">
                $10k<span className="text-rose-600 dark:text-rose-400 text-2xl font-bold">{ui.overview.savedUnit}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm mt-3 leading-relaxed">{ui.overview.finopsDesc}</p>
            </div>
            <div className="relative z-10 pt-6 flex items-center text-xs font-bold text-rose-700 dark:text-rose-300 group-hover:translate-x-1 transition">
              {ui.overview.finopsCta} <i className="fas fa-arrow-right ml-2" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
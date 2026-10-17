import React from 'react';
import { motion } from 'framer-motion';

export default function Education({ degrees = [], scholarships = [], ui, educationDeck, openModalDeck }) {
  const degreeGridCols = degrees.length === 1 ? "max-w-2xl mx-auto" : degrees.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  const schGridCols = scholarships.length === 1 ? "max-w-xl mx-auto" : scholarships.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section id="education" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500 dark:text-amber-400">{ui.education.eyebrow}</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-slate-900 dark:text-white">{ui.education.title}</h2>
        </div>

        {degrees.length > 0 && (
          <div className={`grid grid-cols-1 ${degreeGridCols} gap-6`}>
            {degrees.map((deg, idx) => {
              const defaultImg = idx === 0
                ? "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
                : "https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1200&q=80";
              const img = deg.image || defaultImg;

              return (
                <motion.article
                  key={idx}
                  whileHover={{ y: -6 }}
                  onClick={() => openModalDeck(educationDeck, idx, "education")}
                  className="cursor-pointer rounded-[30px] overflow-hidden border border-slate-200/90 dark:border-white/15 hover:border-amber-400/80 dark:hover:border-amber-400/60 bg-white dark:bg-[#0e1017] flex flex-col justify-between group shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] transition duration-300"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden">
                      <img src={img} alt={deg.institution} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-[#0e1017] dark:via-[#0e1017]/40" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-400/40 backdrop-blur-md">
                          <i className="fas fa-graduation-cap mr-1" /> {deg.gpa?.text || deg.program || deg.period}
                        </span>
                      </div>
                      <span className="absolute bottom-3 left-6 text-xs font-mono text-slate-700 dark:text-slate-300 font-bold">{deg.period}</span>
                    </div>
                    <div className="p-7">
                      <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{deg.program}</h3>
                      <p className="text-amber-700 dark:text-amber-400 font-bold text-sm mt-1">{deg.institution}</p>
                      <p className="text-slate-700 dark:text-slate-300 text-sm mt-3 leading-relaxed">{deg.highlights?.[0]}</p>
                    </div>
                  </div>
                  <div className="px-7 pb-6 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-300">
                    <span>{ui.education.verifyDegCta}</span>
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {scholarships.length > 0 && (
          <div className={`grid grid-cols-1 ${schGridCols} gap-6`}>
            {scholarships.map((sch, idx) => {
              const styles = [
                {
                  card: "bg-white dark:bg-[#0e1017] hover:border-emerald-400/80 dark:hover:border-emerald-400/60 border-slate-200/90 dark:border-white/10",
                  wash: "from-emerald-50/70 via-white to-transparent dark:from-emerald-950/30 dark:via-[#0e1017] dark:to-transparent",
                  badge: "text-emerald-800 dark:text-emerald-300 bg-emerald-500/15 dark:bg-emerald-500/20 border-emerald-300/70 dark:border-emerald-400/30",
                  accent: "text-emerald-700 dark:text-emerald-300"
                },
                {
                  card: "bg-white dark:bg-[#0e1017] hover:border-sky-400/80 dark:hover:border-sky-400/60 border-slate-200/90 dark:border-white/10",
                  wash: "from-sky-50/70 via-white to-transparent dark:from-sky-950/30 dark:via-[#0e1017] dark:to-transparent",
                  badge: "text-sky-800 dark:text-sky-300 bg-sky-500/15 dark:bg-sky-500/20 border-sky-300/70 dark:border-sky-400/30",
                  accent: "text-sky-700 dark:text-sky-300"
                },
                {
                  card: "bg-white dark:bg-[#0e1017] hover:border-purple-400/80 dark:hover:border-purple-400/60 border-slate-200/90 dark:border-white/10",
                  wash: "from-purple-50/70 via-white to-transparent dark:from-purple-950/30 dark:via-[#0e1017] dark:to-transparent",
                  badge: "text-purple-800 dark:text-purple-300 bg-purple-500/15 dark:bg-purple-500/20 border-purple-300/70 dark:border-purple-400/30",
                  accent: "text-purple-700 dark:text-purple-300"
                }
              ][idx % 3];

              const scholarshipBadge = sch.scholarship?.badge || ui.education.scholarshipLabel;
              const scholarshipText = sch.scholarship?.text || sch.highlights?.[0] || "";

              return (
                <motion.article
                  key={idx}
                  whileHover={{ y: -6 }}
                  onClick={() => openModalDeck(educationDeck, degrees.length + idx, "education")}
                  className={`cursor-pointer rounded-[26px] p-7 border bg-gradient-to-br ${styles.card} ${styles.wash} flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] group transition duration-300`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={`px-2.5 py-1 rounded-full font-bold border ${styles.badge}`}>
                        <i className="fas fa-award mr-1" /> {scholarshipBadge}
                      </span>
                      <span className="font-semibold text-slate-600 dark:text-slate-400">{sch.period}</span>
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-4">{sch.program}</h4>
                    <p className="text-xs font-semibold uppercase tracking-wider mt-1 text-slate-600 dark:text-slate-300">{sch.institution}</p>
                    {scholarshipText && <p className="text-slate-700 dark:text-slate-300 text-sm mt-3 leading-relaxed">{scholarshipText}</p>}
                  </div>
                  <div className={`pt-6 mt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-bold ${styles.accent}`}>
                    <span>{ui.education.inspectCert}</span>
                    <i className="fas fa-external-link-alt group-hover:translate-x-1 transition" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
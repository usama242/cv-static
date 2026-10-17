import React from 'react';
import { motion } from 'framer-motion';
import { INTEREST_IMAGES, getBentoSpan } from '../constants/visuals';

export default function Interests({ interests = [], ui }) {
    return (
        <section id="interests" className="py-20 px-6 relative z-10">
            <div className="max-w-7xl mx-auto space-y-10">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">{ui.interests.eyebrow}</p>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-slate-900 dark:text-white">{ui.interests.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {interests.map((int, idx) => {
                        const span = getBentoSpan(idx, interests.length);
                        const bgImg = int.image || INTEREST_IMAGES[idx % INTEREST_IMAGES.length];
                        return (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.015 }}
                                className={`${span} relative rounded-[28px] overflow-hidden border border-slate-200/90 dark:border-white/15 min-h-[240px] p-7 flex flex-col justify-end group shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-xl`}
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
    );
}
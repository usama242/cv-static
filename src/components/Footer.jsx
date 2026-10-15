import React from 'react';

export default function Footer({ personal }) {
    return (
        <footer className="border-t border-slate-200/90 dark:border-white/10 py-12 px-6 relative z-10 bg-white/80 dark:bg-[#040407] transition-colors">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-600 dark:text-slate-400">
                <div>
                    <p className="font-bold text-slate-900 dark:text-white">{personal.firstName} {personal.lastName}</p>
                    <p>{personal.location} • {personal.email} • {personal.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                    {(personal.socialLinks || []).map((s, i) => (
                        <a
                            key={i}
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-sky-500 hover:text-white border border-slate-200/80 text-slate-700 dark:bg-white/5 dark:hover:bg-sky-500 dark:border-white/10 dark:text-white grid place-items-center transition shadow-xs"
                        >
                            <i className={s.icon} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
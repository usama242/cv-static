import React from 'react';

export default function Navbar({ personal, ui, lang, setLang, theme, toggleTheme }) {
  return (
    <header className="fixed top-0 inset-x-0 h-16 bg-white/85 dark:bg-[#08080c]/85 backdrop-blur-2xl border-b border-slate-200/90 dark:border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.03)] z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-3">
        <a href="#hero" className="flex items-center gap-2.5 font-bold tracking-tight text-slate-900 dark:text-white shrink-0">
          <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-rose-500" />
          <span>
            {personal.firstName} <span className="text-sky-600 dark:text-sky-400 hidden sm:inline">{personal.lastName}</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          <a href="#overview" className="hover:text-slate-950 dark:hover:text-white transition">{ui.nav.overview}</a>
          <a href="#experience" className="hover:text-slate-950 dark:hover:text-white transition">{ui.nav.experience}</a>
          <a href="#education" className="hover:text-slate-950 dark:hover:text-white transition">{ui.nav.credentials}</a>
          <a href="#skills" className="hover:text-slate-950 dark:hover:text-white transition">{ui.nav.arsenal}</a>
          <a href="#projects" className="hover:text-slate-950 dark:hover:text-white transition">{ui.nav.projects}</a>
          <a href="#interests" className="hover:text-slate-950 dark:hover:text-white transition">{ui.nav.lifestyle}</a>
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-200/60 dark:bg-white/5 p-1 rounded-full border border-slate-300/80 dark:border-white/10">
            {[
              { code: "en", label: "EN", title: "English" },
              { code: "it", label: "IT", title: "Italiano" },
              { code: "es", label: "ES", title: "Español" }
            ].map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                title={l.title}
                className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold transition ${lang === l.code
                    ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-xs"
                    : "text-slate-700 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                  }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-slate-50 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-200/90 dark:border-white/15 grid place-items-center text-slate-800 dark:text-amber-300 transition shadow-xs shrink-0 cursor-pointer"
          >
            {theme === "dark" ? (
              <i className="fas fa-sun text-xs sm:text-sm text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <i className="fas fa-moon text-xs sm:text-sm text-sky-600 transition-transform hover:-rotate-12" />
            )}
          </button>

          <a
            href={personal.resumeDownloads?.[0]?.url || "assets/Resume_MohamadUsamaKUNNATHUR_DevOps.pdf"}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-sky-500/25 hover:brightness-110 transition shrink-0"
          >
            <i className="fas fa-file-arrow-down sm:mr-1.5" />
            <span className="hidden sm:inline">{ui.nav.resumeBtn}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
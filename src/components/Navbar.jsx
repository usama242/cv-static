import React, { useState, useEffect, useRef } from 'react';
import { getActiveResume, getAllResumes } from '../i18n';

export default function Navbar({
  personal,
  ui,
  lang,
  setLang,
  theme,
  toggleTheme,
  availableLanguages = []
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const currentResume = getActiveResume(personal, lang);
  const allResumes = getAllResumes(personal, lang);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [menuOpen]);

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
          {/* Dynamic Language Switcher: Only renders if more than 1 language is available */}
          {availableLanguages && availableLanguages.length > 1 && (
            <div className="flex items-center bg-slate-200/60 dark:bg-white/5 p-1 rounded-full border border-slate-300/80 dark:border-white/10">
              {availableLanguages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  title={l.name || l.title || l.label}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold transition cursor-pointer ${
                    lang === l.code
                      ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-xs"
                      : "text-slate-700 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {l.label || l.code.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? (ui.nav.themeLight || "Switch to light mode") : (ui.nav.themeDark || "Switch to dark mode")}
            title={theme === "dark" ? (ui.nav.themeLight || "Switch to light mode") : (ui.nav.themeDark || "Switch to dark mode")}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-slate-50 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-200/90 dark:border-white/15 grid place-items-center text-slate-800 dark:text-amber-300 transition shadow-xs shrink-0 cursor-pointer"
          >
            {theme === "dark" ? (
              <i className="fas fa-sun text-xs sm:text-sm text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <i className="fas fa-moon text-xs sm:text-sm text-sky-600 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Localized Resume Download Button */}
          {currentResume && (
            <div className="relative shrink-0" ref={menuRef}>
              <div className="flex items-center rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 shadow-lg shadow-sky-500/25 hover:brightness-110 transition p-0.5">
                {/* Primary action: downloads the CV in the language currently active */}
                <a
                  href={currentResume.url}
                  target="_blank"
                  rel="noreferrer"
                  title={ui.nav.downloadCurrentTitle || `Download CV (${currentResume.label})`}
                  className="pl-3 pr-2 sm:px-3 py-1.5 text-xs font-semibold text-white flex items-center gap-1.5 hover:opacity-95 transition"
                >
                  <i className="fas fa-file-arrow-down" />
                  <span className="hidden sm:inline">{ui.nav.resumeBtn}</span>
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-white/25 text-white leading-none">
                    {currentResume.lang || lang}
                  </span>
                </a>

                {/* Dropdown toggle: only shown if there are multiple resume files available */}
                {allResumes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-expanded={menuOpen}
                    aria-label={ui.nav.resumeOptions || "Choose CV language"}
                    title={ui.nav.resumeOptions || "Choose CV language"}
                    className="px-2 py-1.5 text-white/90 hover:text-white border-l border-white/25 transition cursor-pointer flex items-center"
                  >
                    <i className={`fas fa-chevron-down text-[10px] transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>

              {/* Dropdown Menu */}
              {menuOpen && allResumes.length > 1 && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#12121a] border border-slate-200/90 dark:border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
                  <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {ui.nav.chooseCvLanguage || "Select CV Language"}
                  </div>
                  <div className="space-y-1">
                    {allResumes.map((r) => (
                      <a
                        key={r.lang}
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                          r.isActive
                            ? "bg-sky-500/15 text-sky-600 dark:text-sky-300 font-bold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-950 dark:hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{r.flag}</span>
                          <span>{r.nativeLabel || r.label}</span>
                        </div>
                        {r.isActive ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-300">
                            {ui.nav.activeLang || "Active"}
                          </span>
                        ) : (
                          <i className="fas fa-file-pdf text-[11px] text-slate-400" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
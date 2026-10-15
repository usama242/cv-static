import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const activeCardVariants = {
    enter: (dir) => ({
        x: dir > 0 ? "35%" : dir < 0 ? "-35%" : 0,
        y: dir === 0 ? 28 : 0,
        opacity: 0,
        scale: 0.94,
        rotateY: dir > 0 ? -7 : dir < 0 ? 7 : 0,
    }),
    center: {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: {
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: (dir) => ({
        x: dir > 0 ? "-35%" : dir < 0 ? "35%" : 0,
        y: dir === 0 ? 20 : 0,
        opacity: 0,
        scale: 0.94,
        rotateY: dir > 0 ? 7 : dir < 0 ? -7 : 0,
        transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function CarouselModal({
    modalDeck,
    setModalDeck,
    deckDirection,
    stepModal,
    goToModalIndex,
    ui
}) {
    const modalUi = ui?.modal || {
        swipeGuidance: "Swipe horizontally between cards",
        prevBtn: "Prev",
        previous: "Previous",
        nextBtn: "Next",
        next: "Next",
        prevCardTitle: "Previous Card (Left Arrow)",
        nextCardTitle: "Next Card (Right Arrow)",
        closeModal: "Close modal"
    };

    const lastSwipeTimeRef = useRef(0);
    const touchStartRef = useRef({ x: 0, y: 0, time: 0 });

    const triggerSwipe = useCallback((dir) => {
        const now = Date.now();
        if (now - lastSwipeTimeRef.current < 420) return;
        lastSwipeTimeRef.current = now;
        stepModal(dir);
    }, [stepModal]);

    // Lock background page scroll whenever the modal is open
    useEffect(() => {
        if (!modalDeck) return;
        const prevBodyOverflow = document.body.style.overflow;
        const prevHtmlOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = prevBodyOverflow;
            document.documentElement.style.overflow = prevHtmlOverflow;
        };
    }, [modalDeck]);

    // Keyboard navigation
    useEffect(() => {
        if (!modalDeck) return;
        const handleKey = (e) => {
            if (e.key === "Escape") setModalDeck(null);
            if (e.key === "ArrowLeft") triggerSwipe(-1);
            if (e.key === "ArrowRight") triggerSwipe(1);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [modalDeck, setModalDeck, triggerSwipe]);

    const handleTouchStart = (e) => {
        if (!e.touches || e.touches.length === 0) return;
        touchStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            time: Date.now()
        };
    };

    const handleTouchEnd = (e) => {
        if (!touchStartRef.current.time) return;
        const touch = e.changedTouches?.[0];
        if (!touch) return;
        const dx = touch.clientX - touchStartRef.current.x;
        const dy = touch.clientY - touchStartRef.current.y;
        const dt = Date.now() - touchStartRef.current.time;

        // Only trigger horizontal swipe when horizontal movement dominates vertical scroll
        const isHorizontal = Math.abs(dx) > Math.abs(dy) * 1.25;
        const isSwipeDistance = Math.abs(dx) > 45;
        const isFlick = dt < 320 && Math.abs(dx) > 30;

        if (isHorizontal && (isSwipeDistance || isFlick)) {
            if (dx < 0) {
                triggerSwipe(1);
            } else {
                triggerSwipe(-1);
            }
        }
        touchStartRef.current = { x: 0, y: 0, time: 0 };
    };

    const activeCard = modalDeck ? modalDeck.items[modalDeck.index] : null;
    const hasMultipleCards = modalDeck && modalDeck.items.length > 1;
    const prevIndex = hasMultipleCards ? (modalDeck.index - 1 + modalDeck.items.length) % modalDeck.items.length : null;
    const nextIndex = hasMultipleCards ? (modalDeck.index + 1) % modalDeck.items.length : null;
    const prevCard = prevIndex !== null ? modalDeck.items[prevIndex] : null;
    const nextCard = nextIndex !== null ? modalDeck.items[nextIndex] : null;

    return (
        <AnimatePresence>
            {modalDeck && activeCard && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    onClick={() => setModalDeck(null)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-2xl z-50 flex flex-col items-center justify-center p-2.5 sm:p-6 overflow-hidden select-none transition-colors"
                >
                    {/* 3D Stage Container */}
                    <div
                        className="relative w-full max-w-7xl flex-1 min-h-0 flex items-center justify-center"
                        style={{ perspective: "1600px" }}
                    >
                        {/* LEFT BLURRED BACKGROUND CARD (Desktop Only) */}
                        {hasMultipleCards && prevCard && (
                            <motion.div
                                key={`prev-${prevCard.id}`}
                                initial={{ opacity: 0, x: -460, scale: 0.7, rotateY: 22 }}
                                animate={{ opacity: 0.42, x: -390, scale: 0.78, rotateY: 16 }}
                                whileHover={{ opacity: 0.75, scale: 0.82, x: -370 }}
                                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    triggerSwipe(-1);
                                }}
                                className="hidden lg:flex flex-col w-[520px] h-[520px] rounded-[30px] overflow-hidden border border-slate-200/90 dark:border-white/15 bg-white/95 dark:bg-[#0e1018] shadow-2xl cursor-pointer absolute z-10 blur-[2px] hover:blur-none transition-colors"
                                title={`${modalUi.previous}: ${prevCard.subtitle} — ${prevCard.title}`}
                            >
                                <div className="relative h-44 w-full shrink-0 overflow-hidden">
                                    <img src={prevCard.img} alt={prevCard.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-[#0e1018] dark:via-[#0e1018]/50 pointer-events-none" />
                                    <span className="absolute top-4 left-5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900/70 text-white dark:bg-white/15 dark:text-white backdrop-blur-md">
                                        &larr; {modalUi.previous}
                                    </span>
                                    <span className="absolute bottom-3 left-5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/25 text-sky-800 dark:bg-sky-500/30 dark:text-sky-200 border border-sky-400/40">
                                        {prevCard.badge} • {prevCard.period}
                                    </span>
                                </div>
                                <div className="p-7 space-y-4 overflow-hidden">
                                    <div>
                                        <h4 className="text-2xl font-black text-slate-900 dark:text-white truncate">{prevCard.title}</h4>
                                        <p className="text-sky-600 dark:text-sky-400 font-semibold text-sm">{prevCard.subtitle}</p>
                                    </div>
                                    <ul className="space-y-2.5">
                                        {(prevCard.highlights || []).slice(0, 3).map((h, i) => (
                                            <li key={i} className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 flex items-start gap-2">
                                                <span className="text-sky-500 dark:text-sky-400">•</span>
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}

                        {/* CENTER ACTIVE FOCUS CARD WRAPPER (Taller on Mobile: h-[85dvh]) */}
                        <div className="relative z-30 w-full max-w-2xl h-[85dvh] sm:h-[650px] sm:max-h-[86vh] flex items-center justify-center">
                            <AnimatePresence mode="popLayout" custom={deckDirection} initial={false}>
                                <motion.div
                                    key={`active-${activeCard.id}`}
                                    custom={deckDirection}
                                    variants={activeCardVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full h-full rounded-[28px] sm:rounded-[32px] overflow-hidden border border-slate-200/90 dark:border-white/20 bg-white dark:bg-[#0e1018] shadow-[0_25px_80px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.85)] flex flex-col select-text transition-colors"
                                >
                                    {activeCard.img && (
                                        <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden">
                                            <img src={activeCard.img} alt={activeCard.title} className="w-full h-full object-cover pointer-events-none" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-[#0e1018] dark:via-[#0e1018]/40 pointer-events-none" />

                                            {/* Top Right Counter & Close Controls */}
                                            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                                                {hasMultipleCards && (
                                                    <span className="px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-slate-900/70 text-slate-100 dark:bg-black/60 dark:text-slate-200 border border-slate-700/60 dark:border-white/15 backdrop-blur-md">
                                                        {modalDeck.index + 1} / {modalDeck.items.length}
                                                    </span>
                                                )}
                                                <button
                                                    onClick={() => setModalDeck(null)}
                                                    className="w-10 h-10 rounded-full bg-slate-900/70 hover:bg-rose-500 text-white dark:bg-black/60 dark:hover:bg-rose-500 grid place-items-center text-xl border border-slate-700/60 dark:border-white/20 transition cursor-pointer"
                                                    aria-label={modalUi.closeModal}
                                                    title={modalUi.closeModal}
                                                >
                                                    &times;
                                                </button>
                                            </div>

                                            <span className="absolute bottom-4 left-6 sm:left-7 px-3.5 py-1 rounded-full text-xs font-bold bg-sky-500/15 text-sky-900 dark:bg-sky-500/30 dark:text-sky-200 border border-sky-400/40 backdrop-blur-md pointer-events-none">
                                                {activeCard.badge} • {activeCard.period}
                                            </span>
                                        </div>
                                    )}

                                    {/* Scrollable Card Body: min-h-0 + flex-1 + overscroll-y-contain traps vertical scroll inside the card */}
                                    <div className="p-6 sm:p-8 flex-1 min-h-0 overflow-y-auto overscroll-y-contain touch-pan-y space-y-6 flex flex-col justify-between">
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{activeCard.title}</h3>
                                                <p className="text-sky-600 dark:text-sky-400 font-semibold text-base mt-1">{activeCard.subtitle}</p>
                                            </div>

                                            <ul className="space-y-3.5">
                                                {(activeCard.highlights || []).map((h, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
                                                        <span className="w-6 h-6 rounded-full bg-sky-500/15 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400 grid place-items-center text-xs font-bold shrink-0 mt-0.5">
                                                            ✓
                                                        </span>
                                                        <span>{h}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Bottom Action Links + Desktop-Only Prev/Next Controls */}
                                        <div className="pt-5 border-t border-slate-200/90 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 mt-auto shrink-0">
                                            <div className="flex flex-wrap gap-3">
                                                {(activeCard.links || []).map((lnk, i) => (
                                                    <a
                                                        key={i}
                                                        href={lnk.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:brightness-110 transition shadow-lg shadow-sky-500/20"
                                                    >
                                                        {lnk.label} <i className="fas fa-arrow-up-right-from-square ml-1.5" />
                                                    </a>
                                                ))}
                                            </div>

                                            {/* Hidden on mobile (`hidden sm:flex`) since mobile swipes horizontally */}
                                            {hasMultipleCards && (
                                                <div className="hidden sm:flex items-center gap-2 ml-auto">
                                                    <button
                                                        onClick={() => triggerSwipe(-1)}
                                                        className="px-3.5 py-2 rounded-full text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200/90 dark:bg-white/5 dark:hover:bg-white/15 active:scale-95 dark:border-white/15 dark:text-slate-200 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                                                        title={modalUi.prevCardTitle}
                                                    >
                                                        <i className="fas fa-chevron-left text-sky-500 dark:text-sky-400" /> {modalUi.prevBtn}
                                                    </button>
                                                    <button
                                                        onClick={() => triggerSwipe(1)}
                                                        className="px-3.5 py-2 rounded-full text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200/90 dark:bg-white/5 dark:hover:bg-white/15 active:scale-95 dark:border-white/15 dark:text-slate-200 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                                                        title={modalUi.nextCardTitle}
                                                    >
                                                        {modalUi.nextBtn} <i className="fas fa-chevron-right text-sky-500 dark:text-sky-400" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* RIGHT BLURRED BACKGROUND CARD (Desktop Only) */}
                        {hasMultipleCards && nextCard && (
                            <motion.div
                                key={`next-${nextCard.id}`}
                                initial={{ opacity: 0, x: 460, scale: 0.7, rotateY: -22 }}
                                animate={{ opacity: 0.42, x: 390, scale: 0.78, rotateY: -16 }}
                                whileHover={{ opacity: 0.75, scale: 0.82, x: 370 }}
                                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    triggerSwipe(1);
                                }}
                                className="hidden lg:flex flex-col w-[520px] h-[520px] rounded-[30px] overflow-hidden border border-slate-200/90 dark:border-white/15 bg-white/95 dark:bg-[#0e1018] shadow-2xl cursor-pointer absolute z-10 blur-[2px] hover:blur-none transition-colors"
                                title={`${modalUi.next}: ${nextCard.subtitle} — ${nextCard.title}`}
                            >
                                <div className="relative h-44 w-full shrink-0 overflow-hidden">
                                    <img src={nextCard.img} alt={nextCard.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-[#0e1018] dark:via-[#0e1018]/50 pointer-events-none" />
                                    <span className="absolute top-4 right-5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900/70 text-white dark:bg-white/15 dark:text-white backdrop-blur-md">
                                        {modalUi.next} &rarr;
                                    </span>
                                    <span className="absolute bottom-3 left-5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/25 text-sky-800 dark:bg-sky-500/30 dark:text-sky-200 border border-sky-400/40">
                                        {nextCard.badge} • {nextCard.period}
                                    </span>
                                </div>
                                <div className="p-7 space-y-4 overflow-hidden">
                                    <div>
                                        <h4 className="text-2xl font-black text-slate-900 dark:text-white truncate">{nextCard.title}</h4>
                                        <p className="text-sky-600 dark:text-sky-400 font-semibold text-sm">{nextCard.subtitle}</p>
                                    </div>
                                    <ul className="space-y-2.5">
                                        {(nextCard.highlights || []).slice(0, 3).map((h, i) => (
                                            <li key={i} className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 flex items-start gap-2">
                                                <span className="text-sky-500 dark:text-sky-400">•</span>
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Apple-Style Interactive Pagination Dots & Mobile Swipe Badge at Bottom */}
                    {hasMultipleCards && (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="mt-3 sm:mt-5 shrink-0 flex flex-col items-center gap-2 z-30 select-none"
                        >
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 dark:bg-white/5 border border-slate-700/50 dark:border-white/10 backdrop-blur-md">
                                {modalDeck.items.map((item, idx) => (
                                    <button
                                        key={item.id}
                                        onClick={() => goToModalIndex(idx)}
                                        title={`${item.subtitle} — ${item.title}`}
                                        className={`h-2 rounded-full transition-all duration-500 ${idx === modalDeck.index
                                                ? "w-7 bg-sky-400 shadow-lg shadow-sky-400/40"
                                                : "w-2 bg-slate-400/50 hover:bg-slate-200 dark:bg-white/25 dark:hover:bg-white/60"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Mobile Touch Swipe Guidance Badge */}
                            <div className="sm:hidden flex items-center gap-2 text-[11px] font-medium text-slate-200 dark:text-slate-400/90 px-3 py-1 rounded-full bg-slate-900/60 dark:bg-white/5 border border-slate-700/50 dark:border-white/10 backdrop-blur-md">
                                <i className="fas fa-arrows-left-right text-sky-400 text-xs animate-pulse" />
                                <span>{modalUi.swipeGuidance}</span>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
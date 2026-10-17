export const ROLE_VISUALS = [
  {
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1400&q=85",
    accent: "text-sky-600 dark:text-sky-400",
    border: "hover:border-sky-500/60 dark:hover:border-sky-400/60",
    badge: "bg-sky-500/15 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300 border-sky-300/70 dark:border-sky-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    accent: "text-violet-600 dark:text-violet-400",
    border: "hover:border-violet-500/60 dark:hover:border-violet-400/60",
    badge: "bg-violet-500/15 text-violet-800 dark:bg-violet-500/20 dark:text-violet-300 border-violet-300/70 dark:border-violet-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
    accent: "text-emerald-600 dark:text-emerald-400",
    border: "hover:border-emerald-500/60 dark:hover:border-emerald-400/60",
    badge: "bg-emerald-500/15 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-300/70 dark:border-emerald-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80",
    accent: "text-amber-700 dark:text-amber-400",
    border: "hover:border-amber-500/60 dark:hover:border-amber-400/60",
    badge: "bg-amber-500/15 text-amber-900 dark:bg-amber-500/20 dark:text-amber-300 border-amber-300/70 dark:border-amber-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    accent: "text-cyan-700 dark:text-cyan-400",
    border: "hover:border-cyan-500/60 dark:hover:border-cyan-400/60",
    badge: "bg-cyan-500/15 text-cyan-900 dark:bg-cyan-500/20 dark:text-cyan-300 border-cyan-300/70 dark:border-cyan-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    accent: "text-rose-600 dark:text-rose-400",
    border: "hover:border-rose-500/60 dark:hover:border-rose-400/60",
    badge: "bg-rose-500/15 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300 border-rose-300/70 dark:border-rose-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    accent: "text-indigo-600 dark:text-indigo-400",
    border: "hover:border-indigo-500/60 dark:hover:border-indigo-400/60",
    badge: "bg-indigo-500/15 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300 border-indigo-300/70 dark:border-indigo-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80",
    accent: "text-teal-700 dark:text-teal-400",
    border: "hover:border-teal-500/60 dark:hover:border-teal-400/60",
    badge: "bg-teal-500/15 text-teal-900 dark:bg-teal-500/20 dark:text-teal-300 border-teal-300/70 dark:border-teal-400/30"
  },
  {
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
    accent: "text-fuchsia-600 dark:text-fuchsia-400",
    border: "hover:border-fuchsia-500/60 dark:hover:border-fuchsia-400/60",
    badge: "bg-fuchsia-500/15 text-fuchsia-800 dark:bg-fuchsia-500/20 dark:text-fuchsia-300 border-fuchsia-300/70 dark:border-fuchsia-400/30"
  }
];

export const INTEREST_IMAGES = [
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80"
];

export function getBentoSpan(index, total) {
  if (total === 4) return "md:col-span-6";
  if (total === 5) return index < 2 ? "md:col-span-6" : "md:col-span-4";
  if (total % 3 === 1 && index === total - 1) return "md:col-span-12";
  if (total % 3 === 2 && index >= total - 2) return "md:col-span-6";
  return "md:col-span-4";
}

export function buildExperienceDeck(experiences, ui) {
  return experiences.map((exp, i) => {
    const vis = ROLE_VISUALS[i % ROLE_VISUALS.length];
    return {
      id: `exp-${i}`,
      badge: exp.badge || (i === 0 ? ui?.experience?.latestBadge : exp.company),
      period: exp.period,
      title: exp.role,
      subtitle: exp.company,
      img: exp.image || vis.img,
      highlights: exp.highlights || [],
      links: exp.companyUrl ? [{ label: exp.company, url: exp.companyUrl }] : []
    };
  });
}

export function buildEducationDeck(degrees, scholarships, ui) {
  const orderedEducation = [...degrees, ...scholarships];
  const degreeLabel = ui?.education?.degreePdf || "Degree PDF";
  const programLabel = ui?.education?.program || "Program";
  const certificateLabel = ui?.education?.certificate || "Certificate";

  return orderedEducation.map((edu, i) => {
    const isDeg = Boolean(edu.gpa) || (!edu.scholarship && edu.type !== "certificate" && edu.type !== "scholarship");
    const defaultImg = isDeg
      ? i === 0
        ? "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
        : "https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1200&q=80"
      : "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1100&q=80";

    const badge = isDeg
      ? (edu.gpa?.text || edu.period || "")
      : (edu.scholarship?.badge || ui?.education?.scholarshipLabel || "HONOR");

    return {
      id: `edu-${i}`,
      badge,
      period: edu.period,
      title: edu.program,
      subtitle: edu.institution,
      img: edu.image || defaultImg,
      highlights: edu.scholarship ? [edu.scholarship.text, ...(edu.highlights || [])] : edu.highlights || [],
      links: [
        ...(edu.programUrl ? [{ label: edu.programDownload ? degreeLabel : programLabel, url: edu.programUrl }] : []),
        ...(edu.gpa?.url ? [{ label: edu.gpa.text, url: edu.gpa.url }] : []),
        ...(edu.scholarship?.credentialUrl ? [{ label: edu.scholarship.credentialText || certificateLabel, url: edu.scholarship.credentialUrl }] : []),
        ...(edu.institutionUrl ? [{ label: edu.institution, url: edu.institutionUrl }] : [])
      ]
    };
  });
}
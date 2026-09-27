/*!
 * Start Bootstrap - Resume v6.0.1 (https://startbootstrap.com/template-overviews/resume)
 * Dynamic JSON rendering & real-time update extensions
 */

(function ($) {
  "use strict";

  // Event delegation for smooth scrolling using jQuery easing
  $(document).on("click", 'a.js-scroll-trigger[href*="#"]:not([href="#"])', function () {
    if (
      location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "") &&
      location.hostname === this.hostname
    ) {
      var target = $(this.hash);
      target = target.length
        ? target
        : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(document).on("click", ".js-scroll-trigger", function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#sideNav",
  });
})(jQuery);

/* ==========================================================================
   Tick / Flip Counter Integration
   ========================================================================== */
let globalTickInstance = null;
let activeTickCounter = null;

function updateTickCounter(startDate) {
  if (!globalTickInstance || !window.Tick) return;
  if (activeTickCounter && typeof activeTickCounter.stop === "function") {
    try {
      activeTickCounter.stop();
    } catch (e) {}
  }
  try {
    activeTickCounter = Tick.count.up(startDate, {
      format: ["y", "M", "d", "h", "m", "s"],
    });
    activeTickCounter.onupdate = function (value) {
      globalTickInstance.value = value;
    };
  } catch (e) {
    console.warn("Tick counter update error:", e);
  }
}

function handleTickInit(tick) {
  globalTickInstance = tick;
  const startDate =
    (window.CV_DATA &&
      window.CV_DATA.experienceCounter &&
      window.CV_DATA.experienceCounter.startDate) ||
    "2020-05-01T00:00:00";
  updateTickCounter(startDate);
}

/* ==========================================================================
   HTML Escaping Helper
   ========================================================================== */
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  if (typeof str !== "string") return String(str);
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ==========================================================================
   DOM Render Functions
   ========================================================================== */

function renderPersonal(personal) {
  if (!personal) return;

  if (personal.pageTitle) {
    document.title = personal.pageTitle;
    const titleEl = document.getElementById("page-title");
    if (titleEl) titleEl.textContent = personal.pageTitle;
  }

  if (personal.favicon) {
    const fav = document.getElementById("page-favicon");
    if (fav) fav.href = personal.favicon;
  }

  const brandName = document.getElementById("brand-name");
  if (brandName) {
    brandName.textContent = `${personal.firstName || ""} ${personal.lastName || ""}`.trim();
  }

  const profileImg = document.getElementById("profile-img");
  if (profileImg && personal.profileImage) {
    profileImg.src = personal.profileImage;
    profileImg.alt = `${personal.firstName || ""} ${personal.lastName || ""}`.trim();
  }

  const aboutName = document.getElementById("about-name");
  if (aboutName) {
    aboutName.innerHTML = `${escapeHtml(personal.firstName)} <span class="text-primary">${escapeHtml(personal.lastName)}</span>`;
  }

  const aboutSubheading = document.getElementById("about-subheading");
  if (aboutSubheading) {
    aboutSubheading.innerHTML = `${escapeHtml(personal.location)} · ${escapeHtml(personal.phone)} · <a href="mailto:${escapeHtml(personal.email)}">${escapeHtml(personal.email)}</a>`;
  }

  const aboutBio = document.getElementById("about-bio");
  if (aboutBio) {
    aboutBio.textContent = personal.bio || "";
  }

  const socialsContainer = document.getElementById("about-socials");
  if (socialsContainer && Array.isArray(personal.socialLinks)) {
    socialsContainer.innerHTML = personal.socialLinks
      .map(
        (link) => `
      <a class="social-icon" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(link.platform)}">
        <i class="${escapeHtml(link.icon)}"></i>
      </a>`
      )
      .join("");
  }

  const resumeDropdown = document.getElementById("resume-dropdown-menu");
  if (resumeDropdown && Array.isArray(personal.resumeDownloads)) {
    resumeDropdown.innerHTML = personal.resumeDownloads
      .map(
        (item) => `
      <a class="dropdown-item" href="${escapeHtml(item.url)}" download>${escapeHtml(item.label)}</a>`
      )
      .join("");
  }
}

function renderExperience(counter, experiences) {
  const counterContainer = document.getElementById("experience-counter-container");
  if (counterContainer) {
    if (counter && counter.enabled === false) {
      counterContainer.style.display = "none";
    } else {
      counterContainer.style.display = "";
      const titleEl = document.getElementById("experience-counter-title");
      if (titleEl && counter && counter.title) {
        titleEl.textContent = counter.title;
      }
      if (counter && counter.startDate) {
        updateTickCounter(counter.startDate);
      }
    }
  }

  const list = document.getElementById("experience-list");
  if (!list || !Array.isArray(experiences)) return;

  list.innerHTML = experiences
    .map((exp, index) => {
      const isLast = index === experiences.length - 1;
      const mbClass = isLast ? "" : "mb-5";
      const companyHtml = exp.companyUrl
        ? `<a href="${escapeHtml(exp.companyUrl)}" target="_blank" rel="noopener noreferrer"><div class="subheading mb-3">${escapeHtml(exp.company)}</div></a>`
        : `<div class="subheading mb-3">${escapeHtml(exp.company)}</div>`;
      const highlightsHtml = Array.isArray(exp.highlights)
        ? exp.highlights.map((h) => `<p>${escapeHtml(h)}</p>`).join("")
        : "";

      return `
      <div class="d-flex flex-column flex-md-row justify-content-between ${mbClass}">
        <div class="flex-grow-1">
          <h3 class="mb-0">${escapeHtml(exp.role)}</h3>
          ${companyHtml}
          ${highlightsHtml}
        </div>
        <div class="flex-shrink-0">
          <span class="text-primary">${escapeHtml(exp.period)}</span>
        </div>
      </div>`;
    })
    .join("");
}

function renderEducation(educationList) {
  const container = document.getElementById("education-list");
  if (!container || !Array.isArray(educationList)) return;

  container.innerHTML = educationList
    .map((edu, index) => {
      const isLast = index === educationList.length - 1;
      const mbClass = isLast ? "" : "mb-5";

      const institutionHtml = edu.institutionUrl
        ? `<a href="${escapeHtml(edu.institutionUrl)}" target="_blank" rel="noopener noreferrer"><h3 class="mb-0">${escapeHtml(edu.institution)}</h3></a>`
        : `<h3 class="mb-0">${escapeHtml(edu.institution)}</h3>`;

      let programHtml = "";
      if (edu.program) {
        if (edu.programUrl) {
          const downloadAttr = edu.programDownload
            ? "download"
            : 'target="_blank" rel="noopener noreferrer"';
          programHtml = `<a href="${escapeHtml(edu.programUrl)}" ${downloadAttr}><div class="subheading mb-3">${escapeHtml(edu.program)}</div></a>`;
        } else {
          programHtml = `<div class="subheading mb-3">${escapeHtml(edu.program)}</div>`;
        }
      }

      let scholarshipHtml = "";
      if (edu.scholarship) {
        let credLink = "";
        if (edu.scholarship.credentialUrl) {
          credLink = ` For Credentials <a href="${escapeHtml(edu.scholarship.credentialUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(edu.scholarship.credentialText || "click here")}</a>`;
        }
        scholarshipHtml = `<p>${escapeHtml(edu.scholarship.text)}${credLink}</p>`;
      }

      let gpaHtml = "";
      if (edu.gpa) {
        if (edu.gpa.url) {
          const downloadAttr = edu.gpa.download
            ? "download"
            : 'target="_blank" rel="noopener noreferrer"';
          gpaHtml = `<a href="${escapeHtml(edu.gpa.url)}" ${downloadAttr}><p>${escapeHtml(edu.gpa.text)}</p></a>`;
        } else {
          gpaHtml = `<p>${escapeHtml(edu.gpa.text)}</p>`;
        }
      }

      const highlightsHtml = Array.isArray(edu.highlights)
        ? edu.highlights.map((h) => `<p>${escapeHtml(h)}</p>`).join("")
        : "";

      return `
      <div class="d-flex flex-column flex-md-row justify-content-between ${mbClass}">
        <div class="flex-grow-1">
          ${institutionHtml}
          ${programHtml}
          ${scholarshipHtml}
          ${gpaHtml}
          ${highlightsHtml}
        </div>
        <div class="flex-shrink-0">
          <span class="text-primary">${escapeHtml(edu.period)}</span>
        </div>
      </div>`;
    })
    .join("");
}

function renderSkills(skillsData) {
  const container = document.getElementById("skills-container");
  if (!container || !Array.isArray(skillsData)) return;

  container.innerHTML = skillsData
    .map((cat, index) => {
      const isLast = index === skillsData.length - 1;
      const ulClass = isLast ? "mb-0" : "mb-3";
      const itemsHtml = Array.isArray(cat.items)
        ? cat.items
            .map(
              (item) => `
          <li>
            <span class="fa-li"><i class="${escapeHtml(item.icon)}"></i></span>
            ${escapeHtml(item.text)}
          </li>`
            )
            .join("")
        : "";

      return `
      <div class="subheading mb-3 text-primary">${escapeHtml(cat.category)}</div>
      <ul class="fa-ul ${ulClass}">
        ${itemsHtml}
      </ul>`;
    })
    .join("");
}

function renderProjects(projectsData) {
  const container = document.getElementById("projects-container");
  if (!container || !Array.isArray(projectsData)) return;

  container.innerHTML = projectsData
    .map((cat, index) => {
      const isLast = index === projectsData.length - 1;
      const ulClass = isLast ? "mb-0" : "mb-4";
      const itemsHtml = Array.isArray(cat.items)
        ? cat.items
            .map((item) => {
              const linkHtml = item.url
                ? ` <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer"><span><i class="fas fa-up-right-from-square"></i></span></a>`
                : "";
              return `
          <li class="mb-2">
            <span class="fa-li"><i class="${escapeHtml(item.icon)}"></i></span>
            <p>
              ${escapeHtml(item.text)}${linkHtml}
            </p>
          </li>`;
            })
            .join("")
        : "";

      return `
      <div class="subheading mb-3 text-primary">${escapeHtml(cat.category)}</div>
      <ul class="fa-ul ${ulClass}">
        ${itemsHtml}
      </ul>`;
    })
    .join("");
}

function renderInterests(interestsData) {
  const container = document.getElementById("interests-list");
  if (!container || !Array.isArray(interestsData)) return;

  container.innerHTML = interestsData
    .map(
      (item) => `
    <li class="mb-2">
      <span class="fa-li"><i class="${escapeHtml(item.icon)}"></i></span>
      <p>
        <strong>${escapeHtml(item.title)}:</strong> ${escapeHtml(item.description)}
      </p>
    </li>`
    )
    .join("");
}

function renderAll(data) {
  if (!data) return;
  renderPersonal(data.personal);
  renderExperience(data.experienceCounter, data.experiences);
  renderEducation(data.education);
  renderSkills(data.skills);
  renderProjects(data.projects);
  renderInterests(data.interests);

  if (window.jQuery && typeof $("body").scrollspy === "function") {
    $("body").scrollspy("refresh");
  }
}

/* ==========================================================================
   Real-Time Data Loading & Live Sync
   ========================================================================== */
let lastDataText = "";

async function loadAndRenderData(options = {}) {
  try {
    // Cache-busting query param ensures browsers & CDN never return stale cache
    const response = await fetch(`data.json?v=${Date.now()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const text = await response.text();
    if (text === lastDataText) {
      return; // No changes detected
    }

    const data = JSON.parse(text);
    lastDataText = text;
    window.CV_DATA = data;
    renderAll(data);

    // Hide local file notice if data loaded successfully
    const notice = document.getElementById("local-file-notice");
    if (notice) notice.classList.add("d-none");
  } catch (err) {
    if (!options.silent) {
      console.warn("Could not load data.json:", err);
      // If running locally via file://, display friendly instructions & use fallback
      if (window.location.protocol === "file:") {
        const notice = document.getElementById("local-file-notice");
        if (notice) notice.classList.remove("d-none");
      }
      if (window.CV_FALLBACK_DATA && !window.CV_DATA) {
        window.CV_DATA = window.CV_FALLBACK_DATA;
        renderAll(window.CV_FALLBACK_DATA);
      }
    }
  }
}

// Initial load
document.addEventListener("DOMContentLoaded", function () {
  loadAndRenderData();
});

// Real-time synchronization:
// 1. When the user returns to the browser tab after editing data.json
window.addEventListener("focus", function () {
  loadAndRenderData({ silent: true });
});

document.addEventListener("visibilitychange", function () {
  if (!document.hidden) {
    loadAndRenderData({ silent: true });
  }
});

// 2. Poll for updates every 10 seconds while the page is visible
setInterval(function () {
  if (!document.hidden) {
    loadAndRenderData({ silent: true });
  }
}, 10000);

/* ==========================================================================
   Fallback Data (Used only if local file:// restrictions block fetch)
   ========================================================================== */
window.CV_FALLBACK_DATA = {
  personal: {
    firstName: "Mohamad Usama",
    lastName: "KUNNATHUR",
    pageTitle: "Mohamad Usama KUNNATHUR",
    location: "Bari 10124",
    phone: "(+39) 393 102 4267",
    email: "mohamadusama242@gmail.com",
    bio: "I am a DevOps and Cloud Engineer, harnessing over six years of expertise in crafting, automating, and nurturing Cloud infrastructure and environments. As a quick learner and team player, I bring a blend of skills and a keen interest in AI, backed by a background in Management and Engineering, granting me a distinctive outlook within the team.",
    profileImage: "assets/img/profile.jpg",
    favicon: "assets/img/favicon.ico",
    resumeDownloads: [
      {
        label: "English",
        url: "assets/Resume_MohamadUsamaKUNNATHUR_DevOps.pdf",
      },
    ],
    socialLinks: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/usama242/",
        icon: "fab fa-linkedin-in",
      },
      {
        platform: "GitHub",
        url: "https://github.com/usama242/",
        icon: "fab fa-github",
      },
      {
        platform: "Facebook",
        url: "https://www.facebook.com/mohamadusama242/",
        icon: "fab fa-facebook-f",
      },
    ],
  },
  experienceCounter: {
    enabled: true,
    title: "Total Experience as a DevOps Engineer",
    startDate: "2020-05-01T00:00:00",
  },
  experiences: [
    {
      "role": "DevOps Engineer",
      "company": "LTIMindtree",
      "companyUrl": "https://www.ltimindtree.com/",
      "period": "Oct 2025 - Present",
      "highlights": [
        "Working on a blockchain-based application for NEXI",
        "Involves automation of deployment to linux VMs as well as monitoring",
        "Also test-automation using suites like postman, selenium, and playwright.",
        "Infrastructure planning and modernizing legacy applications (containers, kubernetes)."
      ]
    },
    {
      role: "DevOps Engineer",
      company: "Sense Reply",
      companyUrl: "https://www.reply.com/sense-reply/en/",
      period: "Nov 2024 - Oct 2025",
      highlights: [
        "Administering and upgrading Site Controller virtual machines through Ansible automation and Linux-based systems.",
        "Designing and provisioning infrastructure using Terraform, integrated with CI/CD pipelines via Jenkins.",
        "Modernizing legacy applications by migrating from Ubuntu Xenial to Ubuntu Focal.",
        "Overseeing and monitoring Site Controllers utilizing Sensu and Graphite.",
      ],
    },
    {
      role: "DevOps Engineer",
      company: "Infocert",
      companyUrl: "https://www.infocert.it/",
      period: "Oct 2023 - Nov 2024",
      highlights: [
        "Working on Identity products such as SPID, Gosign, etc.",
        "Orchestrating containerization for legacy application modernization and deployment efficiency.",
        "Migrating on-premises applications to cloud platforms",
        "Administering databases and overseeing observability measures",
      ],
    },
    {
      role: "DevOps Engineer",
      company: "Idea 75",
      companyUrl: "https://www.idea75.it/",
      period: "Oct 2022 - Oct 2023",
      highlights: [
        "Co-ordinating with a group of developers spanning different projects.",
        "Facilitate deployment automation and CI/CD. Monitoring and observability.",
        "Reduce bottlenecks (Build times, latency) and optimize costs (Rescaling resources)",
        "Ensure zero downtime and high availability (Load balancing & autoscaling resources)",
      ],
    },
    {
      role: "Cloud Developer",
      company: "Reply",
      companyUrl: "https://www.reply.com/",
      period: "May 2020 - Oct 2022",
      highlights: [
        "Worked on lambda functions usually in Python. The deployment is serverless in AWS.",
        "Managed IoT devices of the project Enel-X and also involved in troubleshooting",
        "Oversaw the fix deployment and management of the pipeline. Which involves automating deployment.",
        "Recommended redimensioning of resources saving about $10k / month",
      ],
    },
    {
      role: "Project Manager Intern",
      company: "Associazione Erminio Bullio",
      companyUrl: "https://www.linkedin.com/company/associazionebullio/",
      period: "July 2019 - Sep 2019",
      highlights: [
        "Primarily involved on Project Lifecycle Management of a construction project.",
        "Worked on developing custom modules in Odoo PLM software. The modules were written in Python.",
      ],
    },
    {
      role: "Business Development Manager",
      company: "Cansa Tarim Makinalari",
      companyUrl: "https://www.cansatarim.com.tr/en/",
      period: "Aug 2016 - Aug 2017",
      highlights: [
        "The main responsibilities were identifying new business opportunities.",
        "Also marketing and communicating with international clients.",
      ],
    },
    {
      role: "English Teacher",
      company: "Oxford English Academy",
      companyUrl: null,
      period: "October 2013 - July 2016",
      highlights: [
        "Worked as a part-time English teacher for students of different levels.",
        "Worked under pressure and have acquired efficient time management capabilities.",
        "I believe If you can manage a bunch of teenagers, you can manage anyone.",
      ],
    },
    {
      role: "Public Relations Intern",
      company: "University of Turkish Aeronautical Association",
      companyUrl: "https://www.thk.edu.tr",
      period: "November 2013 - June 2014",
      highlights: [
        "Worked in promoting and marketing the university.",
        "Managed the calls and answered the questions of prospective students.",
      ],
    },
  ],
  education: [
    {
      institution: "Udacity",
      institutionUrl: "https://www.udacity.com",
      program: "Foundations of Ethical Hacking",
      programUrl:
        "https://www.udacity.com/course/ethical-hacker-nanodegree--nd350",
      period: "Dec 2024 - Feb 2025",
      scholarship: {
        text: "Won the scholarship offered by Bertelsmann amongst many applicants.",
        credentialText: "click here",
        credentialUrl:
          "https://www.udacity.com/certificate/e/0a3ff0e4-b7ba-11ef-bd16-a30affcc1afd",
      },
      highlights: [
        "Performing vulnerability scans and managing prioritization and response",
        "Conducting system audits, researching vulnerabilities, and writing reports",
        "Exploring social engineering tactics, phishing simulations, and malware deployment",
      ],
    },
    {
      institution: "Udacity",
      institutionUrl: "https://www.udacity.com",
      program: "DevOps Engineer",
      programUrl:
        "https://www.udacity.com/course/cloud-devops-using-microsoft-azure-nanodegree--nd082",
      period: "July 2022 - Nov 2022",
      scholarship: {
        text: "Won the scholarship offered by Bosch amongst many applicants.",
        credentialText: "click here",
        credentialUrl:
          "https://www.udacity.com/certificate/e/0c49641e-0692-11ed-85b7-2b04fbc37882",
      },
      highlights: [
        "Focus on Infrastructure deployment using Terraform and Packer",
        "Agile development, functional and performance testing",
        "Cloud-native app development using Docker and Kubernetes",
      ],
    },
    {
      institution: "Udacity",
      institutionUrl: "https://www.udacity.com",
      program: "Front-End Web development",
      programUrl:
        "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011",
      period: "January 2020 - March 2020",
      scholarship: {
        text: "Won the scholarship offered by Google amongst many applicants.",
        credentialText: "click here",
        credentialUrl:
          "https://www.udacity.com/certificate/e/91c55920-9a8a-11ea-9b6c-fb92acf7e0e2",
      },
      highlights: [
        "Focus on CSS, JavaScript, APIs, Build tools & Express. In backend the focus on node.js.",
        "Also front-end libraries such as React. Best practices of coding and website optimization.",
      ],
    },
    {
      institution: "Politecnico di Torino",
      institutionUrl: "https://www.polito.it",
      program: "Masters in Engineering & Management",
      programUrl: null,
      period: "September 2017 - March 2020",
      gpa: {
        text: "GPA: 100/110",
        url: "https://sid.polito.it/TinyUrl-1.0/verifypdf/pdf.html?url=KKHjsyk5uLw",
      },
      highlights: [
        "Concentration in Project Management, Production & Quality engineering",
        "Also focus in Economics, Financial Engineering, Strategy & Innovation Management",
        "Thesis on Applying Artificial Intelligence techniques in Project Management",
      ],
    },
    {
      institution: "University of Turkish Aeronautical Association",
      institutionUrl: "https://www.thk.edu.tr",
      program: "Bachelors in Aeronautical Engineering",
      programUrl: "assets/Degree_Bachelor.pdf",
      programDownload: true,
      period: "September 2012 - June 2016",
      gpa: {
        text: "GPA: 3.08/4.0",
        url: "assets/Diploma_Supplement_Bachelor.pdf",
        download: true,
      },
      highlights: [
        "Concentration in Aerodynamics, FEM & CAD",
        "Academic internship on solving Navier-stokes equation using Python",
        "Academic internship on analysis of Francis Turbine using Ansys Fluent",
      ],
    },
  ],
  skills: [
    {
      category: "Developer",
      items: [
        {
          icon: "fab fa-aws",
          text: "API Gateway, Cloudwatch, Lambda, EC2, VPC, S3, SQS, SNS, etc",
        },
        {
          icon: "fab fa-microsoft",
          text: "Azure vm, active-directory, policy, AZ CLI, etc",
        },
        {
          icon: "fas fa-code-compare",
          text: "Bamboo, Gitlab, Cloudformation, Terraform, etc",
        },
        {
          icon: "fab fa-docker",
          text: "Git, Docker, Kubernetes, Packer, etc",
        },
        {
          icon: "fas fa-circle-nodes",
          text: "Kuberentes tools like Helm, Kustomize, ArgoCD, Openshift, K9s, etc",
        },
        {
          icon: "fas fa-laptop-medical",
          text: "Monitoring tools like Grafana, Prometheus, Loki, Kibana, Sensu, etc",
        },
        {
          icon: "fas fa-spell-check",
          text: "API testing (Postman), Functional UI testing (Selenium), Performance testing (Jmeter), etc",
        },
        {
          icon: "fab fa-linux",
          text: "Bash scripting, Powershell, Nginx, Remote SSH, etc",
        },
        {
          icon: "fas fa-server",
          text: "Configuration management tools like Ansible, Chef, Puppet, etc",
        },
        {
          icon: "fab fa-python",
          text: "Django, Flask, SQLAlchemy, etc",
        },
        {
          icon: "fab fa-html5",
          text: "HTML, CSS, Bootstrap, Babel, SASS, LESS etc",
        },
        {
          icon: "fab fa-js-square",
          text: "React, Redux, Node.js, Express.js, Typescript, etc",
        },
        {
          icon: "fas fa-database",
          text: "MongoDB, MySQL, PostgreSQL, DynamoDB, Elasticsearch etc",
        },
      ],
    },
    {
      category: "Engineering",
      items: [
        {
          icon: "fas fa-compass-drafting",
          text: "CAD (Solidworks, Catia, AutoCAD, etc.)",
        },
        {
          icon: "fas fa-water",
          text: "CFD (Ansys Fluent, Autodesk CFD, etc.)",
        },
        {
          icon: "fas fa-hammer",
          text: "FEA (Abaqus, Nastran, Patran, etc.)",
        },
        {
          icon: "fas fa-code",
          text: "Matlab & Simulink",
        },
      ],
    },
    {
      category: "Management",
      items: [
        {
          icon: "fas fa-diagram-project",
          text: "PM methodologies (Scrum, Agile, Kanban, etc.)",
        },
        {
          icon: "fab fa-jira",
          text: "PM tools (MS Project, Jira, Odoo, etc.)",
        },
        {
          icon: "fas fa-briefcase",
          text: "Business analytics tools (SAP, Oracle, SAS, Tableu, etc.)",
        },
        {
          icon: "fas fa-chart-line",
          text: "Marketing tools (SEO, Google Analytics, Hubspot, etc.)",
        },
      ],
    },
    {
      category: "Miscellaneous",
      items: [
        {
          icon: "fas fa-bullhorn",
          text: "Public Speaking (Toastmasters)",
        },
        {
          icon: "fas fa-people-group",
          text: "Flexible, Easily Adaptable & Team Player",
        },
        {
          icon: "fas fa-clock",
          text: "Time management & Working under pressure",
        },
        {
          icon: "fas fa-map-location",
          text: "Available to relocate",
        },
      ],
    },
    {
      category: "Languages",
      items: [
        {
          icon: "fas fa-battery-full",
          text: "English",
        },
        {
          icon: "fas fa-battery-full",
          text: "Urdu",
        },
        {
          icon: "fas fa-battery-full",
          text: "Hindi",
        },
        {
          icon: "fas fa-battery-three-quarters",
          text: "Turkish",
        },
        {
          icon: "fas fa-battery-three-quarters",
          text: "Italian",
        },
      ],
    },
  ],
  projects: [
    {
      category: "Developer Github",
      items: [
        {
          icon: "fab fa-microsoft",
          text: "Deploying a scalable IaaS web server in Azure using Terraform",
          url: "https://github.com/usama242/Terraform-packer-project",
        },
        {
          icon: "fab fa-microsoft",
          text: "Building a CI/CD pipeline using Azure pipelines & GitHub Actions",
          url: "https://github.com/usama242/CICD-pipeline-azure",
        },
        {
          icon: "fab fa-microsoft",
          text: "Ensuring quality releases with API, functional & perf testing",
          url: "https://github.com/usama242/Ensuring_Quality_Releases",
        },
        {
          icon: "fab fa-microsoft",
          text: "Automated Docker Image Creation, VM Provisioning, and Kubernetes Deployment",
          url: "https://github.com/usama242/techtrends",
        },
        {
          icon: "fab fa-microsoft",
          text: "Best coding practices and unit test",
          url: "https://github.com/usama242/Predict_Customer_Churn",
        },
        {
          icon: "fas fa-plane",
          text: "Online travel app using multiple APIs",
          url: "https://github.com/usama242/Project-5",
        },
        {
          icon: "fas fa-cloud",
          text: "An asynchronous Weather Journal app using OpenWeatherMap API",
          url: "https://github.com/usama242/Project-3",
        },
        {
          icon: "fas fa-cart-shopping",
          text: "Evaluate a news article with Natural Language Processing",
          url: "https://github.com/usama242/Project-4",
        },
        {
          icon: "fas fa-blog",
          text: "Multi-page Blog website with HTML and pure CSS",
          url: "https://github.com/usama242/Project-1",
        },
      ],
    },
    {
      category: "Engineering Publications",
      items: [
        {
          icon: "fas fa-microchip",
          text: "Applying Artificial Intelligence techniques in Project Management",
          url: "https://www.researchgate.net/publication/340460180_Applying_Artificial_Intelligence_techniques_in_Project_Management",
        },
        {
          icon: "fas fa-plane",
          text: "Design of a UAV with Variable-Span Morphing Wing",
          url: "https://www.researchgate.net/publication/304013506_Design_of_a_UAV_with_Variable-Span_Morphing_Wing",
        },
        {
          icon: "fas fa-square",
          text: "States of Stress and Strain in a Semi-Infinite Plate",
          url: null,
        },
        {
          icon: "fas fa-plane",
          text: "Analysis of a Catapult-Launched Delta-Wing Glider",
          url: null,
        },
        {
          icon: "fas fa-bullseye",
          text: "Conceptual Design of a Surface-to-Air Missile",
          url: null,
        },
        {
          icon: "fas fa-square",
          text: "Plane Stress Analysis of a Rectangular Plate Subjected to a Concentrated Load",
          url: null,
        },
      ],
    },
  ],
  interests: [
    {
      icon: "fas fa-camera-retro",
      title: "Photo Enthusiast",
      description: "Capturing souls with a click, one portrait at a time.",
    },
    {
      icon: "fas fa-route",
      title: "Cultural Explorer",
      description:
        "Jet-setting through flavors and traditions, passport in hand.",
    },
    {
      icon: "fas fa-pizza-slice",
      title: "Culinary Adventurer",
      description:
        "Stirring magic in the kitchen, experimenting with global cuisines.",
    },
    {
      icon: "fas fa-chess-knight",
      title: "Galactic Chessmaster",
      description:
        "Checkmate echoes across the universe, victory in constellations.",
    },
    {
      icon: "fas fa-film",
      title: "Cinephile Starship",
      description:
        "Discussing movies under starry skies with fellow cosmic travelers.",
    },
  ],
};
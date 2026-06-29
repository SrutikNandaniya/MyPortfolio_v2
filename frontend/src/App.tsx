import { useEffect, useState, useCallback } from "react";

/* ──────────────────────────── REVEAL ON SCROLL ──────────────────────────── */
function useRevealOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window))
      return;
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ──────────────────────────── THEME ──────────────────────────── */
type Theme = "dark" | "light";

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sn-theme");
      if (saved === "light" || saved === "dark") return saved;
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("sn-theme", theme);
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );
  return { theme, toggle };
}

/* ──────────────────────────── RESUME ──────────────────────────── */
const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/resume.pdf";
  link.download = "Srutik_Nandaniya_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/* ──────────────────────────── ACTIVE SECTION ──────────────────────────── */
// function useActiveSection(ids: string[]) {
//   const [activeSection, setActiveSection] = useState(ids[0]);

//   useEffect(() => {
//     const sections = ids
//       .map((id) => document.getElementById(id))
//       .filter(Boolean) as HTMLElement[];

//     const observer = new IntersectionObserver(
//       (entries) => {
//         const visibleSections = entries
//           .filter((entry) => entry.isIntersecting)
//           .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

//         if (visibleSections.length > 0) {
//           setActiveSection(visibleSections[0].target.id);
//         }
//       },
//       {
//         rootMargin: "-25% 0px -45% 0px",
//         threshold: [0.15, 0.3, 0.5, 0.7],
//       }
//     );

//     sections.forEach((section) => observer.observe(section));

//     return () => {
//       sections.forEach((section) => observer.unobserve(section));
//       observer.disconnect();
//     };
//   }, [ids]);

//   return activeSection;
// }

function useActiveSection(ids: string[]) {
  const [activeSection, setActiveSection] = useState(ids[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let current = ids[0];

      ids.forEach((id) => {
        const section = document.getElementById(id);

        if (section && scrollPosition >= section.offsetTop) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids]);
  return activeSection;
}

/* ──────────────────────────── ICONS ──────────────────────────── */
const Icons = {
  LinkedIn: () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  GitHub: () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  Email: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
      />
    </svg>
  ),
  Download: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4-4 4m0 0-4-4m4 4V4"
      />
    </svg>
  ),
  Arrow: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 8l4 4m0 0-4 4m4-4H3"
      />
    </svg>
  ),
  Menu: () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  ),
  Close: () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  ),
  Graduation: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M22 10 12 5 2 10l10 5 10-5Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 12v5c3 2 9 2 12 0v-5"
      />
    </svg>
  ),
  Certificate: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 3h10a2 2 0 0 1 2 2v14l-4-2-3 2-3-2-4 2V5a2 2 0 0 1 2-2Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 8h8M8 12h6"
      />
    </svg>
  ),
  Sun: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="5" strokeWidth={2} />
      <path
        strokeWidth={2}
        strokeLinecap="round"
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      />
    </svg>
  ),
  Moon: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      />
    </svg>
  ),
  ExternalLink: () => (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  ),
  Phone: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .95.68l1.07 3.21a1 1 0 0 1-.24 1l-1.69 1.69a16 16 0 0 0 6.73 6.73l1.69-1.69a1 1 0 0 1 1-.24l3.21 1.07a1 1 0 0 1 .68.95V19a2 2 0 0 1-2 2h-1C9.72 21 3 14.28 3 6V5z"
      />
    </svg>
  ),
  Briefcase: () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0 1 12 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m4 6h.01M5 20h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
      />
    </svg>
  ),
};

/* ──────────────────────────── DATA ──────────────────────────── */
type TechnicalSkill = { name: string; icon: string };
type TechnicalSkillGroup = {
  title: string;
  direction: "left" | "right";
  skills: TechnicalSkill[];
};

const inlineSvgIcon = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const fullColorIcons: Record<string, string> = {
  python:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  sql: "https://img.icons8.com/color/48/sql.png",
  api: "https://img.icons8.com/color/48/api-settings.png",
  fastapi:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  github: "https://img.icons8.com/fluency/48/github.png",
  docker:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  brain: "https://img.icons8.com/color/48/artificial-intelligence.png",
  network: inlineSvgIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><linearGradient id="a" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#34d399"/><stop offset="1" stop-color="#059669"/></linearGradient></defs><rect width="48" height="48" rx="14" fill="#ecfdf5"/><path d="M15 15h18M15 33h18M18 17l12 14M30 17 18 31" stroke="url(#a)" stroke-width="3" stroke-linecap="round"/><circle cx="15" cy="15" r="5" fill="#10b981"/><circle cx="33" cy="15" r="5" fill="#22c55e"/><circle cx="15" cy="33" r="5" fill="#059669"/><circle cx="33" cy="33" r="5" fill="#14b8a6"/></svg>',
  ),
  language: "https://img.icons8.com/color/48/language.png",
  llm: inlineSvgIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><linearGradient id="b" x1="10" y1="8" x2="38" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#6ee7b7"/><stop offset="1" stop-color="#047857"/></linearGradient></defs><rect width="48" height="48" rx="14" fill="#ecfdf5"/><rect x="10" y="13" width="28" height="21" rx="8" fill="url(#b)"/><path d="M17 34l-4 5v-7" fill="#047857"/><circle cx="19" cy="23" r="2.3" fill="white"/><circle cx="29" cy="23" r="2.3" fill="white"/><path d="M19 29c3 2 7 2 10 0" stroke="white" stroke-width="2.5" stroke-linecap="round"/><path d="M24 9v4" stroke="#059669" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="8" r="3" fill="#10b981"/></svg>',
  ),
  search: "https://img.icons8.com/color/48/search--v1.png",
  prompt: "https://img.icons8.com/color/48/command-line.png",
  transformer: "https://img.icons8.com/color/48/mind-map.png",
  tune: "https://img.icons8.com/color/48/settings--v1.png",
  pandas:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
  numpy:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
  matplotlib:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg",
  scikitlearn:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
  n8n: "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/light/n8n-color.png",
  pytorch:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
  huggingface:
    "https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo.svg",
  chain: "https://img.icons8.com/color/48/link.png",
  index: "https://img.icons8.com/color/48/database.png",
  database: "https://img.icons8.com/color/48/data-configuration.png",
  jupyter:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg",
};

const technicalSkillGroups: TechnicalSkillGroup[] = [
  {
    title: "Programming & Backend Development",
    direction: "left",
    skills: [
      { name: "Python", icon: "python" },
      { name: "SQL", icon: "sql" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "REST APIs", icon: "api" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Docker", icon: "docker" },
    ],
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    direction: "right",
    skills: [
      { name: "Machine Learning", icon: "brain" },
      { name: "Deep Learning", icon: "network" },
      { name: "NLP", icon: "language" },
      { name: "LLMs", icon: "llm" },
      { name: "RAG", icon: "search" },
      { name: "Prompt Engineering", icon: "prompt" },
      { name: "Transformer Models", icon: "transformer" },
      { name: "Fine-Tuning", icon: "tune" },
    ],
  },
  {
    title: "Frameworks, Libraries & Tools",
    direction: "left",
    skills: [
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "Scikit-learn", icon: "scikitlearn" },
      { name: "n8n", icon: "n8n" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "Hugging Face", icon: "huggingface" },
      { name: "LangChain", icon: "chain" },
      { name: "FAISS", icon: "index" },
      { name: "ChromaDB", icon: "database" },
      { name: "Matplotlib", icon: "matplotlib" },
      { name: "Jupyter Notebook", icon: "jupyter" },
    ],
  },
];

const projects = [
  {
    title:
      "StrategicAI — AI-Powered Company Intelligence & Recommendation Platform",
    description:
      "Developed a strategic analysis engine that identifies business challenges and generates impact-scored AI roadmaps, utilizing Vector Databases for hallucination-free executive recommendations.",
    tags: ["RAG", "Strategic Analysis", "Data Fusion"],
    color: "from-pink-600 to-rose-600",
    accent: "#ec4899",
    github: "#",
    demo: "",
  },
  {
    title: "Enterprise Multi-Agent RAG Assistant",
    description:
      "Developed a Multi-Agent RAG system with Retriever, Generator, and Critic agents. Implemented document ingestion, semantic search, hybrid retrieval, and citation-supported generation.",
    tags: ["MultiAgent AI", "RAG", "LangChain"],
    color: "from-blue-600 to-indigo-600",
    accent: "#3b82f6",
    github: "#",
    demo: "",
  },
  {
    title: "Movie Revenue Prediction",
    description:
      "Developed machine learning models to predict movie box office revenue using budget, popularity, and runtime features. Performed data cleaning, feature engineering, EDA, and regression modeling.",
    tags: ["Linear Regression", "Machine Learning", "EDA"],
    color: "from-violet-600 to-purple-600",
    accent: "#8b5cf6",
    github: "#",
    demo: "",
  },
  {
    title: "Wandora",
    description:
      "Developed a privacy-focused Streamlit application for AI-based story generation with secure, anonymous text-to-image visual creation.",
    tags: ["Generative AI", "HuggingFace API", "Streamlit"],
    color: "from-cyan-600 to-blue-600",
    accent: "#06b6d4",
    github: "https://github.com/SrutikNandaniya/StoryAI_",
    demo: "",
  },
  {
    title: "Track-My-Gesture",
    description:
      "Built a real-time hand gesture recognition system with live accuracy visualization and a responsive frontend interface.",
    tags: ["Teachable Machine", "Gesture Recognition", "Computer Vision"],
    color: "from-emerald-600 to-teal-600",
    accent: "#10b981",
    github: "https://github.com/SrutikNandaniya/AI_Gesture_Recognization",
    demo: "",
  },
  {
    title: "Hostel Bro",
    description:
      "The Hostel Management System automates daily hostel operations by replacing manual record-keeping with a user-friendly, computerized system.",
    tags: ["System Automation", "Database Management", "Web App"],
    color: "from-orange-600 to-red-600",
    accent: "#f97316",
    github: "https://github.com/SrutikNandaniya/HostelBro",
    demo: "",
  },
];

const experience = [
  {
    title: "AI/ML Intern",
    company: "Aspire Softserv Pvt. Ltd (Ahmedabad)",
    period: "Jan 2025 - Present",
    desc: [
      "Contributed to AI-driven projects by working on database integration, backend workflows, and system optimization.",
      "Implemented Retrieval-Augmented Generation (RAG), vector databases, embeddings, and context-aware response pipelines using LLMs.",
      "Developed workflow automation solutions using n8n to streamline business processes and integrate AI-powered services.",
    ],
    tech: ["RAG", "Vector DB", "LLMs", "Prompt Engineering", "n8n"],
  },
  {
    title: "Data Engineering Intern",
    company: "SAP & Coursera – E2E Program (Remote)",
    period: "May 2025 - July 2025",
    desc: [
      "Gained hands-on experience with SAP HANA Cloud and SAP Business Technology Platform (BTP).",
      "Designed and implemented data models and provisioned datasets for analytics use cases.",
      "Performed data cleaning, transformation, and analysis using Python and Pandas. Developed EDA dashboards.",
    ],
    tech: ["SAP HANA", "Python", "Pandas", "Data Modeling", "EDA"],
  },
];

const education = [
  {
    degree: "B.E. in Computer Science & Engineering",
    institution: "R. N. G. Patel Institute of Technology",
    location: "Bardoli, Gujarat, India",
    period: "2022 - 2026",
    details: "CGPA: 9.03 / 10",
  },
  {
    degree: "Higher Secondary (12th)",
    institution: "R.G.A.S. High School",
    location: "Vapi, Gujarat, India",
    period: "2020 - 2022",
    details: "Percentage: 63%",
  },
  {
    degree: "Secondary (10th)",
    institution: "Shree Swaminarayan Gurukul Salvav",
    location: "Vapi, Gujarat, India",
    period: "2019 - 2020",
    details: "Percentage: 72%",
  },
];

const certifications = [
  { name: "Python for Data Science and AI", issuer: "IBM", year: "2025" },
  { name: "Python Data Analytics", issuer: "Meta", year: "2025" },
  {
    name: "Data Analysis with Pandas and Python",
    issuer: "Packt",
    year: "2025",
  },
  {
    name: "GenAI-Powered Data Analytics Job Simulation",
    issuer: "TATA",
    year: "2025",
  },
  { name: "Data Analytics Job Simulation", issuer: "Deloitte", year: "2025" },
];

/* ──────────────────────────── LOGO ──────────────────────────── */
function SigmoidLogo({ compact = false }: { compact?: boolean }) {
  const [spin, setSpin] = useState(false);

  const handleClick = () => {
    setSpin(false);

    requestAnimationFrame(() => {
      setSpin(true);
    });

    setTimeout(() => setSpin(false), 1400);
  };
  return (
    <a
      href="#"
      onClick={handleClick}
      className="group inline-flex items-center gap-3"
    >
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="relative h-12 w-12 transition-all duration-500 ease-out group-hover:scale-110">
          <svg
            viewBox="0 0 120 120"
            className={`h-full w-full origin-center duration-[1400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
              ${spin ? "logo-spin" : "group-hover:rotate-[360deg]"}
              drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]`}
          >
            <defs>
              <linearGradient id="wheel-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </linearGradient>
              <radialGradient id="hub-grad" cx="0.35" cy="0.35" r="0.7">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="60%" stopColor="#059669" />
                <stop offset="100%" stopColor="#064e3b" />
              </radialGradient>
            </defs>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <g key={`handle-${angle}`} transform={`rotate(${angle} 60 60)`}>
                <path
                  d="M 60 4 C 56 4 53 8 53 14 C 53 18 56 22 60 22 C 64 22 67 18 67 14 C 67 8 64 4 60 4 Z"
                  fill="url(#wheel-grad)"
                />
                <ellipse
                  cx="57"
                  cy="11"
                  rx="1.5"
                  ry="3"
                  fill="white"
                  opacity="0.25"
                />
              </g>
            ))}
            <circle
              cx="60"
              cy="60"
              r="38"
              fill="none"
              stroke="url(#wheel-grad)"
              strokeWidth="9"
            />
            <circle
              cx="60"
              cy="60"
              r="38"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="1"
              opacity="0.4"
            />
            <circle
              cx="60"
              cy="60"
              r="34"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="0.8"
              opacity="0.3"
            />
            <path
              d="M 32 42 A 38 38 0 0 1 88 42"
              fill="none"
              stroke="white"
              strokeWidth="1.2"
              opacity="0.25"
              strokeLinecap="round"
            />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <g key={`spoke-${angle}`} transform={`rotate(${angle} 60 60)`}>
                <rect
                  x="58.5"
                  y="22"
                  width="3"
                  height="32"
                  fill="url(#wheel-grad)"
                  rx="1"
                />
                <rect
                  x="58.5"
                  y="22"
                  width="0.8"
                  height="32"
                  fill="white"
                  opacity="0.18"
                />
              </g>
            ))}
            <circle cx="60" cy="60" r="9" fill="#0a0a0a" />
            <circle
              cx="60"
              cy="60"
              r="9"
              fill="none"
              stroke="#064e3b"
              strokeWidth="0.5"
            />
            <circle cx="60" cy="60" r="4" fill="url(#hub-grad)" />
            <circle
              cx="60"
              cy="60"
              r="4"
              fill="none"
              stroke="#064e3b"
              strokeWidth="0.8"
            />
            <circle cx="58.8" cy="58.8" r="1.2" fill="white" opacity="0.5" />
          </svg>
        </div>
      </div>
      {!compact && (
        <span className="flex flex-col justify-center leading-tight">
          <span className="block text-sm font-bold tracking-[0.22em] text-slate-900 transition-colors dark:text-white">
            SRUTIK
          </span>
          <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-400">
            NANDANIYA
          </span>
        </span>
      )}
    </a>
  );
}

/* ──────────────────────────── SKILL STRIP ──────────────────────────── */
function SkillChip({ skill }: { skill: TechnicalSkill }) {
  const iconUrl =
    fullColorIcons[skill.icon] || "https://img.icons8.com/color/48/code.png";
  return (
    <span className="mx-1 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-smfont-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200 transition-colors hover:border-emerald-500 dark:hover:border-emerald-400">
      <img src={iconUrl} alt="" className="h-5 w-5 object-contain" />
      <span className="whitespace-nowrap">{skill.name}</span>
    </span>
  );
}

function SkillMarquee({ group }: { group: TechnicalSkillGroup }) {
  const tripled = [...group.skills, ...group.skills, ...group.skills];
  return (
    <div className="relative overflow-hidden py-2 mask-image: linear-gradient(to right,transparent,black 5%,black 95%,transparent);">
      <div
        className={`flex w-max will-change-transform ${group.direction === "left" ? "skill-marquee-left" : "skill-marquee-right"}`}
        style={
          group.direction === "right"
            ? { transform: "translateX(-33.333%)" }
            : undefined
        }
      >
        {tripled.map((skill, i) => (
          <div key={`${skill.name}-${i}`} className="shrink-0">
            <SkillChip skill={skill} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────── NAVBAR ──────────────────────────── */
function Navbar({
  theme,
  toggleTheme,
}: {
  theme: Theme;
  toggleTheme: () => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clickedSection, setClickedSection] = useState("");
  const activeSection = useActiveSection([
    "about",
    "experience",
    "projects",
    "skills",
    "education",
    "contact",
  ]);
  console.log(activeSection);

  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[60] transition-all duration-300 ${isScrolled ? "bg-white/90 dark:bg-slate-950/92 shadow-lg shadow-black/5 dark:shadow-slate-950/30 backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <SigmoidLogo />

          {/* Desktop */}
          <div className="hidden items-center space-x-7 md:flex">
            {links.map((l) => {
              const sectionId = l.href.slice(1);
              return (
                <a
                  key={l.name}
                  href={l.href}
                  className={`relative text-sm font-medium transition-colors (clickedSection || activeSection) === sectionId ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"}`}
                >
                  {l.name}
                  {(clickedSection || activeSection) === sectionId && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  )}
                </a>
              );
            })}

            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Icons.Sun /> : <Icons.Moon />}
            </button>

            <button
              type="button"
              onClick={downloadResume}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/30"
            >
              <Icons.Download />
              Download Resume
            </button>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg p-2 text-slate-500 dark:text-slate-400"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Icons.Sun /> : <Icons.Moon />}
            </button>
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`menu-icon-swap absolute ${isMobileMenuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}
              >
                <Icons.Menu />
              </span>
              <span
                className={`menu-icon-swap absolute ${isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}
              >
                <Icons.Close />
              </span>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          <div
            className="mobile-menu-enter fixed inset-0 top-20 z-40 bg-black/20 backdrop-blur-md md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="mobile-menu-enter absolute left-0 right-0 top-full z-40 h-[calc(100vh-80px)] overflow-y-auto border-t border-slate-200/50 bg-white/95 shadow-xl backdrop-blur-3xl dark:border-slate-800/50 dark:bg-slate-950/95 md:hidden">
            {/* <div className="mx-auto max-w-7xl space-y-4 px-4 py-6 sm:px-6 lg:px-8"> */}
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6">
              {links.map((l) => {
                const sectionId = l.href.slice(1);

                return (
                  <a
                    key={l.name}
                    href={l.href}
                    onClick={() => {
                      setClickedSection(sectionId);
                      setIsMobileMenuOpen(false);

                      setTimeout(() => {
                        setClickedSection("");
                      }, 700);
                    }}
                    className={`block rounded-xl px-4 py-3 text-lg font-medium transition-all ${
                      (clickedSection || activeSection) === sectionId
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    {l.name}
                  </a>
                );
              })}
              <button
                type="button"
                onClick={downloadResume}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/30"
              >
                <Icons.Download /> Download Resume
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

/* ──────────────────────────── HERO ──────────────────────────── */
function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50/70 pt-24 pb-12 sm:pt-24 sm:pb-16 dark:bg-slate-950/70">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
        }}
      />
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-orb-one absolute -right-20 top-20 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-[100px] dark:bg-emerald-500/5" />
        <div className="hero-orb-two absolute -left-20 bottom-20 h-[28rem] w-[28rem] rounded-full bg-emerald-600/10 blur-[100px] dark:bg-emerald-600/5" />
      </div>

      {/* <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* <p className="hero-fade hero-fade-1 mb-5 font-serif text-2xl text-slate-700 sm:text-3xl md:text-4xl dark:text-slate-300"> */}
          <p className="hero-fade hero-fade-1 mb-4 font-serif text-lg sm:text-xl text-slate-700 sm:text-2xl md:text-4xl dark:text-slate-300">
            Hello, I'm
          </p>
          <h1 className="hero-fade hero-fade-2 mb-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-8xl dark:text-white">
            Srutik{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-700 dark:from-emerald-400 dark:to-emerald-600">
              Nandaniya
            </span>
          </h1>
          <p className="hero-fade hero-fade-3 mx-auto mb-8 max-w-2xl px-2 text-base font-medium leading-7 text-slate-500 sm:text-lg dark:text-slate-400">
            Designing intelligence with data. Computer Science graduate
            specializing in Python, Machine Learning, and practical AI systems
            that turn complex data into useful products.
          </p>
          <div className="hero-fade hero-fade-4 mb-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex w-full justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 sm:w-auto font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/30"
            >
              View Projects <Icons.Arrow />
            </a>
            <button
              type="button"
              onClick={downloadResume}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/50 px-7 py-3.5 font-semibold text-slate-700 backdrop-blur-md transition-all duration-200 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:hover:border-emerald-400 dark:hover:text-emerald-400"
            >
              <Icons.Download /> Download Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── ABOUT ──────────────────────────── */
function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-white/80 py-16 sm:py-20 dark:bg-slate-950/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            About <span className="text-emerald-500">Me</span>
          </h2>
          <div className="mx-auto h-1.5 w-20 rounded-full bg-emerald-500" />
        </div>
        <div className="grid items-center gap-8 lg:gap-12 md:grid-cols-2">
          <div className="relative flex justify-center">
            {/* <div className="group relative h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96"> */}
            {/* <div className="group relative
      h-[300px] w-[300px]
      sm:h-[480px] sm:w-[340px]
      lg:h-[490px] lg:w-[400px]"> */}
            <div
              className="
      group
      relative
      w-[85vw]
      max-w-[260px]
  sm:max-w-[320px]
  lg:max-w-[400px]
      aspect-[4/5]
      sm:max-w-[340px]
      lg:max-w-[400px]
    "
            >
              <div className="absolute inset-0 animate-[spin_30s_linear_infinite] rounded-3xl border-2 border-dashed border-emerald-500/30" />
              <div className="absolute inset-3 rounded-3xl border-2 border-emerald-500/20" />
              <div className="absolute inset-6 overflow-hidden rounded-3xl bg-slate-100 shadow-2xl transition-transform group-hover:scale-[1.02] dark:bg-slate-800">
                <img
                  src="/profile.png"
                  alt="Srutik Nandaniya"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    if (el.parentElement) {
                      el.parentElement.innerHTML =
                        '<div class="flex flex-col items-center justify-center h-full text-center"><div class="text-6xl mb-2">👨‍💻</div><p class="text-xs text-slate-400">Profile Image</p></div>';
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Data Science & AI/ML Enthusiast
            </h3>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              I am a Computer Science graduate with a strong focus on Data
              Science, Machine Learning, and Artificial Intelligence. My work is
              driven by curiosity, clear problem-solving, and a commitment to
              building practical data-driven solutions.
            </p>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              With hands-on experience in Python, machine learning algorithms,
              exploratory analysis, and AI tools, I have developed projects
              across prediction systems, generative AI, gesture recognition,
              healthcare assistance, and management automation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── EXPERIENCE ──────────────────────────── */
function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative bg-slate-50/80 py-16 sm:py-20 dark:bg-slate-900/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Internship & <span className="text-emerald-500">Training</span>
          </h2>
          <div className="mx-auto h-1.5 w-20 rounded-full bg-emerald-500" />
        </div>
        <div className="space-y-8">
          {experience.map((ex, i) => (
            <div
              key={i}
              data-delay={Math.min(i + 1, 5)}
              className="reveal group rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {ex.title}
                  </h3>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {ex.company}
                  </p>
                </div>
                <span className="shrink-0 whitespace-nowrap rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  {ex.period}
                </span>
              </div>
              <ul className="mb-6 space-y-3">
                {ex.desc.map((d, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-slate-600 dark:text-slate-400"
                  >
                    <span className="mt-1 shrink-0 text-emerald-500">▹</span>
                    {d}
                  </li>
                ))}
              </ul>
              {ex.tech && (
                <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                  {ex.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── PROJECTS ──────────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const initials = project.title
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      data-delay={Math.min((index % 3) + 1, 5)}
      className="reveal group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/5 dark:border-slate-800 dark:bg-slate-900/50"
    >
      {/* Gradient Header with Abstract Pattern */}
      <div className="relative h-44 overflow-hidden sm:h-52">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90 transition-transform duration-500 group-hover:scale-105`}
        />

        {/* Abstract decorative shapes */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 208"
          fill="none"
        >
          {/* Large circle */}
          <circle cx="340" cy="40" r="60" fill="white" opacity="0.08" />
          <circle cx="340" cy="40" r="35" fill="white" opacity="0.05" />
          {/* Small circle */}
          <circle cx="80" cy="160" r="30" fill="white" opacity="0.1" />
          {/* Geometric rectangle */}
          <rect
            x="160"
            y="60"
            width="50"
            height="50"
            rx="12"
            fill="white"
            opacity="0.07"
            transform="rotate(15 185 85)"
          />
          <rect
            x="260"
            y="120"
            width="35"
            height="35"
            rx="8"
            fill="white"
            opacity="0.06"
            transform="rotate(-10 277 137)"
          />
          {/* Connecting lines */}
          <line
            x1="80"
            y1="160"
            x2="185"
            y2="85"
            stroke="white"
            strokeWidth="1"
            opacity="0.1"
          />
          <line
            x1="185"
            y1="85"
            x2="340"
            y2="40"
            stroke="white"
            strokeWidth="1"
            opacity="0.08"
          />
          <line
            x1="185"
            y1="85"
            x2="277"
            y2="137"
            stroke="white"
            strokeWidth="1"
            opacity="0.08"
          />
          {/* Dots at intersections */}
          <circle cx="80" cy="160" r="3" fill="white" opacity="0.25" />
          <circle cx="185" cy="85" r="3" fill="white" opacity="0.25" />
          <circle cx="340" cy="40" r="3" fill="white" opacity="0.25" />
          <circle cx="277" cy="137" r="3" fill="white" opacity="0.2" />
        </svg>

        {/* Subtle initials watermark */}
        <div className="absolute bottom-4 right-5 text-6xl font-black leading-none text-white/[0.08] select-none transition-all duration-500 group-hover:text-white/[0.14] group-hover:scale-110">
          {initials}
        </div>

        {/* Tags floating at top */}
        <div className="absolute left-5 top-5 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-7">
        <h3 className="mb-3 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
          {project.title}
        </h3>
        <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-600 font-medium dark:text-slate-400">
          {project.description}
        </p>

        {/* All tags */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-all hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-emerald-400 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
            >
              <Icons.GitHub /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-all hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-emerald-400 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
            >
              <Icons.ExternalLink /> Live Demo
            </a>
          )}
          {!project.github && !project.demo && (
            <span className="text-xs text-slate-400 dark:text-slate-600">
              Private project
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative bg-white/80 py-16 sm:py-20 dark:bg-slate-950/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Selected <span className="text-emerald-500">Works</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-emerald-500" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── SKILLS ──────────────────────────── */
function SkillsSection() {
  return (
    <section
      id="skills"
      className="overflow-hidden bg-slate-50/80 py-16 sm:py-20 dark:bg-slate-900/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Technical <span className="text-emerald-500">Expertise</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-emerald-500" />
        </div>
      </div>
      <div className="space-y-10">
        {technicalSkillGroups.map((g, i) => (
          <div key={g.title} className="reveal" data-delay={Math.min(i + 1, 5)}>
            <div className="mx-auto mb-4 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <h3 className="text-lg font-bold uppercase tracking-widest text-slate-800 dark:text-slate-100">
                {g.title}
              </h3>
            </div>
            <SkillMarquee group={g} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────── EDUCATION ──────────────────────────── */
function EducationSection() {
  return (
    <section
      id="education"
      className="relative bg-white/80 py-16 sm:py-20 dark:bg-slate-950/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Education & <span className="text-emerald-500">Certifications</span>
          </h2>
          <div className="mx-auto h-1.5 w-20 rounded-full bg-emerald-500" />
        </div>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-8 flex items-center gap-3 text-lg sm:text-xl font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                <Icons.Graduation />
              </span>
              Education
            </h3>
            <div className="space-y-8">
              {education.map((e) => (
                <div
                  key={e.degree}
                  className="relative border-l-2 border-emerald-500/30 pl-10 transition-colors hover:border-emerald-500"
                >
                  <div className="absolute left-0 top-0 h-4 w-4 -translate-x-[9px] rounded-full border-2 border-emerald-500 bg-slate-200 dark:bg-slate-700" />
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-8 dark:border-slate-800 dark:bg-slate-900/50">
                    <span className="text-sm font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      {e.period}
                    </span>
                    <h4 className="mb-2 mt-1 text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {e.degree}
                    </h4>
                    <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
                      {e.institution}
                    </p>
                    <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                      {e.location}
                    </p>
                    <div className="mt-4 inline-block rounded-xl bg-slate-200 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-emerald-400">
                      {e.details}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-8 flex items-center gap-3 text-lg sm:text-xl font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900">
                <Icons.Certificate />
              </span>
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((c) => (
                <div
                  key={c.name}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-emerald-500/40 dark:border-slate-800 dark:bg-slate-900/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="mb-1.5 text-lg font-bold text-slate-900 dark:text-white">
                        {c.name}
                      </h4>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {c.issuer}
                      </p>
                    </div>
                    <span className="whitespace-nowrap text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      {c.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href="https://drive.google.com/drive/u/4/folders/1SkYZVxpTE1JfguqfP6lyDN4Ah2yoo1lE"
                className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 dark:bg-white dark:text-slate-900"
              >
                <Icons.ExternalLink /> View All Credentials
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── CONTACT ──────────────────────────── */
function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    let valid = true;

    if (form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
      valid = false;
    }

    if (form.name.trim().length > 50) {
      newErrors.name = "Name cannot exceed 50 characters.";
      valid = false;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (form.subject.trim().length < 5) {
      newErrors.subject = "Subject should be at least 5 characters.";
      valid = false;
    }

    if (form.subject.trim().length > 100) {
      newErrors.subject = "Subject cannot exceed 100 characters.";
      valid = false;
    }

    if (form.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters.";
      valid = false;
    }

    if (form.message.trim().length > 1000) {
      newErrors.message = "Message cannot exceed 1000 characters.";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setStatus(null);
    console.log(form);
    try {
      const res = await fetch("https://srutikndn.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus({
          type: "success",
          message: "Your message has been sent successfully!",
        });

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setErrors({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: "Unable to send your message. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Server unavailable. Please try again later.",
      });
    }

    setLoading(false);

    setTimeout(() => {
      setStatus(null);
    }, 5000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white/80 py-24 dark:bg-slate-900/80"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-20 text-center">
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Let's <span className="text-emerald-500">Connect</span>
          </h2>
          <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-emerald-500" />
        </div>
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="space-y-8 lg:col-span-2">
              <div className="space-y-8 rounded-[2.5rem] border border-slate-200 bg-slate-50 p-10 dark:border-slate-800 dark:bg-slate-950">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Contact Info
                </h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg">
                      <Icons.Email />
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-bold uppercase tracking-widest text-slate-400">
                        Email
                      </p>
                      <a
                        href="mailto:srutikndn@gmail.com"
                        className="text-lg font-bold text-slate-800 transition-colors hover:text-green-500 dark:text-white"
                      >
                        srutikndn@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900">
                      <Icons.GitHub />
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-bold uppercase tracking-widest text-slate-400">
                        GitHub
                      </p>
                      <a
                        href="https://github.com/SrutikNandaniya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-slate-800 transition-colors hover:text-purple-500 dark:text-white"
                      >
                        Srutik Nandaniya
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                      <Icons.LinkedIn />
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-bold uppercase tracking-widest text-slate-400">
                        LinkedIn
                      </p>
                      <a
                        href="https://www.linkedin.com/in/srutiknandaniya/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-slate-800 transition-colors hover:text-blue-500 dark:text-white"
                      >
                        Srutik Nandaniya
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-2xl dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
                {status && (
                  <div
                    className={`mb-6 rounded-xl border px-5 py-4 text-sm font-medium transition-all
      ${
        status.type === "success"
          ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
          : "border-red-300 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-300"
      }`}
                  >
                    {status.message}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 text-slate-900 caret-emerald-500 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:caret-emerald-400"
                  />

                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                  )}

                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 text-slate-900 caret-emerald-500 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:caret-emerald-400"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                  )}

                  <input
                    type="text"
                    placeholder="Subject"
                    required
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 text-slate-900 caret-emerald-500 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:caret-emerald-400"
                  />
                  {errors.subject && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.subject}
                    </p>
                  )}

                  <textarea
                    rows={6}
                    placeholder="Write your message..."
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full resize-none rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 text-slate-800 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-emerald-500 py-4 font-semibold text-white transition-all duration-300 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── FOOTER ──────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} Srutik Nandaniya
        </p>
      </div>
    </footer>
  );
}

/* ──────────────────────────── SCROLL PROGRESS ──────────────────────────── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      setProgress(height > 0 ? (scrolled / height) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed left-0 right-0 top-0 z-[60] h-[3px] bg-slate-200 dark:bg-slate-800">
      <div
        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-[width] duration-75 ease-out dark:from-emerald-300 dark:to-emerald-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ──────────────────────────── SCROLL TO TOP ──────────────────────────── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:bg-emerald-600 hover:shadow-2xl hover:shadow-emerald-500/40 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      aria-label="Scroll to top"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}

/* ──────────────────────────── APP ──────────────────────────── */
export default function App() {
  const { theme, toggle } = useTheme();
  useRevealOnScroll();
  return (
    <div
      className={`relative min-h-screen ${theme === "dark" ? "dark bg-slate-950 text-slate-100" : "bg-white text-slate-900"} selection:bg-emerald-500/30 selection:text-emerald-900 font-sans`}
    >
      <div className="bg-aurora" aria-hidden="true">
        <span />
      </div>
      <ScrollProgress />
      <div className="relative z-10">
        <Navbar theme={theme} toggleTheme={toggle} />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
}

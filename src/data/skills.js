/**
 * Single source of truth for skills.
 *
 * Deliberately no percentage levels: a self-assigned "TensorFlow 70%" is
 * unverifiable and reads as filler. Two honest tiers instead — `core` is what
 * I reach for without thinking, `familiar` is what I've shipped with at least
 * once and can pick back up quickly.
 */
export const SKILL_GROUPS = [
  {
    category: "AI & Machine Learning",
    core: ["Python", "scikit-learn", "NLP / TF-IDF", "pandas & NumPy"],
    familiar: ["TensorFlow", "OpenCV", "MediaPipe"],
  },
  {
    category: "Web Development",
    core: ["React", "Next.js", "Django", "REST APIs", "Tailwind CSS"],
    familiar: ["TypeScript", "HTMX", "Bootstrap"],
  },
  {
    category: "Mobile Development",
    core: ["Kotlin", "Android Studio", "Firebase"],
    familiar: ["ML Kit", "CameraX", "Material Design 3"],
  },
  {
    category: "Databases & Cloud",
    core: ["MongoDB", "MySQL", "Vercel"],
    familiar: ["Redis", "Google BigQuery", "Railway"],
  },
  {
    category: "Problem Solving",
    core: ["C++", "Data Structures", "Algorithms"],
    familiar: ["Dynamic Programming", "Graph Algorithms", "Greedy"],
  },
  {
    category: "Tools & Platforms",
    core: ["Git & GitHub", "VS Code", "Google Colab"],
    familiar: ["Streamlit", "Postman", "Linux"],
  },
];

export const CREDENTIALS = [
  { value: "ITEE FE", label: "Fundamental IT Engineer, certified" },
  { value: "7+", label: "Languages used in shipped work" },
  { value: "LeetCode", label: "Daily problem-solving practice" },
  { value: "Codeforces", label: "Active contest participation" },
];

/** Compact list for the CV sidebar — derived, so it can never drift. */
export const TOP_SKILLS = SKILL_GROUPS.flatMap((group) => group.core.slice(0, 2));

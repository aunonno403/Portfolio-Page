import "../styles/skills.css";

const SKILLS = [
  {
    category: "AI & Machine Learning",
    icon: "🤖",
    items: [
      { name: "Python", level: 90 },
      { name: "Scikit-learn", level: 80 },
      { name: "TensorFlow", level: 70 },
      { name: "OpenCV", level: 75 },
      { name: "NLP & TF-IDF", level: 80 },
      { name: "MediaPipe", level: 65 },
    ],
  },
  {
    category: "Web Development",
    icon: "🌐",
    items: [
      { name: "React & Next.js", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "Django", level: 80 },
      { name: "HTMX", level: 70 },
      { name: "Bootstrap & Tailwind", level: 75 },
      { name: "REST APIs", level: 80 },
    ],
  },
  {
    category: "Mobile Development",
    icon: "📱",
    items: [
      { name: "Kotlin", level: 70 },
      { name: "Android Studio", level: 70 },
      { name: "Firebase", level: 75 },
      { name: "ML Kit", level: 65 },
      { name: "CameraX", level: 60 },
      { name: "Material Design 3", level: 70 },
    ],
  },
  {
    category: "Databases & Cloud",
    icon: "🗄️",
    items: [
      { name: "MongoDB", level: 75 },
      { name: "MySQL", level: 75 },
      { name: "Redis", level: 70 },
      { name: "Firebase DB", level: 70 },
      { name: "Google BigQuery", level: 60 },
      { name: "Railway & Vercel", level: 70 },
    ],
  },
  {
    category: "Problem Solving",
    icon: "🧠",
    items: [
      { name: "C++", level: 80 },
      { name: "Data Structures", level: 80 },
      { name: "Algorithms", level: 75 },
      { name: "Dynamic Programming", level: 70 },
      { name: "Binary Search", level: 75 },
      { name: "Greedy Algorithms", level: 70 },
    ],
  },
  {
    category: "Tools & Platforms",
    icon: "🛠️",
    items: [
      { name: "Git & GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Google Colab", level: 80 },
      { name: "Streamlit", level: 75 },
      { name: "Android Studio", level: 70 },
      { name: "Postman", level: 65 },
    ],
  },
];

function SkillBar({ name, level }) {
  return (
    <div className="skill-bar">
      <div className="skill-bar-header">
        <span className="skill-name">{name}</span>
        <span className="skill-level">{level}%</span>
      </div>
      <div className="skill-bar-track" aria-label={`${name} proficiency ${level}%`}>
        <div className="skill-bar-fill" style={{ width: `${level}%` }} />
      </div>
    </div>
  );
}

function SkillCard({ category, icon, items }) {
  return (
    <article className="skill-card">
      <header className="skill-card-header">
        <span className="skill-card-icon" aria-hidden="true">
          {icon}
        </span>
        <h3>{category}</h3>
      </header>
      <div className="skill-bars">
        {items.map((skill) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </div>
    </article>
  );
}

export function Skills() {
  return (
    <section className="skills section-grid reveal" id="skills" data-section="skills">
      <div className="section-heading">
        <p className="eyebrow">Skills</p>
        <h2>A versatile toolkit across AI, web, and mobile development.</h2>
      </div>

      <div className="skills-highlight">
        <div className="highlight-stat">
          <strong>7+</strong>
          <span>Languages</span>
        </div>
        <div className="highlight-stat">
          <strong>15+</strong>
          <span>Frameworks & Libraries</span>
        </div>
        <div className="highlight-stat">
          <strong>LeetCode & Codeforces</strong>
          <span>Competitive Programming</span>
        </div>
        <div className="highlight-stat">
          <strong>ITEE FE</strong>
          <span>Certified</span>
        </div>
      </div>

      <div className="skills-grid">
        {SKILLS.map((group) => (
          <SkillCard key={group.category} category={group.category} icon={group.icon} items={group.items} />
        ))}
      </div>
    </section>
  );
}


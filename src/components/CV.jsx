import cvPdf from "../../assets/CV_Resume.pdf";

const EXPERIENCE = [
  {
    year: "2025",
    title: "Built portfolio and GitHub-driven projects",
    description:
      "Designed and shipped a production-ready portfolio with live GitHub repositories, responsive layouts, and a neon-themed visual system.",
  },
  {
    year: "2024",
    title: "Worked on NLP and full-stack applications",
    description:
      "Developed practical software around sentiment analysis, dashboards, and end-to-end web experiences with deployed interfaces.",
  },
  {
    year: "2023",
    title: "Strengthened competitive programming and fundamentals",
    description:
      "Kept a steady coding practice rhythm through problem solving, algorithms, and project work across multiple stacks.",
  },
];

const SKILLS = ["AI/ML", "Full-Stack", "React", "Django", "Next.js", "Python", "C++", "Android"];

export function CV({ preview = false, page = false, onOpenCv, onNavigateHome }) {
  if (page) {
    return (
      <section className="cv section-grid cv--page" id="cv-page" data-section="cv">
        <div className="section-heading reveal">
          <p className="eyebrow">CV</p>
          <h2>Curriculum vitae and career snapshot.</h2>
        </div>

        <div className="cv-page-layout reveal">
          <article className="cv-viewer-card">
            <div className="cv-viewer-toolbar">
              <div>
                <p className="cv-label">PDF Viewer</p>
                <h3>My provided CV</h3>
              </div>

              <div className="cv-actions cv-actions--compact">
                <a className="button button-primary" href={cvPdf} download>
                  Download CV
                </a>
                <a className="button button-secondary" href={cvPdf} target="_blank" rel="noreferrer">
                  Open PDF
                </a>
                {onNavigateHome && (
                  <button className="button button-secondary" type="button" onClick={onNavigateHome}>
                    Back to home
                  </button>
                )}
              </div>
            </div>

            <iframe
              className="cv-viewer-frame"
              src={`${cvPdf}#view=FitH&toolbar=1&navpanes=0`}
              title="Farhan CV PDF viewer"
              loading="eager"
            />

            <p className="cv-viewer-note">
              If the embedded viewer does not render in your browser, use the open or download
              buttons above.
            </p>
          </article>

          <aside className="cv-page-panel cv-card">
            <p className="cv-label">Summary</p>
            <h3>Aunonno Farhan, final-year CSE student</h3>
            <p>
              I work across AI/ML, full-stack development, and competitive programming, with a
              focus on shipping practical, production-ready projects.
            </p>

            <div className="skill-cloud cv-skill-cloud">
              {SKILLS.slice(0, 6).map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <div className="cv-actions cv-actions--stacked">
              {onNavigateHome && (
                <button className="button button-secondary" type="button" onClick={onNavigateHome}>
                  Back to home
                </button>
              )}
            </div>
          </aside>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`cv section-grid ${preview ? "cv--preview" : ""} ${page ? "cv--page" : ""}`}
      id={preview ? "cv" : "cv-page"}
      data-section="cv"
    >
      <div className="section-heading reveal">
        <p className="eyebrow">CV</p>
        <h2>{page ? "Curriculum vitae and career snapshot." : "A compact CV preview."}</h2>
      </div>

      <div className="cv-layout reveal">
        <article className="cv-card cv-card--profile">
          <p className="cv-label">Profile</p>
          <h3>Farhan, final-year CSE student</h3>
          <p>
            I build AI/ML systems, full-stack products, and interactive web experiences with a
            focus on shipping polished work that solves real problems.
          </p>

          <div className="cv-actions">
            <a className="button button-primary" href={cvPdf} download>
              Download CV
            </a>
            {onOpenCv && (
              <button className="button button-secondary" type="button" onClick={onOpenCv}>
                Open full CV
              </button>
            )}
            {onNavigateHome && (
              <button className="button button-secondary" type="button" onClick={onNavigateHome}>
                Back to home
              </button>
            )}
          </div>
        </article>

        <article className="cv-card">
          <p className="cv-label">Skills</p>
          <div className="skill-cloud cv-skill-cloud">
            {SKILLS.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </article>

        <article className="cv-card cv-card--timeline">
          <p className="cv-label">Experience</p>
          <div className="cv-timeline">
            {EXPERIENCE.map((item) => (
              <div key={item.year} className="cv-timeline-item">
                <span className="cv-timeline-year">{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
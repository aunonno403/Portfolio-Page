import profilePhoto from "../../assets/resume_photo.jpg";

export function Hero({ onOpenCv }) {
  return (
    <section className="hero section-grid" data-section="hero">
      <div className="hero-copy reveal">
        <p className="eyebrow">AI & ML / Full-Stack Development / Competitive Programming</p>
        <h1>
          Building intelligent, real-world software — from ML pipelines to deployed web applications.
        </h1>
        <p className="lede">
          I'm a final-year CSE student at Jahangirnagar University who ships things that actually
          work. I've built NLP systems, full-stack web apps, and Android applications — and I'm
          always working on something new. Explore my projects and let's build something that matters.
        </p>

        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            View Projects
          </a>
          <a className="button button-secondary" href="#contact">
            Get In Touch
          </a>
          {onOpenCv && (
            <button className="button button-secondary" type="button" onClick={onOpenCv}>
              Open CV
            </button>
          )}
        </div>

        <div className="hero-stats" aria-label="Highlights">
          <article>
            <strong>5+</strong>
            <span>Deployed Projects</span>
          </article>
          <article>
            <strong>902</strong>
            <span>Codeforces Rating</span>
          </article>
          <article>
            <strong>ITEE FE</strong>
            <span>Certified</span>
          </article>
        </div>
      </div>

      <aside className="hero-panel reveal" aria-label="Profile summary">
        <div className="profile-chip">Aunonno Farhan</div>
        <div className="profile-photo">
          <img className="profile-photo-image" src={profilePhoto} alt="Farhan portrait" />
        </div>
        <div className="profile-visual">
          <div className="profile-orbit"></div>
          <div className="profile-core">
            <span>Open to opportunities</span>
            <strong>Farhan's Portfolio</strong>
          </div>
        </div>
        <dl className="profile-list">
          <div>
            <dt>Expertise</dt>
            <dd>AI/ML & Full-Stack</dd>
          </div>
          <div>
            <dt>University</dt>
            <dd>Jahangirnagar University</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>Savar, Dhaka, Bangladesh</dd>
          </div>
        </dl>
      </aside>
    </section>
  );
}
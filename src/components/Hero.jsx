import profilePhoto from "../../assets/resume_photo.jpg";
import "../styles/hero-social.css";

function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.35-1.18-3.35-1.18-.45-1.15-1.1-1.45-1.1-1.45-.9-.62.07-.61.07-.61 1 .07 1.53 1.02 1.53 1.02.9 1.52 2.36 1.08 2.94.83.09-.65.35-1.08.63-1.33-2.21-.25-4.53-1.1-4.53-4.9 0-1.08.39-1.97 1.03-2.66-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0112 6.8c.85 0 1.7.11 2.5.33 1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.69 1.03 1.58 1.03 2.66 0 3.8-2.32 4.64-4.53 4.89.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0012 2z" />
    </svg>
  );
}

function IconLeetcode() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H19.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
    </svg>
  );
}

function IconCodeforces() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4.5C9 3.672 9.672 3 10.5 3h3zm9 7.5c.828 0 1.5.672 1.5 1.5v9c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-9c0-.828.672-1.5 1.5-1.5h3z"/>
    </svg>
  );
}

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
          <a className="button button-primary" href="/projects">
            View Projects
          </a>
          <a className="button button-secondary" href="/contact">
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
            <strong>
              <a
                className="hero-external-link"
                href="https://github.com/aunonno403"
                target="_blank"
                rel="noreferrer"
              >
                <span className="hero-social-icon" aria-hidden="true">
                  <IconGithub />
                </span>
                GitHub
              </a>
            </strong>
            <span>Profile</span>
          </article>
          <article>
            <strong>
              <a
                className="hero-external-link"
                href="https://leetcode.com/u/that1weeb/" 
                target="_blank"
                rel="noreferrer"
              >
                <span className="hero-social-icon" aria-hidden="true">
                  <IconLeetcode />
                </span>
                LeetCode
              </a>
            </strong>
            <span>Profile</span>
          </article>
          <article>
            <strong>
              <a
                className="hero-external-link"
                href="https://codeforces.com/profile/Aunonno_JU-CSE-30" 
                target="_blank"
                rel="noreferrer"
              >
                <span className="hero-social-icon" aria-hidden="true">
                  <IconCodeforces />
                </span>
                Codeforces
              </a>
            </strong>
            <span>Profile</span>
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
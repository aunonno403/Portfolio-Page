export function Contact() {
  return (
    <section className="contact section-grid reveal" id="contact">
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h2>Open to opportunities, collaborations, and good problems.</h2>
      </div>

      <div className="contact-card">
        <p>
          Whether you're a recruiter, a researcher, or a fellow developer with an interesting
          idea — I'd love to hear from you. I'm currently looking for internships, entry-level
          roles, and postgraduate research opportunities in AI/ML and software development.
          Let's talk.
        </p>
        <div className="contact-links">
          <a className="button button-primary"
            href="mailto:aunonnofarhan9@gmail.com"
            title="aunonnofarhan9@gmail.com">
            Email Me
            </a>
          
            <a className="button button-secondary"
            href="https://github.com/aunonno403"
            target="_blank"
            rel="noreferrer">
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
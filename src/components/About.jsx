export function About() {
  return (
    <section className="about section-grid reveal" id="about" data-section="about">
      <div className="section-heading">
        <p className="eyebrow">About</p>
        <h2>CS student. Builder. Problem solver.</h2>
      </div>

      <div className="about-copy">
        <p>
          I'm Farhan, a final-year Computer Science & Engineering student at Jahangirnagar
          University with a passion for AI/ML, full-stack development, and competitive
          programming. I build things that solve real problems — from an NLP sentiment
          analyzer for Bangla text to a deployed finance tracker used by real people. When
          I'm not coding, I'm on Codeforces, on the football field, or training Martial Arts.
        </p>
      </div>

      <div className="about-cards">
        <article>
          <h3>AI & Machine Learning</h3>
          <p>
            From NLP pipelines to computer vision, I build ML systems grounded in real
            datasets and evaluated with proper metrics — not just tutorial reproductions.
          </p>
        </article>
        <article>
          <h3>Full-Stack Development</h3>
          <p>
            I build and ship end-to-end products — React frontends, Django/Next.js backends,
            cloud databases — and deploy them to production, not just localhost.
          </p>
        </article>
        <article>
          <h3>Problem Solving</h3>
          <p>
            Daily LeetCode practice and active Codeforces participation to keep
            my fundamentals sharp and my thinking algorithmic.
          </p>
        </article>
      </div>
    </section>
  );
}
/** Consistent vertical rhythm and heading treatment for every page section. */
export function Section({ id, eyebrow, title, intro, children, className = "" }) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      {(eyebrow || title) && (
        <header className="reveal mb-12 max-w-2xl sm:mb-16">
          {eyebrow && (
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl font-semibold leading-[1.15] sm:text-4xl">{title}</h2>
          )}
          {intro && <p className="mt-4 text-base leading-relaxed text-muted">{intro}</p>}
        </header>
      )}
      {children}
    </section>
  );
}

/** Horizontal page gutter — one place to change the content width. */
export function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

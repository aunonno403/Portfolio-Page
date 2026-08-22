const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium " +
  "transition-colors duration-200 whitespace-nowrap disabled:opacity-50";

const VARIANTS = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent-hover border border-transparent",
  secondary:
    "bg-surface text-text border border-border hover:border-border-strong hover:bg-surface-2",
  ghost:
    "text-muted hover:text-text border border-transparent hover:bg-surface-2",
};

const SIZES = {
  sm: "px-3.5 py-1.5 text-[0.8125rem]",
  md: "px-5 py-2.5",
};

/**
 * Renders an <a> when `href` is present, otherwise a <button>. External links
 * get `rel="noreferrer"` automatically.
 */
export function Button({
  as,
  href,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  children,
  ...props
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  const Component = as ?? (href ? "a" : "button");

  if (Component === "a") {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Component type="button" className={classes} {...props}>
      {children}
    </Component>
  );
}

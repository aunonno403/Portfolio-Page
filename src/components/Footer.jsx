import { SITE, SOCIALS } from "../data/site";
import { SOCIAL_ICONS } from "./ui/Icons";

export function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              onNavigate("/");
            }}
            className="font-display text-sm font-semibold"
          >
            {SITE.name}
          </a>
          <p className="mt-1 text-xs text-faint">
            {SITE.role} · {SITE.location}
          </p>
        </div>

        <div className="flex items-center gap-1">
          {SOCIALS.map((social) => {
            const Icon = SOCIAL_ICONS[social.id];

            return (
              <a
                key={social.id}
                href={social.href}
                {...(social.id === "email" ? {} : { target: "_blank", rel: "noreferrer" })}
                aria-label={social.label}
                title={social.label}
                className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-accent"
              >
                <Icon className="text-lg" />
              </a>
            );
          })}
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl border-t border-border px-5 py-5 sm:px-8">
        <p className="text-xs text-faint">
          © {new Date().getFullYear()} {SITE.name}. Built with React, Vite, and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}

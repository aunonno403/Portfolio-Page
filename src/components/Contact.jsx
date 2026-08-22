import { SITE, SOCIALS } from "../data/site";
import { Button } from "./ui/Button";
import { Container, Section } from "./ui/Section";
import { IconArrowUpRight, IconDownload, IconMail, SOCIAL_ICONS } from "./ui/Icons";

export function Contact({ onOpenCv }) {
  return (
    <Container>
      <Section id="contact" eyebrow="Contact" title="Let's talk.">
        <div className="reveal overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="border-b border-border p-7 sm:p-10">
            <p className="max-w-xl text-base leading-relaxed text-muted">
              I'm looking for internships, entry-level roles, and postgraduate research
              opportunities in AI/ML and software development. If you're a recruiter, a
              researcher, or a developer with an interesting problem — I'd like to hear
              from you.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${SITE.email}`}>
                <IconMail className="text-base" />
                {SITE.email}
              </Button>
              <Button variant="secondary" onClick={onOpenCv}>
                <IconDownload className="text-base" />
                View CV
              </Button>
            </div>
          </div>

          <ul className="grid gap-px bg-border sm:grid-cols-3">
            {SOCIALS.filter((social) => social.id !== "email").map((social) => {
              const Icon = SOCIAL_ICONS[social.id];

              return (
                <li key={social.id} className="bg-surface">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 px-6 py-5 transition-colors hover:bg-surface-2"
                  >
                    <Icon className="text-lg text-muted transition-colors group-hover:text-accent" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{social.label}</span>
                      <span className="block truncate text-xs text-faint">
                        {social.handle}
                      </span>
                    </span>
                    <IconArrowUpRight className="ml-auto text-sm text-faint opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>
    </Container>
  );
}

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view so the nav can mark it active.
 *
 * Picks the entry closest to the top of the reading area rather than the first
 * intersecting one — with tall sections several can intersect at once, and
 * "first in document order" makes the highlight lag behind the scroll.
 */
export function useActiveSection(ids, enabled = true) {
  const [activeSection, setActiveSection] = useState(ids[0] ?? null);

  useEffect(() => {
    if (!enabled) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          );

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return activeSection;
}

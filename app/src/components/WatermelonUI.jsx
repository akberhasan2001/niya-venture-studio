// Adapted from Watermelon UI card-5, card-7 and tabs-1.
// Source and license: THIRD_PARTY_NOTICES.md.
import { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";

export function StatusBadge({ children, muted = false }) {
  return <span className={`wm-badge${muted ? " wm-badge-muted" : ""}`}><span aria-hidden="true" />{children}</span>;
}

export function ConnectCard() {
  return <aside className="hero-note wm-connect" data-hero aria-label="Niya Connect early access">
    <div className="wm-connect-top"><StatusBadge>In development</StatusBadge><span className="wm-orbit-mark" aria-hidden="true">↗</span></div>
    <p className="eyebrow">Coming in 2027</p><h2>Niya Connect</h2>
    <p>Early access to a new intelligence and connection layer for the global Muslim economy.</p>
    <div className="wm-card-footer"><Link className="wm-action" to="/connect/">Explore early access <span aria-hidden="true">↗</span></Link></div>
  </aside>;
}

export function MediaCard({ image, alt, badge, eyebrow, title, children, to, cta, overlay = false }) {
  return <article className={`wm-media-card${overlay ? " wm-overlay-card" : ""}`}>
    {image && <div className="wm-card-image"><img src={image} alt={alt} loading="lazy" /></div>}
    <div className="wm-card-body"><StatusBadge muted={overlay}>{badge}</StatusBadge><p className="wm-card-meta">{eyebrow}</p><h2>{title}</h2><p className="wm-card-description">{children}</p>
      <div className="wm-card-footer"><Link className="wm-action" to={to}>{cta}<span aria-hidden="true">↗</span></Link></div>
    </div>
  </article>;
}

const filters = [{ value: "all", label: "All events" }, { value: "upcoming", label: "Upcoming" }, { value: "past", label: "Past editions" }];

export function EventBrowser({ communityImage }) {
  const [selected, setSelected] = useState("all");
  const id = useId();
  const buttons = useRef([]);
  function handleKey(event, index) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % filters.length;
    if (event.key === "ArrowLeft") next = (index + filters.length - 1) % filters.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = filters.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setSelected(filters[next].value);
    buttons.current[next]?.focus();
  }
  return <div className="wm-event-browser" data-reveal>
    <div className="wm-browser-heading"><div><p className="eyebrow">The Niya calendar</p><h2>Find your next connection.</h2></div>
      <div className="wm-tabs" role="tablist" aria-label="Filter events">{filters.map((filter, index) => <button key={filter.value} ref={el => { buttons.current[index] = el; }} id={`${id}-${filter.value}`} type="button" role="tab" aria-selected={selected === filter.value} aria-controls={`${id}-panel`} tabIndex={selected === filter.value ? 0 : -1} onClick={() => setSelected(filter.value)} onKeyDown={event => handleKey(event, index)}>{filter.label}</button>)}</div>
    </div>
    <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${selected}`} tabIndex={0} className="wm-event-grid">
      {selected !== "past" && <MediaCard badge="Upcoming event" eyebrow="New Jersey · November 14, 2026" title="Halal Money Forum" to="/events/halal-money-forum-nj/" cta="Explore the event">A day of conversation and connection around capital, founders and the future of the global Muslim economy. Explore the event and register your Pitchfest interest.</MediaCard>}
      {selected !== "upcoming" && <MediaCard overlay image={communityImage} alt="Speakers at the 2026 Niya Global Startup Summit" badge="Edition 1 · Recap" eyebrow="Silicon Valley · August 29, 2026" title="Niya Global Startup Summit" to="/summit/" cta="Relive Edition 1">400+ attendees. One shared ambition. Revisit a full day of conversations, live pitches, a hackathon and an expo.</MediaCard>}
    </div>
  </div>;
}

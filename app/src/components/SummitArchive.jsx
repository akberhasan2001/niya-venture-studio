import { useState } from "react";
import { Link } from "react-router-dom";
import archive from "../data/summit-archive.json";
import "./SummitArchive.css";

const sponsors = ["Ummah Unite", "Stearns Salaam Bank", "Amana Mutual Funds", "Ameen Housing", "Halal Wallet"];
const partners = ["Ummah Media Group", "Wahed", "UIF", "VePay", "Hasan VC"];
const partnerLogos = { "Ummah Unite": "ummah_unite.webp", "Halal Wallet": "halalwallet.webp", "VePay": "vp.webp" };
const featuredIds = ["speaker-junaid-wahedna", "speaker-monem-salam", "speaker-irshad-rasheed", "speaker-mafaz-jaufer", "speaker-lamia-yousef", "speaker-amr-mohsen"];

export function SummitArchiveNav() {
  return <div className="summit-archive-nav"><nav className="wrap" aria-label="Summit archive navigation"><a href="#summit-gallery-heading">Photos</a><a href="#program">Program</a><a href="#speakers">Speakers</a><a href="#partners">Organizers & partners</a><Link to="/summit/agenda/">Full agenda ↗</Link><Link to="/summit/hackathon/">Hackathon ↗</Link></nav></div>;
}

function SpeakerCard({ person }) {
  return <article className="archive-speaker" id={person.id}>
    {person.image ? <img src={person.image} alt={person.name} width="480" height="480" loading="lazy" decoding="async" /> : <div className="archive-speaker-initials" aria-hidden="true">{person.name.split(" ").map(word => word[0]).slice(-2).join("")}</div>}
    <div><h3>{person.name}</h3><p>{person.role}</p>{person.company && <p className="archive-speaker-company">{person.company}</p>}</div>
  </article>;
}

export default function SummitArchive() {
  const [showAll, setShowAll] = useState(false);
  const speakers = archive.speakers.filter((person, index, all) => all.findIndex(other => other.name === person.name) === index);
  const visible = showAll ? speakers : featuredIds.map(id => speakers.find(person => person.id === id)).filter(Boolean);
  return <>
    <section className="section section-cream summit-archive-section" id="program"><div className="wrap">
      <div className="section-heading split-heading" data-reveal><div><p className="eyebrow">The Edition 1 program</p><h2>Two perspectives.<br />A shared ambition.</h2></div><p>The morning explored building for the Ummah. The afternoon turned to building for the world, with an SVEC track on agentic AI and entrepreneurship.</p></div>
      <div className="archive-program-grid" data-reveal data-reveal-group>
        <article><p className="eyebrow">Morning · Building for the Ummah</p><h3>Founders, finance & capital.</h3><p>Conversations across Islamic finance, venture investment and the needs of Muslim founders, hosted by Tanveer Ali and Taqi Hasan.</p></article>
        <article><p className="eyebrow">Afternoon · Building for the World</p><h3>AI, technology & enterprise.</h3><p>The SVEC program explored agentic AI, business tools, healthcare, education and the changing role of founders and leaders.</p></article>
        <article><p className="eyebrow">Alongside the stage</p><h3>Build, pitch & connect.</h3><p>A startup pitch competition, the Founder in a Day hackathon, breakout conversations and an expo floor brought the wider ecosystem together.</p></article>
      </div><div className="archive-actions"><Link className="button button-outline" to="/summit/agenda/">Explore the archived agenda</Link><Link className="text-link" to="/summit/hackathon/">Inside the hackathon →</Link></div>
    </div></section>
    <section className="section summit-archive-section" id="speakers"><div className="wrap">
      <div className="section-heading split-heading" data-reveal><div><p className="eyebrow">From the original program</p><h2>Meet the voices.</h2></div><p>Founders, investors and technology leaders listed in the Edition 1 speaker program. Roles and organizations reflect the original event listing.</p></div>
      <div className="archive-speaker-grid" id="summit-speaker-list">{visible.map(person => <SpeakerCard key={person.id} person={person} />)}</div>
      <button type="button" className="button button-outline archive-roster-toggle" aria-expanded={showAll} aria-controls="summit-speaker-list" onClick={() => setShowAll(!showAll)}>{showAll ? "Show featured speakers" : "View the full speaker program"}</button>
    </div></section>
    <section className="section section-cream summit-archive-section" id="partners"><div className="wrap">
      <div className="section-heading" data-reveal><p className="eyebrow">The people behind the gathering</p><h2>Built together.</h2></div>
      <div className="archive-organizers" data-reveal data-reveal-group>
        <article><img src="/summit/logos/niya.webp" alt="Niya" width="160" height="80" loading="lazy" /><h3>Niya Venture Studio</h3><p>Co-organizer</p></article>
        <article><img src="/summit/logos/svec.webp" alt="Silicon Valley Entrepreneurship Club" width="160" height="80" loading="lazy" /><h3>SVEC</h3><p>Co-organizer</p></article>
        <article><img src="/summit/logos/halal-money-forum.png" alt="Halal Money Forum" width="160" height="80" loading="lazy" /><h3>Halal Money Forum</h3><p>Co-organizer</p></article>
      </div>
      <div className="archive-partners"><div><h3>Sponsors</h3><ul>{sponsors.map(name => <li key={name}>{partnerLogos[name] && <img src={`/summit/logos/${partnerLogos[name]}`} alt="" loading="lazy" />}{name}</li>)}</ul></div><div><h3>Partners & ecosystem</h3><ul>{partners.map(name => <li key={name}>{partnerLogos[name] && <img src={`/summit/logos/${partnerLogos[name]}`} alt="" loading="lazy" />}{name}</li>)}</ul></div></div>
      <p className="archive-source">Acknowledgments from the original Edition 1 website.</p>
    </div></section>
  </>;
}

function ArchiveHero({ title, children }) {
  return <><section className="page-hero"><div className="wrap"><p className="eyebrow light" data-hero>Edition 1 · Program archive</p><h1 data-hero>{title}</h1><p data-hero>{children}</p><div className="actions" data-hero><Link className="text-link light" to="/summit/">← Back to the Summit recap</Link></div></div></section><div className="wrap archive-past-notice"><strong>This event took place on August 29, 2026.</strong> The published program is preserved for reference; scheduled sessions are not a record of attendance or final timings.</div></>;
}

export function SummitAgenda() {
  const groups = [
    { title: "Building for the Ummah", label: "Morning · Pacific Time", items: archive.sessions.slice(0, 12) },
    { title: "Building for the World", label: "Afternoon · Pacific Time", items: archive.sessions.slice(12, 24) },
    { title: "Pitching Fest & hackathon finals", label: "Late afternoon · Pacific Time", items: archive.sessions.slice(24, 26) },
    { title: "Breakout conversations", label: "Lunch & evening · rooms from the published program", items: archive.sessions.slice(26) },
  ];
  return <><ArchiveHero title="The Edition 1 agenda.">The original program at the Computer History Museum: founders, finance, agentic AI and conversations across the ecosystem.</ArchiveHero><section className="section"><div className="wrap narrow archive-agenda">
    {groups.map(group => <section key={group.title} className="archive-agenda-group"><p className="eyebrow">{group.label}</p><h2>{group.title}</h2><ol>{group.items.map((session, index) => <li key={`${session.time}-${index}`}><span className="archive-session-time">{session.time}</span><div><h3>{session.title}</h3>{session.detail && <p>{session.detail}</p>}</div></li>)}</ol></section>)}
    <p className="archive-source">Source: Edition 1 published agenda, supplied in the Summit website export. Session titles are historical program titles.</p><Link className="button button-outline" to="/summit/">Return to the recap</Link>
  </div></section></>;
}

const hackathonSchedule = [
  ["8:30 AM", "Doors, check-in & breakfast"], ["9:00 AM", "Opening remarks & welcome"], ["9:15 AM", "Framing the day"], ["9:25 AM", "Team formation"],
  ["9:50 AM", "Ahmed Reza — Running a Business on Agents"], ["10:10 AM", "Umar Sear — Idea to Launch workshop"], ["10:40 AM", "Fireside & kickoff with Alaa Youssef"],
  ["11:00 AM", "Build block, with mentors on the floor"], ["4:30 PM", "Submissions, demos & judging"], ["5:30 PM", "Awards & close"],
];

export function SummitHackathon() {
  return <><ArchiveHero title="Founder in a Day.">The Edition 1 hackathon paired agentic AI workshops with a day of building and pitching a working product.</ArchiveHero><section className="section"><div className="wrap content-grid"><div className="prose"><p className="eyebrow">The concept</p><h2>From an idea to something real.</h2><p>The published program took participants through team formation, practical workshops, a mentored build block and judged demos. Ahmed Reza, Umar Sear and Alaa Youssef were listed in the morning program.</p><h3>The participant journey</h3><p>Arrive, find a team, learn, build, ship and share the result. The day was designed to help participants experience the process of creating a startup with agentic AI tools.</p><h3>What entries were judged on</h3><ul><li>Research and validation</li><li>Product and build quality</li><li>A shipped, accessible product</li><li>Agentic orchestration</li><li>Cost and model strategy</li><li>Pitch and demo</li></ul><p className="archive-source">Program design and judging criteria from the original hackathon page. This archive does not report competition winners or measured outcomes.</p></div><aside className="side-card"><p className="eyebrow">Stay connected</p><h2>Find the next gathering.</h2><p>Explore Niya’s current events and future announcements.</p><Link className="button" to="/events/">See current events</Link></aside></div></section><section className="section section-cream"><div className="wrap narrow archive-agenda"><p className="eyebrow">Published run of show · Pacific Time</p><h2>The day, step by step.</h2><ol>{hackathonSchedule.map(([time,title]) => <li key={time}><span className="archive-session-time">{time}</span><h3>{title}</h3></li>)}</ol><Link className="text-link" to="/summit/agenda/">Explore the main Summit program →</Link></div></section></>;
}

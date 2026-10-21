import { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import logo from "../../logo-niya-sf.jpg";
import taqiPhoto from "../../team-taqi-hasan.jpg";
import tanveerPhoto from "../../team-tanveer-ali.jpg";
import summitRecap from "../../assets/events/summit-edition-one-recap.jpg";
import summitCommunity from "../../assets/events/summit-community.jpg";
import summitStage from "../../assets/events/summit-stage.jpg";
import { ConnectCard, EventBrowser } from "./components/WatermelonUI.jsx";
import SummitGallery from "./components/SummitGallery.jsx";

const siteUrl = "https://niyasf.com";

const meta = {
  "/": ["Niya Venture Studio | Building the Muslim Economy", "Niya Venture Studio brings founders, capital and communities together to build the global Muslim economy."],
  "/connect/": ["Niya Connect | Early access", "Join early access for Niya Connect, the developing intelligence and connection layer for the global Muslim economy."],
  "/founders/": ["For founders | Niya Venture Studio", "Ways for founders to build with and participate in Niya Venture Studio."],
  "/investors/": ["For investors | Niya Venture Studio", "Niya Venture Studio connects investors with founders, ideas and the global Muslim economy."],
  "/providers/": ["For service providers | Niya Venture Studio", "Offer your expertise to founders and the global Muslim economy through Niya."],
  "/partners/": ["International partnerships | Niya Venture Studio", "Explore an international partnership with Niya Venture Studio."],
  "/portfolio/": ["Niya Studio | Portfolio stories", "Portfolio stories from the Niya Venture Studio ecosystem."],
  "/portfolio/vepay/": ["VePay | Niya Studio", "VePay founder story in the Niya Venture Studio ecosystem."],
  "/portfolio/halal-wallet/": ["Halal Wallet | Niya Studio", "Halal Wallet founder story in the Niya Venture Studio ecosystem."],
  "/portfolio/ummah-unite/": ["Ummah Unite | Niya Studio", "Ummah Unite founder story in the Niya Venture Studio ecosystem."],
  "/events/": ["Events | Niya Venture Studio", "Upcoming and past Niya Venture Studio events."],
  "/events/halal-money-forum-nj/": ["Halal Money Forum | Niya Events", "Halal Money Forum in New Jersey, November 14, 2026."],
  "/summit/": ["Niya Global Startup Summit 2026 | Event recap", "Recap of the inaugural Niya Global Startup Summit, held August 29, 2026 in Silicon Valley."],
  "/news/": ["News | Niya Venture Studio", "Updates, events and founder stories from Niya Venture Studio."],
  "/signup/": ["Join Niya | Niya Venture Studio", "Join Niya Venture Studio as a founder, investor, provider, attendee or international partner."],
  "/thanks/": ["Thank you | Niya Venture Studio", "Your message has been received by Niya Venture Studio."],
};

function usePageLifecycle(rootRef) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const [title, description] = meta[pathname] || ["Page not found | Niya Venture Studio", "The requested page could not be found."];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `${siteUrl}${pathname}`);
    let robots = document.querySelector('meta[name="robots"]');
    const noIndex = pathname === "/thanks/" || !meta[pathname];
    if (noIndex && !robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    if (robots) {
      if (noIndex) robots.content = "noindex";
      else robots.remove();
    }
    document.documentElement.classList.toggle("route-not-found", !meta[pathname]);
    if (hash) requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView());
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealGroups = [...root.querySelectorAll("[data-reveal]")];
    const countEls = [...root.querySelectorAll("[data-count]")];

    if (reduceMotion) {
      revealGroups.forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; });
      return undefined;
    }

    const heroItems = [...root.querySelectorAll("[data-hero]")];
    if (heroItems.length) {
      anime.set(heroItems, { opacity: 0, translateY: 30 });
      anime({
        targets: heroItems,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 900,
        delay: anime.stagger(110, { start: 90 }),
        easing: "easeOutExpo",
      });
    }

    anime.set(revealGroups, { opacity: 0, translateY: 34 });
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const isGroup = entry.target.matches("[data-reveal-group]");
        const children = isGroup ? [...entry.target.querySelectorAll(":scope > *")] : [entry.target];
        if (isGroup) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "none";
        }
        anime.set(children, { opacity: 0, translateY: 28 });
        anime({
          targets: children,
          opacity: [0, 1],
          translateY: [28, 0],
          duration: 820,
          delay: anime.stagger(85),
          easing: "easeOutCubic",
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.13, rootMargin: "0px 0px -8%" });
    revealGroups.forEach((el) => revealObserver.observe(el));

    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const counter = { value: 0 };
        anime({
          targets: counter,
          value: target,
          round: 1,
          duration: 1600,
          easing: "easeOutExpo",
          update: () => { el.textContent = `${counter.value}${suffix}`; },
          complete: () => { el.textContent = `${target}${suffix}`; },
        });
        observer.unobserve(el);
      });
    }, { threshold: 0.65 });
    countEls.forEach((el) => countObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      countObserver.disconnect();
      anime.remove([...heroItems, ...revealGroups]);
    };
  }, [pathname, rootRef]);
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  return <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
    <nav className="site-nav wrap" aria-label="Main navigation">
      <Link className="brand" to="/" aria-label="Niya Venture Studio home"><img src={logo} alt="Niya Venture Studio" /></Link>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>
        <span></span><span></span><span></span><span className="sr-only">Open menu</span>
      </button>
      <div id="nav-links" className={`nav-links${open ? " open" : ""}`}>
        <Link to="/connect/">Niya Connect</Link><Link to="/portfolio/">Studio</Link><Link to="/events/">Events</Link>
        <Link to="/news/">News</Link><Link to="/#about">About</Link><Link className="button button-small" to="/signup/">Join Niya</Link>
      </div>
    </nav>
  </header>;
}

function Footer() {
  return <footer className="site-footer">
    <div className="wrap footer-grid">
      <div><Link className="brand footer-brand" to="/"><img src={logo} alt="Niya Venture Studio" /></Link><p>Building the Muslim Economy.</p></div>
      <div><p className="footer-title">Explore</p><Link to="/connect/">Niya Connect</Link><Link to="/portfolio/">Studio</Link><Link to="/events/">Events</Link></div>
      <div><p className="footer-title">Connect</p><Link to="/signup/">Join Niya</Link><Link to="/news/">News</Link><a href="mailto:info@niyasf.com">info@niyasf.com</a><a href="https://www.linkedin.com/company/111539930" target="_blank" rel="noreferrer">Follow Niya on LinkedIn ↗</a></div>
    </div>
    <div className="wrap footer-bottom"><span>© 2026 Niya Venture Studio. All rights reserved.</span><span>Privacy and terms pending review.</span></div>
  </footer>;
}

function PageHero({ eyebrow, title, children, breadcrumb }) {
  return <section className="page-hero"><div className="wrap">
    {breadcrumb && <p className="breadcrumb" data-hero>{breadcrumb}</p>}
    <p className="eyebrow light" data-hero>{eyebrow}</p><h1 data-hero>{title}</h1><p data-hero>{children}</p>
  </div></section>;
}

function Metrics() {
  return <dl className="metric-grid" data-reveal data-reveal-group>
    <div><dt data-count="400" data-suffix="+">400+</dt><dd>attendees</dd></div>
    <div><dt data-count="50" data-suffix="+">50+</dt><dd>speakers &amp; presenters</dd></div>
    <div><dt data-count="14">14</dt><dd>live-pitch startups</dd></div>
    <div><dt data-count="50" data-suffix="+">50+</dt><dd>hackathon builders</dd></div>
  </dl>;
}

function Home() {
  const audiences = [
    ["01", "Founder", "Build with us or tap into the ecosystem around your company.", "/founders/", "For founders"],
    ["02", "Investor", "Discover people, ideas and opportunities worth knowing.", "/investors/", "For investors"],
    ["03", "Service provider", "Offer the expertise that helps ventures move forward.", "/providers/", "For providers"],
    ["04", "Startup", "Meet the companies shaping the ecosystem today.", "/portfolio/", "Explore the studio"],
    ["05", "Event attendee", "Join rooms built for meaningful conversations and action.", "/events/", "See events"],
    ["06", "International partner", "Bring the Niya model to a market and community you know.", "/partners/", "Partner with Niya"],
  ];
  return <>
    <section className="hero"><div className="hero-pattern"></div><div className="wrap hero-grid">
      <div className="hero-copy"><p className="eyebrow light" data-hero>Niya Venture Studio</p><h1 data-hero>Building the <em>Muslim Economy</em>, together.</h1><p className="lede" data-hero>We convene founders, investors and operators to turn ambitious ideas into enduring companies, connections and shared momentum.</p><div className="actions" data-hero><Link className="button" to="/signup/">Join the network</Link><Link className="text-link light" to="/events/">Explore events <span aria-hidden="true">→</span></Link></div></div>
      <ConnectCard />
    </div></section>
    <section className="section"><div className="wrap"><div className="section-heading split-heading" data-reveal><div><p className="eyebrow">Start here</p><h2>Who are you?</h2></div><p>Choose the path that best fits your work. We will take you to the most relevant way to participate in Niya.</p></div>
      <div className="audience-grid" data-reveal data-reveal-group>{audiences.map(([n, title, copy, to, cta]) => <Link className="audience-card" to={to} key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p><b>{cta} →</b></Link>)}</div>
    </div></section>
    <section className="section section-cream"><div className="wrap two-col"><div data-reveal><p className="eyebrow">How we work</p><h2>Three ways Niya moves the ecosystem forward.</h2></div><div className="stacked-list" data-reveal data-reveal-group>
      <article><span>01</span><div><h3>Niya Connect</h3><p>A pre-launch intelligence and connection platform. Join early access to help shape what comes next.</p><Link className="text-link" to="/connect/">Niya Connect →</Link></div></article>
      <article><span>02</span><div><h3>Niya Studio</h3><p>We support founders and surface portfolio stories that make the wider ecosystem more visible.</p><Link className="text-link" to="/portfolio/">Meet the companies →</Link></div></article>
      <article><span>03</span><div><h3>Niya Events</h3><p>We create places for capital, founders and operators to meet, learn and build relationships.</p><Link className="text-link" to="/events/">Upcoming and past events →</Link></div></article>
    </div></div></section>
    <section className="section summit-preview"><div className="wrap summit-layout"><div className="photo-frame" data-reveal><img src={summitRecap} alt="Niya Summit banner welcoming attendees to the 2026 event" width="2200" height="1466" loading="lazy" /></div><div data-reveal><p className="eyebrow">Edition 1 recap</p><h2>A first summit, built for real connection.</h2><p className="lede small">Niya Global Startup Summit 2026 brought founders, investors, builders and technology leaders together at the Computer History Museum in Silicon Valley.</p><Metrics /><p className="caption">Source: Niya Global Startup Summit 2026 Event Report.</p><Link className="button button-outline" to="/summit/">Read the summit recap</Link></div></div></section>
    <section className="section section-dark" id="about"><div className="wrap two-col"><div data-reveal><p className="eyebrow light">About Niya</p><h2>Our capital. Our founders. Our stage.</h2></div><div data-reveal><p className="lede small">Niya Venture Studio is building practical infrastructure for the global Muslim economy—through ventures, trusted relationships and programs that bring the right people into the same room.</p><Link className="text-link light" to="/partners/">Work with us internationally →</Link></div></div>
      <div className="wrap founder-grid" data-reveal data-reveal-group><FounderCard image={taqiPhoto} name="Taqi Hasan" copy="Co-Founder of Niya Venture Studio, focused on bringing founders, capital and the wider global Muslim economy into the same conversation." href="https://www.linkedin.com/in/taqihasan/" /><FounderCard image={tanveerPhoto} name="Tanveer Ali" copy="Co-Founder of Niya Venture Studio, helping create practical opportunities for founders, investors and builders across the ecosystem." href="https://www.linkedin.com/in/tanveer01/" /></div>
    </section>
    <section className="section signup-strip"><div className="wrap narrow center" data-reveal><p className="eyebrow">Stay close</p><h2>Join the people building what is next.</h2><p>Tell us how you want to participate. One short form is all it takes.</p><Link className="button" to="/signup/">Join Niya</Link></div></section>
  </>;
}

function FounderCard({ image, name, copy, href }) {
  return <article className="founder-card"><img src={image} alt={`${name}, Co-Founder of Niya Venture Studio`} loading="lazy" /><div><p className="eyebrow light">Co-Founder</p><h3>{name}</h3><p>{copy}</p><a className="text-link light" href={href} target="_blank" rel="noreferrer">Connect on LinkedIn ↗</a></div></article>;
}

function ContentPage({ eyebrow, title, intro, children }) {
  return <><PageHero eyebrow={eyebrow} title={title}>{intro}</PageHero><section className="section"><div className="wrap content-grid">{children}</div></section></>;
}

function Connect() { return <ContentPage eyebrow="Niya Connect · Early access" title="Build the next connection layer with us." intro="Niya Connect is in development: a future intelligence and connection layer for the global Muslim economy. It is not yet a product demo or sign-in experience."><div className="prose" data-reveal><h2>Designed around better context and stronger connections.</h2><p>We are shaping Niya Connect with the people who live the problem: founders looking for the right conversations, investors looking for informed discovery, and specialists who move companies forward.</p><h3>What early access means</h3><ul><li>Updates on progress and the first opportunities to participate.</li><li>Occasional requests for feedback as the experience takes shape.</li><li>A chance to tell us what information and introductions would make the biggest difference.</li></ul><h3>A product built with the ecosystem, not just for it.</h3><p>We are starting with the real relationships and local knowledge that already make the Muslim economy move. Join the early-access list and tell us where you fit.</p></div><SideCard eyebrow="Coming in 2027" title="Be early." copy="Share your role and interests through one short form. We will follow up with relevant early-access updates." cta="Request early access" /></ContentPage>; }

function Founders() { return <><PageHero eyebrow="For founders" title="Build with people who understand the opportunity.">Niya brings founders into a network of capital, practical expertise and ecosystem relationships.</PageHero><section className="section"><div className="wrap feature-grid" data-reveal data-reveal-group>{[["01","Build with us","Have a venture idea or a problem worth solving? Tell us what you are building and where you need a partner."],["02","Already building","Connect with a community of operators, investors and potential collaborators through Niya programs and events."],["03","Be visible","Help make the work happening across the ecosystem easier to discover. Early access to Niya Connect begins here."]].map(([n,t,c])=><article className="feature-card" key={n}><span className="icon">{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div></section><section className="section section-cream"><div className="wrap two-col"><div data-reveal><p className="eyebrow">One conversation</p><h2>Start with your context.</h2></div><div data-reveal><p className="lede small">There is no generic pitch portal here. Share your stage, what you are building and the kind of connection that would be helpful. The right next step depends on your situation.</p><Link className="button" to="/signup/">Tell us about your work</Link></div></div></section></>; }

function Investors() { return <ContentPage eyebrow="For investors" title="See more of the ecosystem before the first meeting." intro="Niya creates informed points of connection between capital, founders and the people close to emerging markets."><div className="prose" data-reveal><h2>Relationships backed by context.</h2><p>Investors do not need more noise. They need clearer context: who is building, where momentum is forming and which conversations are worth making time for.</p><h3>Ways to participate</h3><ul><li>Join Niya events and meet founders, operators and fellow investors in person.</li><li>Follow the Studio’s portfolio stories as more company detail is published.</li><li>Join the Niya Connect early-access list to help shape future discovery tools.</li></ul></div><SideCard eyebrow="Investor network" title="Tell us your lens." copy="Share your focus, geography and the conversations that matter to you. We will keep your context in mind for relevant opportunities." cta="Join as an investor" /></ContentPage>; }

function Providers() { return <ContentPage eyebrow="For service providers" title="Put useful expertise where it can create momentum." intro="Operators, advisors and specialist partners make the ecosystem stronger when founders can find the right help at the right time."><div className="prose" data-reveal><h2>Practical help is part of the infrastructure.</h2><p>Niya welcomes expertise that helps companies make progress—across legal, finance, technology, brand, hiring, strategy and the many disciplines behind a durable venture.</p><h3>How to get involved</h3><p>Join the network, describe your experience and identify the kinds of companies or communities you are equipped to support. We will use this context as opportunities take shape.</p></div><SideCard eyebrow="Share your expertise" title="Become a resource." copy="A short intake helps us understand the work you do and the founders you can help." cta="Join as a provider" /></ContentPage>; }

function Partners() { return <ContentPage eyebrow="International partnerships" title="Build something locally grounded and globally connected." intro="Niya is exploring partnerships with people who know their region’s founders, institutions and communities firsthand."><div className="prose" data-reveal><h2>Local knowledge is not a feature—it is the foundation.</h2><p>Our programs grow through people who understand the conditions in their market. The right partnership starts with a shared view of what is needed, who should be in the room and how to create real value locally.</p><h3>Let’s explore the opportunity</h3><p>Tell us about your community, institution or program. We will use the initial conversation to understand fit and the most useful next step.</p></div><SideCard eyebrow="Partner with Niya" title="Start a conversation." copy="Share where you work and what you hope to build with a local Niya partnership." cta="Explore a partnership" /></ContentPage>; }

function SideCard({ eyebrow, title, copy, cta, to="/signup/" }) { return <aside className="side-card" data-reveal><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{copy}</p><Link className="button" to={to}>{cta}</Link></aside>; }

const companies = [
  ["vepay", "VePay", "Islamic fintech", "Financial technology built with the needs of the Muslim economy in mind."],
  ["halal-wallet", "Halal Wallet", "Financial discovery", "A platform helping people discover and compare Islamic financial products."],
  ["ummah-unite", "Ummah Unite", "Community technology", "Technology that helps communities connect around shared purpose."],
];

function Portfolio() { return <><PageHero eyebrow="Niya Studio" title="Companies and people making the ecosystem more visible.">We are beginning with founder stories from companies building useful products for the global Muslim economy.</PageHero><section className="section"><div className="wrap"><p className="eyebrow" data-reveal>Founder stories</p><div className="portfolio-grid" data-reveal data-reveal-group>{companies.map(([slug,name,label,copy])=><article className="portfolio-card" key={slug}><p className="label">{label}</p><h2>{name}</h2><p>{copy}</p><Link className="text-link" to={`/portfolio/${slug}/`}>Read the profile →</Link></article>)}</div><p className="notice portfolio-notice" data-reveal>These profiles are intentionally lightweight while the Niya team collects founder bios, photography and company-approved detail. Do not treat them as investment solicitations or complete company profiles.</p></div></section></>; }

function Company({ slug }) {
  const [, name,, tagline] = companies.find((item) => item[0] === slug);
  const detail = slug === "vepay" ? "The Niya team is collecting the founder biography, company-approved copy and photography for a fuller story." : slug === "halal-wallet" ? "Founder biography, company-approved copy and photography will be added after the team completes its review." : "The fuller profile will be published after founder biography, photography and company-approved details are available.";
  const expectation = slug === "vepay" ? "The completed profile will introduce the problem VePay is solving, the people behind it and the company’s relationship to the wider ecosystem." : slug === "halal-wallet" ? "The finished story will explain the customer problem, the founder journey and the work being done to make useful financial options easier to find." : "The completed profile will capture the company’s mission, the people building it and its connection to the wider Niya ecosystem.";
  return <><PageHero eyebrow="Founder story" title={name} breadcrumb={<><Link to="/portfolio/">Studio</Link> / {name}</>}>{tagline}</PageHero><section className="section"><div className="wrap content-grid"><div className="prose" data-reveal><h2>A profile in progress.</h2><p>{name} is one of the companies Niya is preparing to feature. {detail}</p><h3>What to expect here</h3><p>{expectation}</p></div><SideCard eyebrow="Niya Studio" title="Follow the story." copy="Join Niya to receive future founder stories and ecosystem updates." cta="Join Niya" /></div></section></>;
}

function Events() { return <><PageHero eyebrow="Niya events" title="Places for ideas, capital and community to meet.">Programs with enough room for useful conversations and the people who make them matter.</PageHero><section className="section"><div className="wrap"><EventBrowser communityImage={summitCommunity} /></div></section></>; }

function HalalMoneyForum() { return <><PageHero eyebrow="New Jersey · November 14, 2026" title="Halal Money Forum" breadcrumb={<><Link to="/events/">Events</Link> / Halal Money Forum</>}>Bring your work, questions and ambition to a focused day for founders, capital and the wider Muslim economy.</PageHero><section className="section"><div className="wrap content-grid"><div className="prose" data-reveal><h2>Program details are being finalized.</h2><p>The event team will publish the venue, agenda, speaker details and attendance information here as they are confirmed. This page is designed to become the single, current source for the program.</p><h3>Pitchfest</h3><p>Founders can submit an expression of interest below. The application is routed through the event intake and is not a guarantee of participation.</p><PitchForm /></div><SideCard eyebrow="Attend" title="Stay informed." copy="Join the Niya list for confirmed program and application announcements." cta="Get updates" /></div></section></>; }

function PitchForm() { return <div className="form-shell"><h2>Pitchfest interest</h2><p>Tell the events team about your startup.</p><form name="halal-money-forum-pitchfest" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" action="/thanks/"><input type="hidden" name="form-name" value="halal-money-forum-pitchfest" /><input type="hidden" name="routing_owner" value="Taqi" /><p className="honeypot"><label>Do not fill this out <input name="bot-field" /></label></p><div className="form-grid"><Field id="pitch-name" name="name" label="Name" required /><Field id="pitch-email" name="email" label="Email" type="email" required /><Field id="company" name="company" label="Company" full required /><Field id="pitch" name="pitch" label="What are you building?" full textarea required /></div><p className="form-note">By submitting, you agree that Niya may contact you about this event. Notification routing must be configured in Netlify before production launch.</p><button className="button" type="submit">Submit interest</button></form></div>; }

function Summit() { return <><PageHero eyebrow="Past event · Edition 1" title="Niya Global Startup Summit 2026">August 29, 2026 · Computer History Museum · Silicon Valley</PageHero><section className="section"><div className="wrap summit-layout"><div className="photo-frame" data-reveal><img src={summitStage} alt="Participant speaking at Niya Global Startup Summit 2026" loading="lazy" /></div><div data-reveal><p className="eyebrow">The recap</p><h2>Our capital. Our founders. Our stage.</h2><p className="lede small">The inaugural Summit convened founders, investors, technology leaders and community members for a sold-out full day of conversations, live pitches, a hackathon and an expo floor.</p><Metrics /><p className="caption">Source: Niya Global Startup Summit 2026 Event Report.</p></div></div></section><SummitGallery /><section className="section section-cream"><div className="wrap content-grid"><div className="prose" data-reveal><h2>One day, two tracks, many conversations.</h2><p>Niya Venture Studio and the Silicon Valley Entrepreneurship Club co-organized the Summit at the Computer History Museum. The program included founder and investor conversations, a startup pitch competition, an all-day hackathon and an expo floor.</p><h3>What came through clearly</h3><p>The event was built to connect people who are building for the global Muslim economy with people who can help them build for the world. The next editions will build on that foundation.</p><p className="quote">“The quality of the conversations and the genuine willingness to support one another made the event truly special.”</p><p className="caption">Mafaz Jaufer, CEO, VePay · quoted in the 2026 Event Report.</p></div><SideCard eyebrow="Future events" title="Keep in touch." copy="See the current events calendar or join the Niya list for new program announcements." cta="See events" to="/events/" /></div></section></>; }

function News() { const items=[["Event recap · August 2026","Niya Global Startup Summit: Edition 1","The first Niya Global Startup Summit brought 400+ attendees together in Silicon Valley.","/summit/","Read recap"],["Coming soon","Founder stories","We are preparing company-approved stories from people building in the global Muslim economy.","/portfolio/","See the Studio"],["Early access · 2027","Niya Connect","Join the early-access list to help shape a new intelligence and connection layer.","/connect/","Learn more"]]; return <><PageHero eyebrow="News" title="What Niya is building, convening and learning.">Updates from the Studio, Niya Connect and our events.</PageHero><section className="section"><div className="wrap news-list" data-reveal data-reveal-group>{items.map(([label,title,copy,to,cta])=><article className="news-card" key={title}><p>{label}</p><h2>{title}</h2><p>{copy}</p><Link className="text-link" to={to}>{cta} →</Link></article>)}</div></section></>; }

function Field({ id, name, label, type="text", full=false, textarea=false, children, ...props }) { return <div className={`field${full ? " full" : ""}`}><label htmlFor={id}>{label}</label>{textarea ? <textarea id={id} name={name} {...props}></textarea> : children ? <select id={id} name={name} {...props}>{children}</select> : <input id={id} name={name} type={type} {...props} />}</div>; }

function Signup() { return <><PageHero eyebrow="Join Niya" title="One form. The right next conversation.">Tell us how you would like to participate. We will use your role and interests to guide the most relevant follow-up.</PageHero><section className="section"><div className="wrap"><div className="form-shell" data-reveal><h2>Join the network</h2><p>Fields marked with an asterisk are required.</p><form name="niya-network" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" action="/thanks/"><input type="hidden" name="form-name" value="niya-network" /><input type="hidden" name="routing_owner" value="Tanveer" /><p className="honeypot"><label>Do not fill this out <input name="bot-field" /></label></p><div className="form-grid"><Field id="name" name="name" label="Full name *" autoComplete="name" required /><Field id="email" name="email" label="Email *" type="email" autoComplete="email" required /><Field id="role" name="role" label="I am a… *" required><option value="">Select one</option><option>Founder</option><option>Investor</option><option>Service provider</option><option>Startup or portfolio company</option><option>Event attendee</option><option>International partner</option><option>Other</option></Field><Field id="organization" name="organization" label="Organization" autoComplete="organization" /><Field id="interest" name="interest" label="What would you like to explore?" full textarea placeholder="For example: early access, a founder conversation, event updates, or an international partnership." /></div><p className="form-note">By submitting this form, you agree that Niya may contact you about your interest. The team must configure production notifications and the privacy notice before launch.</p><button className="button" type="submit">Submit</button></form></div></div></section></>; }

function Thanks() { return <div className="thank-you"><div className="wrap narrow center" data-reveal><p className="eyebrow">Thank you</p><h1>We have received your note.</h1><p>Your submission is with the Niya team. We will be in touch when there is a relevant next step.</p><Link className="button" to="/">Return home</Link></div></div>; }
function NotFound() { return <div className="thank-you"><div className="wrap narrow center" data-reveal><p className="eyebrow">404</p><h1>That page is not here.</h1><p>Try the home page or explore the current Niya events.</p><Link className="button" to="/">Go home</Link></div></div>; }

export default function App() {
  const rootRef = useRef(null);
  usePageLifecycle(rootRef);
  return <div ref={rootRef}><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Routes>
    <Route path="/" element={<Home />} /><Route path="/connect/" element={<Connect />} /><Route path="/founders/" element={<Founders />} /><Route path="/investors/" element={<Investors />} /><Route path="/providers/" element={<Providers />} /><Route path="/partners/" element={<Partners />} />
    <Route path="/portfolio/" element={<Portfolio />} /><Route path="/portfolio/vepay/" element={<Company slug="vepay" />} /><Route path="/portfolio/halal-wallet/" element={<Company slug="halal-wallet" />} /><Route path="/portfolio/ummah-unite/" element={<Company slug="ummah-unite" />} />
    <Route path="/events/" element={<Events />} /><Route path="/events/halal-money-forum-nj/" element={<HalalMoneyForum />} /><Route path="/summit/" element={<Summit />} /><Route path="/news/" element={<News />} /><Route path="/signup/" element={<Signup />} /><Route path="/thanks/" element={<Thanks />} /><Route path="*" element={<NotFound />} />
  </Routes></main><Footer /></div>;
}

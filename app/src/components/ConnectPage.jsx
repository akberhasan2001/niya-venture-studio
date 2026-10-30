import { Link } from "react-router-dom";
import "./ConnectPage.css";

const pillars = [
  { number: "01", title: "Market intelligence", copy: "A clearer view of startups, sectors and emerging opportunities across markets that are often difficult to navigate from a distance.", question: "Who is building in the sectors and regions that matter to you?" },
  { number: "02", title: "Investor intelligence", copy: "Context around investors, fund managers and their areas of focus, helping people understand where their interests may align.", question: "Which investors and funds share your market focus?" },
  { number: "03", title: "Ecosystem intelligence", copy: "A map of the advisors, service providers, accelerators and events that help founders turn a promising idea into a durable business.", question: "Who can help you take the next step?" },
];

export default function ConnectPage() {
  return <>
    <section className="page-hero"><div className="wrap">
      <p className="eyebrow light" data-hero>Niya Connect · In development</p>
      <h1 data-hero>Better context.<br />Stronger connections.</h1>
      <p data-hero>We’re building an AI-powered market intelligence platform to help founders, investors and ecosystem partners navigate emerging markets, starting with the global Muslim economy.</p>
      <div className="actions" data-hero><Link className="button" to="/signup/">Join the early-access list</Link><a className="text-link light" href="#connect-vision">Explore the vision ↓</a></div>
    </div></section>
    <section className="section" id="connect-vision"><div className="wrap two-col">
      <div data-reveal><p className="eyebrow">Why we’re building it</p><h2>Good opportunities need a clearer map.</h2></div>
      <div className="prose" data-reveal><p>Finding the right startup, investor or specialist often starts with knowing the right person. Across borders, that context can be scattered across communities, events and individual networks.</p><p>Niya Connect is being designed to bring that information together, making it easier to understand who is building, where capital is focused and which relationships could move your work forward.</p></div>
    </div></section>
    <section className="section section-cream"><div className="wrap">
      <div className="section-heading split-heading" data-reveal><div><p className="eyebrow">The platform vision</p><h2>Three layers of useful context.</h2></div><p>Our planned intelligence layer brings the market, its capital and its supporting ecosystem into one view.</p></div>
      <div className="connect-pillar-grid" data-reveal data-reveal-group>{pillars.map(pillar => <article className="connect-pillar" key={pillar.number}><span className="eyebrow">{pillar.number}</span><h3>{pillar.title}</h3><p>{pillar.copy}</p><div className="connect-question"><span>Designed to help you explore</span><p>{pillar.question}</p></div></article>)}</div>
      <p className="caption connect-development-note">Niya Connect is in development. These describe the intended direction, rather than features available to use today.</p>
    </div></section>
    <section className="section"><div className="wrap content-grid"><div className="prose" data-reveal>
      <p className="eyebrow">Built around your next conversation</p><h2>For the people moving the ecosystem forward.</h2>
      <h3>Founders</h3><p>Find context around the investors, markets and practical support relevant to what you’re building.</p>
      <h3>Investors and fund managers</h3><p>Explore startup activity, regional context and potential alignment with funds and ecosystem partners.</p>
      <h3>Service providers and community partners</h3><p>Help founders discover the expertise, programs and local knowledge that can support their growth.</p>
    </div><aside className="side-card" data-reveal><p className="eyebrow">Help shape what comes next</p><h2>Your context matters.</h2><p>Join the early-access list and tell us your role, the markets you work in and what you find hardest to discover. Your input can help shape the platform.</p><Link className="button" to="/signup/">Join early access</Link></aside></div></section>
    <section className="section section-dark"><div className="wrap two-col"><div data-reveal><p className="eyebrow light">From intelligence to connection</p><h2>Start with understanding.<br />Build toward opportunity.</h2></div><div data-reveal><p className="lede small">Our starting point is better information. Over time, we aim to build on that foundation with ways to discover relevant relationships and make more informed introductions across the ecosystem.</p><Link className="text-link light" to="/events/">Meet the community at Niya events →</Link></div></div></section>
  </>;
}

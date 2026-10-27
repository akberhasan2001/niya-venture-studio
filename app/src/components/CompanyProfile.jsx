import { Link } from "react-router-dom";
import { portfolio } from "../data/portfolio";
import "./CompanyProfile.css";

export default function CompanyProfile({ slug }) {
  const company = portfolio.find(item => item.slug === slug);
  return <>
    <section className="page-hero company-profile-hero"><div className="wrap">
      <p className="breadcrumb" data-hero><Link to="/portfolio/">Niya Studio</Link> / {company.name}</p>
      <p className="eyebrow light" data-hero>{company.category}</p><h1 data-hero>{company.name}</h1><p data-hero>{company.tagline}</p>
    </div></section>
    <section className="section"><div className="wrap content-grid">
      <div className="prose" data-reveal><p className="eyebrow">The company</p><h2>{company.heading}</h2><p>{company.description}</p><h3>The story behind it</h3><p>{company.story}</p><h3>What they build</h3><ul>{company.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>
      <aside className="side-card company-website" data-reveal><img src={company.logo} alt={`${company.name} logo`} width="160" height="80" /><p className="eyebrow">Explore the company</p><h2>{company.name}</h2><p>Learn more about the product and team on their official website.</p><a className="button" href={company.website} target="_blank" rel="noopener noreferrer">Visit {company.name} ↗</a></aside>
    </div></section>
    <section className="section section-cream"><div className="wrap"><div className="section-heading" data-reveal><p className="eyebrow">The people behind it</p><h2>Meet the founders.</h2></div>
      <div className="company-founder-grid" data-reveal data-reveal-group>{company.founders.map(founder => <article className="company-founder" key={founder.name}>
        {founder.image ? <img src={founder.image} alt={founder.name} width="480" height="480" loading="lazy" /> : <div className="company-founder-initials" aria-label={founder.name}>{founder.name.split(" ").map(part=>part[0]).join("")}</div>}
        <div className="company-founder-copy"><p className="eyebrow">{founder.role}</p><h3>{founder.name}</h3><p>{founder.bio}</p></div>
      </article>)}</div>
    </div></section>
    <section className="section company-source-section"><div className="wrap"><div className="company-source-heading"><div><p className="eyebrow">Further reading</p><h2>From the company.</h2></div><Link className="text-link" to="/portfolio/">← All company profiles</Link></div><ul>{company.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul><p className="caption">Profile based on public company sources, reviewed October 27, 2026. Founder portraits from the published Niya Summit program where available.</p></div></section>
  </>;
}

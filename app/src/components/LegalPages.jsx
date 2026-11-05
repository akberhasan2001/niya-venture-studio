import { Link } from "react-router-dom";
import "./LegalPages.css";

// Planned go-live date; update this if production publication moves to another day.
const effectiveDate = "Effective November 5, 2026";
// Contact is by email; the owner has requested that no mailing address be shown.
const mailingAddress = null;

function LegalLayout({ title, children }) {
  return <>
    <section className="page-hero"><div className="wrap"><p className="eyebrow" data-hero>Niya Venture Studio · niyasf.com</p><h1 data-hero>{title}</h1><p data-hero>{effectiveDate}</p></div></section>
    <section className="section"><div className="wrap legal-layout"><nav className="legal-nav" aria-label="Legal information"><Link to="/privacy/">Privacy Policy</Link><Link to="/terms/">Terms of Use</Link><a href="mailto:info@niyasf.com">Contact Niya</a></nav><article className="prose legal-copy">{children}<h2>Contact</h2><p>Niya Venture Studio{mailingAddress && <><br />{mailingAddress}</>}<br /><a href="mailto:info@niyasf.com">info@niyasf.com</a></p></article></div></section>
  </>;
}

export function PrivacyPage() {
  return <LegalLayout title="Privacy Policy">
    <p>This page explains what information we collect on niyasf.com and how we use it. Questions: <a href="mailto:info@niyasf.com">info@niyasf.com</a>.</p>
    <h2>What we collect</h2><p>When you fill in our Join Niya form, we collect your name, email address, role (for example founder or investor), organization (optional) and anything you write in the “What would you like to explore?” box. We also receive basic technical information that any website receives, such as your browser type and IP address.</p><p>We do not ask for payment details, government IDs or passwords on this site.</p>
    <h2>How we use it</h2><p>We use your information to reply to you, add you to the Niya Connect early-access list if you ask, share updates about Niya events and programs, and understand who is interested in what so we can follow up with the most relevant people. We will email you only about Niya. Every message includes a way to opt out, or you can write to <a href="mailto:info@niyasf.com">info@niyasf.com</a> at any time.</p>
    <h2>Who sees it</h2><p>We do not sell your information. We share it only with service providers that help us run the site and our email, such as our website host (Netlify), our email provider (Microsoft 365) and Cloudflare, which provides website infrastructure and analytics. Applications for events such as the Startup Battlefield are collected through a separate form (Google Forms), and the information you enter there is also handled by that provider. We may disclose information if the law requires it.</p>
    <h2>How long we keep it</h2><p>We keep your information for as long as we need it for the purposes above, or until you ask us to delete it.</p>
    <h2>Your choices</h2><p>You can ask us to see, correct or delete the information we hold about you, or to stop emailing you, by writing to <a href="mailto:info@niyasf.com">info@niyasf.com</a>. Depending on where you live (for example California, the United Kingdom or Canada), you may have additional rights under local privacy law, and we will honor them.</p>
    <h2>Cookies and analytics</h2><p>We use Cloudflare Web Analytics to understand visits, page views and website performance, including browser, device and approximate country information. Cloudflare Web Analytics does not use cookies or track visitors across websites. This site does not use advertising cookies.</p>
    <h2>Links to other sites</h2><p>Our pages link to other sites, such as LinkedIn and company websites. We are not responsible for their privacy practices.</p>
    <p>See also our <Link to="/terms/">Terms of Use</Link>.</p>
  </LegalLayout>;
}

export function TermsPage() {
  return <LegalLayout title="Terms of Use">
    <p>These are the basic terms for using niyasf.com.</p>
    <h2>Information only</h2><p>The content on this site is for general information. Nothing on it is an offer to sell securities or a solicitation to invest, and company profiles are not investment advice.</p>
    <h2>Niya Connect</h2><p>Niya Connect is in development. Descriptions of it show our intended direction, not features available today.</p>
    <h2>Events</h2><p>Dates, venues and programs may change. Check the official event website for the latest details.</p>
    <h2>Accuracy</h2><p>We try to keep information correct and current, but we do not guarantee it.</p>
    <h2>Our content</h2><p>The Niya name, logo, text and images belong to Niya Venture Studio or their respective owners. Please do not copy them without permission.</p>
    <h2>Changes</h2><p>We may update this page. The date at the top shows when it last changed.</p>
    <p>See also our <Link to="/privacy/">Privacy Policy</Link>.</p>
  </LegalLayout>;
}

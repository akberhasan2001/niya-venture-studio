import { muslimEconomySummit as event } from "../data/events.js";
import "./StartupPavilion.css";

export default function StartupPavilion() {
  return <section className="section section-cream startup-pavilion" id="startup-pavilion" aria-labelledby="pavilion-heading">
    <div className="wrap">
      <div className="section-heading split-heading" data-reveal><div><p className="eyebrow">{event.name} · {event.date}</p><h2 id="pavilion-heading">Startup Pavilion</h2></div><p>Bring your startup to the conversation at {event.location}. Apply to pitch or register to exhibit.</p></div>
      <div className="pavilion-grid" data-reveal data-reveal-group>
        <article className="pavilion-card"><p className="eyebrow">Startup Battlefield · Free to apply</p><h3>Take your idea to the stage.</h3><p>Apply for the startup pitch competition at the Muslim Economy Summit.</p><p className="pavilion-deadline">Applications close <time dateTime="2026-11-09">{event.pitchDeadline}</time>.</p><a className="button" href={event.pitchApplication}>Apply to pitch <span aria-hidden="true">↗</span></a></article>
        <article className="pavilion-card"><p className="eyebrow">Exhibitor registration</p><h3>Showcase what you’re building.</h3><p>Connect with the Summit community as an exhibitor in the Startup Pavilion.</p><p className="pavilion-deadline">Registration closes <time dateTime="2026-11-10">{event.exhibitorDeadline}</time>.</p>{event.exhibitorRegistration ? <a className="button" href={event.exhibitorRegistration}>Register to exhibit <span aria-hidden="true">↗</span></a> : <p className="pavilion-pending">Exhibitor registration link coming soon.</p>}</article>
      </div>
      <p className="pavilion-official"><a className="text-link" href={event.website}>Full Summit details and attendee registration <span aria-hidden="true">↗</span></a></p>
    </div>
  </section>;
}

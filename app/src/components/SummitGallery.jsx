import { useEffect, useRef, useState } from "react";
import banner from "../../../assets/events/summit-edition-one-recap.jpg";
import community from "../../../assets/events/summit-community.jpg";
import people from "../../../assets/events/summit-people.jpg";
import stage from "../../../assets/events/summit-stage.jpg";
import "./SummitGallery.css";

const photos = [
  { src: banner, alt: "Attendees gathering beneath the Niya Summit banner", caption: "The gathering", position: "center" },
  { src: community, alt: "Two Summit participants presenting beside a laptop and microphone", caption: "Ideas in the spotlight", position: "center" },
  { src: people, alt: "A Summit speaker holding a microphone at the lectern", caption: "Voices from the stage", position: "center 42%" },
  { src: stage, alt: "A participant addressing the room from the Summit podium", caption: "Sharing what comes next", position: "center 20%" },
];

export default function SummitGallery() {
  const [active, setActive] = useState(0);
  const dialog = useRef(null);
  const touchStart = useRef(null);
  const move = (direction) => setActive(index => (index + direction + photos.length) % photos.length);

  useEffect(() => {
    const element = dialog.current;
    const unlock = () => { document.body.style.overflow = ""; };
    element.addEventListener("close", unlock);
    return () => { element.removeEventListener("close", unlock); unlock(); };
  }, []);

  function open(index) {
    setActive(index);
    dialog.current.showModal();
    document.body.style.overflow = "hidden";
  }

  return <section className="section summit-gallery" aria-labelledby="summit-gallery-heading">
    <div className="wrap">
      <div className="section-heading split-heading" data-reveal><div><p className="eyebrow">Edition 1 · In pictures</p><h2 id="summit-gallery-heading">A glimpse of the day.</h2></div><p>The people, presentations and moments that brought the first Niya Summit to life. Select a photo to take a closer look.</p></div>
      <div className="summit-collage" data-reveal data-reveal-group>{photos.map((photo, index) => <button type="button" className={`summit-tile summit-tile-${index}`} key={photo.src} onClick={() => open(index)} aria-label={`View photo ${index + 1}: ${photo.caption}`}>
        <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" style={{ objectPosition: photo.position }} />
        <span className="summit-tile-caption"><span>{photo.caption}</span><span className="summit-expand" aria-hidden="true">↗</span></span>
      </button>)}</div>
      <p className="summit-gallery-note">Niya Global Startup Summit · August 29, 2026 · Silicon Valley</p>
    </div>
    <dialog ref={dialog} className="summit-lightbox" aria-label="Summit photo gallery" onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }} onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); move(1); } if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } }}>
      <div className="summit-viewer">
        <div className="summit-viewer-top"><span>Edition 1 / Photo gallery</span><button type="button" onClick={() => dialog.current.close()} aria-label="Close photo gallery" autoFocus>Close <span aria-hidden="true">×</span></button></div>
        <figure onTouchStart={event => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={event => { if (touchStart.current === null) return; const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1); touchStart.current = null; }}>
          <img src={photos[active].src} alt={photos[active].alt} />
          <figcaption aria-live="polite">{photos[active].caption}<span>{active + 1} / {photos.length}</span></figcaption>
        </figure>
        <div className="summit-viewer-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous photo">← <span>Previous</span></button><p>Explore the moments</p><button type="button" onClick={() => move(1)} aria-label="Next photo"><span>Next</span> →</button></div>
      </div>
    </dialog>
  </section>;
}

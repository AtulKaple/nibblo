import React from 'react';

const LIFESTYLE_SLIDES = [
  {
    id: 'children',
    tag: 'Kids',
    label: 'Kids',
    title: 'Pure Joy & Playful Days',
    image: '/assets/img/lifestyle/Children.png',
    alt: 'Kids snacking on crunchy NIBBLO chocolate millet bites',
  },
  {
    id: 'young',
    tag: 'Youth',
    label: 'Youth',
    title: 'Fuel for Work & Play',
    image: '/assets/img/lifestyle/Young.png',
    alt: 'Young adults enjoying NIBBLO chocolate bites during work and workouts',
  },
  {
    id: 'family',
    tag: 'Family',
    label: 'Family',
    title: 'Shared Movie Nights',
    image: '/assets/img/lifestyle/Family.png',
    alt: 'Family sharing NIBBLO chocolate roasted millet snacks together',
  },
  {
    id: 'old',
    tag: 'Elders',
    label: 'Elders',
    title: 'Mindful, Gentle Crunch',
    image: '/assets/img/lifestyle/Old.png',
    alt: 'Grandparents enjoying light, wholesome NIBBLO bites',
  },
  {
    id: 'all',
    tag: 'Everyone',
    label: 'Everyone',
    title: 'Loved by Every Generation',
    image: '/assets/img/lifestyle/All.png',
    alt: 'People of all generations enjoying NIBBLO chocolate millet bites together',
  },
];

export default function LifestyleMoments() {
  return (
    <section className="s-amigos edge-wave" id="amigos" data-section="amigos">
      <header className="s-amigos__head">
        <p className="s-amigos__k">Everyday Snacking Moments</p>
        <h2 className="s-amigos__title" data-split-chars>
          A Crunch For<br />Every Moment.
        </h2>
      </header>

      <div className="duo" data-duo>
        {/* Fixed background typography watermark behind the photo showcase */}
        <div className="duo__bg" aria-hidden="true">
          <span className="duo__bg-giant">Nibblo</span>
        </div>

        {/* Dynamic text above the photo div according to image shown */}
        <div className="duo__moment-box" data-moment-box>
          {LIFESTYLE_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`duo__moment-card ${idx === 0 ? 'is-active' : ''}`}
              data-moment-card={idx}
            >
              <span className="duo__moment-tag">{slide.tag}</span>
              <h3 className="duo__moment-title">{slide.title}</h3>
            </div>
          ))}
        </div>

        {/* Photo frame with base slide and 4 curtain-wiped slides */}
        <div className="duo__frame" data-duo-frame>
          {/* Base slide: Children */}
          <div className="duo__slide duo__slide--base" data-slide="0">
            <img
              src={LIFESTYLE_SLIDES[0].image}
              alt={LIFESTYLE_SLIDES[0].alt}
              loading="eager"
              decoding="async"
              width="1112"
              height="834"
            />
          </div>

          {/* Wipe slides: Young, Family, Old, All */}
          {LIFESTYLE_SLIDES.slice(1).map((slide, idx) => (
            <div
              key={slide.id}
              className="duo__slide duo__slide--wipe"
              data-slide-wipe={idx + 1}
            >
              <div className="duo__slide-in" data-slide-in={idx + 1}>
                <img
                  src={slide.image}
                  alt={slide.alt}
                  loading="lazy"
                  decoding="async"
                  width="1100"
                  height="825"
                />
              </div>
            </div>
          ))}

          {/* Yellow curtain scan / wipe line */}
          <span className="duo__line" data-duo-line aria-hidden="true"></span>
        </div>

        {/* Caption & generational pills */}
        <div className="duo__caption">
          <span className="duo__caption-tag">Crafted with Super-Millets · Loved by Healthy Snackers</span>
          {/* <div className="duo__pills" data-duo-pills>
            {LIFESTYLE_SLIDES.map((slide, idx) => (
              <button
                type="button"
                key={slide.id}
                className={`duo__pill ${idx === 0 ? 'is-active' : ''}`}
                data-pill={idx}
              >
                {slide.label}
              </button>
            ))}
          </div> */}
        </div>
      </div>

      <p className="s-amigos__how">
        <span><b>1</b> Tear open your fresh NIBBLO pouch</span>
        <span><b>2</b> Pour out a handful of crunchy bites</span>
        <span><b>3</b> Share with friends <em>(or keep them all!)</em></span>
      </p>
    </section>
  );
}

import React from 'react';

export default function MarqueeTicker() {
  return (
    <section className="s-marquee" aria-label="Chocolate bites, roasted millets, high fibre">
      <div className="marquee marquee--a" data-marquee="1">
        <div className="marquee__track">
          <div className="marquee__group">
            <span className="marquee__word">Chocolate Bites</span>
            <img
              src="/wp-content/themes/emg-nibblo/assets/img/fonds/1.svg"
              alt=""
              className="marquee__icon"
              aria-hidden="true"
            />
            <span className="marquee__word">Roasted Millets</span>
            <img
              src="/wp-content/themes/emg-nibblo/assets/img/fonds/2.svg"
              alt=""
              className="marquee__icon"
              aria-hidden="true"
            />
            <span className="marquee__word">High Fibre</span>
            <img
              src="/wp-content/themes/emg-nibblo/assets/img/fonds/3.svg"
              alt=""
              className="marquee__icon"
              aria-hidden="true"
            />
            <span className="marquee__word marquee__word--alt">Let's Crunch!</span>
            <img
              src="/wp-content/themes/emg-nibblo/assets/img/fonds/4.svg"
              alt=""
              className="marquee__icon marquee__icon--sm"
              aria-hidden="true"
            />
          </div>
          <div className="marquee__group" aria-hidden="true">
            <span className="marquee__word">Chocolate Bites</span>
            <img
              src="/wp-content/themes/emg-nibblo/assets/img/fonds/1.svg"
              alt=""
              className="marquee__icon"
              aria-hidden="true"
            />
            <span className="marquee__word">Roasted Millets</span>
            <img
              src="/wp-content/themes/emg-nibblo/assets/img/fonds/2.svg"
              alt=""
              className="marquee__icon"
              aria-hidden="true"
            />
            <span className="marquee__word">High Fibre</span>
            <img
              src="/wp-content/themes/emg-nibblo/assets/img/fonds/3.svg"
              alt=""
              className="marquee__icon"
              aria-hidden="true"
            />
            <span className="marquee__word marquee__word--alt">Let's Crunch!</span>
            <img
              src="/wp-content/themes/emg-nibblo/assets/img/fonds/4.svg"
              alt=""
              className="marquee__icon marquee__icon--sm"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <div className="marquee marquee--b" data-marquee="-1" aria-hidden="true">
        <div className="marquee__track">
          <div className="marquee__group">
            <span className="marquee__word">The Smarter Snack</span>
            <span className="marquee__star">✱</span>
            <span className="marquee__word">Crunchy and Wholesome</span>
            <span className="marquee__star">✱</span>
            <span className="marquee__word">Pure Chocolate Joy</span>
            <span className="marquee__star">✱</span>
          </div>
          <div className="marquee__group">
            <span className="marquee__word">The Smarter Snack</span>
            <span className="marquee__star">✱</span>
            <span className="marquee__word">Crunchy and Wholesome</span>
            <span className="marquee__star">✱</span>
            <span className="marquee__word">Pure Chocolate Joy</span>
            <span className="marquee__star">✱</span>
          </div>
        </div>
      </div>
    </section>
  );
}

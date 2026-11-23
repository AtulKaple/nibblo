import React from 'react';

export default function NutritionFacts() {
  return (
    <section className="s-hours edge-wave" id="nutrition" data-section="hours">
      <div className="s-hours__disc" aria-hidden="true" />

      <header className="s-hours__head">
        <p className="s-hours__k">Nutrition Per 30g Serving</p>
        <h2 className="s-hours__title" data-split-chars>Nutrition Facts</h2>
      </header>

      <dl className="hours">
        <div className="hours__row is-today" data-days="3,4" data-hours-row>
          <dt className="hours__days">Energy (Per 30g)</dt>
          <dd className="hours__time">
            <span>146 kcal</span>
            <i aria-hidden="true">·</i>
            <span>611 kJ</span>
          </dd>
          <span className="hours__today">Wholesome</span>
        </div>

        <div className="hours__row is-today" data-days="5" data-hours-row>
          <dt className="hours__days">Protein &amp; Fibre</dt>
          <dd className="hours__time">
            <span>Protein 3.2g</span>
            <i aria-hidden="true">·</i>
            <span>Fibre 2.8g</span>
          </dd>
          <span className="hours__today">High Fibre</span>
        </div>

        <div className="hours__row is-today" data-days="1,2" data-hours-row>
          <dt className="hours__days">Carbs &amp; Good Fats</dt>
          <dd className="hours__time">
            <span>Carbs 19.5g</span>
            <i aria-hidden="true">·</i>
            <span>Total Fat 6.4g</span>
          </dd>
          <span className="hours__today">Zero Maida</span>
        </div>

        {/* <div className="hours__row is-today" data-days="6,7" data-hours-row>
          <dt className="hours__days">Ingredients</dt>
          <dd className="hours__time">
            <span>Millets (Jowar, Ragi), Dark Chocolate, Cocoa, Jaggery, Rice Crisp, Natural Flavours</span>
          </dd>
          <span className="hours__today">100% Baked</span>
        </div> */}
      </dl>

      <p className="s-hours__sign">
        <span className="s-hours__handwritten" data-sign>
          Wholesome goodness in every crunchy bite.
        </span>
      </p>

      <div className="s-hours__visuals" aria-hidden="true">
        <div className="s-hours__media s-hours__media--pouch" data-nutrition-pouch>
          <img
            src="/assets/img/nutrition/pouch-open.png"
            alt="NIBBLO Chocolate Millet Bites Open Pouch"
            loading="lazy"
            decoding="async"
            width="800"
            height="800"
          />
        </div>
        <div className="s-hours__media s-hours__media--bowl" data-nutrition-bowl>
          <img
            src="/assets/img/nutrition/bowl-bites.png"
            alt="NIBBLO Chocolate Millet Bites in a Ceramic Bowl"
            loading="lazy"
            decoding="async"
            width="800"
            height="800"
          />
        </div>
      </div>
    </section>
  );
}

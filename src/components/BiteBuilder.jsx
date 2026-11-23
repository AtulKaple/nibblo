import React from "react";

export default function BiteBuilder() {
  return (
    <section
      className="s-build edge-wave"
      id="crunch bite"
      data-section="build"
    >
      <div className="s-build__pin" data-build-pin>
        <div
          className="gl-view s-build__view"
          data-view="build"
          aria-hidden="true"
        />

    		<div className="s-build__intro">
    			<p className="s-build__kicker">Chocolate Bites · Roasted Millets</p>
    			<h2 className="s-build__title" data-split-chars>Pure<br />craft.</h2>
    		</div>

    		<ol className="s-build__steps">
    			<li className="s-build__step" data-step="0">
    				<span className="s-build__num">01</span>
    				<span className="s-build__name">Ancient Millets</span>
    				<span className="s-build__desc">Slow-roasted golden Jowar &amp; Ragi millets.</span>
    			</li>
    			<li className="s-build__step" data-step="1">
    				<span className="s-build__num">02</span>
    				<span className="s-build__name">Velvety Chocolate</span>
    				<span className="s-build__desc">Rich dark chocolate cascading over every puff.</span>
    			</li>
    			<li className="s-build__step" data-step="2">
    				<span className="s-build__num">03</span>
    				<span className="s-build__name">Crispy Rice</span>
    				<span className="s-build__desc">Airy rice crisp infusion for the signature crunch.</span>
    			</li>
    			<li className="s-build__step" data-step="3">
    				<span className="s-build__num">04</span>
    				<span className="s-build__name">Organic Jaggery</span>
    				<span className="s-build__desc">A touch of organic jaggery for caramel depth.</span>
    			</li>
    			<li className="s-build__step" data-step="4">
    				<span className="s-build__num">05</span>
    				<span className="s-build__name">Pure Cocoa</span>
    				<span className="s-build__desc">Whole roasted cocoa beans for intense aromatic depth.</span>
    			</li>
    		</ol>

        <div className="s-build__snap" data-build-snap aria-hidden="true">
          <p className="s-build__kicker">The Signature Finish</p>
          <h3 className="s-build__snap-title">Snap &amp; Crunch!</h3>
          <p className="s-build__snap-desc">
            Golden baked, never fried.
            <br />
            Crisped to perfection and ready to crunch.
          </p>
        </div>

        <div className="s-build__result" data-build-result>
          <h3 className="s-build__result-title">Classic Crunch</h3>
          <p>
            Crunchy millet clusters enrobed in velvety chocolate.
            <br />
            Enjoyed in one or two irresistible bites.
          </p>
        </div>

        <div className="s-build__twist" data-build-twist>
          <p className="s-build__twist-k">Anytime snacking, elevated</p>
          <h3 className="s-build__twist-title">Craft Pouch</h3>
          <p>
            Snack straight from the 150g pouch,
            <br />
            or sprinkle over morning yogurt &amp; smoothies.
          </p>
        </div>
      </div>
    </section>
  );
}

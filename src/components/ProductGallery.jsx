import React from 'react';

const TESTIMONIALS = [
  {
    id: '01',
    num: '01',
    quote: 'The crunch is unbelievable. My kids love it for school.',
    name: 'Priya Sharma',
    city: 'Mumbai',
    image: '/sweet-tape-assets/9.png',
    alt: 'NIBBLO Chocolate Millet Bites - Product View 9',
  },
  {
    id: '02',
    num: '02',
    quote: 'Zero maida, real millets. The ultimate 4 PM snack.',
    name: 'Rohan Mehra',
    city: 'Bengaluru',
    image: '/sweet-tape-assets/10.png',
    alt: 'NIBBLO Chocolate Millet Bites - Product View 10',
  },
  {
    id: '03',
    num: '03',
    quote: 'Rich dark chocolate and honest whole grains.',
    name: 'Ananya Verma',
    city: 'Delhi',
    image: '/sweet-tape-assets/2.png',
    alt: 'NIBBLO Chocolate Millet Bites - Product View 2',
  },
  {
    id: '04',
    num: '04',
    quote: 'Light, gentle crunch that my entire family enjoys.',
    name: 'Kavita Nair',
    city: 'Kochi',
    image: '/sweet-tape-assets/1.png',
    alt: 'NIBBLO Chocolate Millet Bites - Product View 1',
  },
  {
    id: '05',
    num: '05',
    quote: 'Baked, high in fibre, and deliciously satisfying.',
    name: 'Arjun Das',
    city: 'Hyderabad',
    image: '/sweet-tape-assets/8.png',
    alt: 'NIBBLO Chocolate Millet Bites - Product View 8',
  },
  {
    id: '06',
    num: '06',
    quote: 'Clean ingredients with an addictive chocolate crunch.',
    name: 'Tanvi Joshi',
    city: 'Pune',
    image: '/sweet-tape-assets/4.png',
    alt: 'NIBBLO Chocolate Millet Bites - Product View 4',
  },
];

export default function ProductGallery() {
  return (
    <section className="s-gallery" id="testimonials" data-section="gallery">
      <div className="s-gallery__pin" data-gallery-pin>
        <p className="s-gallery__giant" aria-hidden="true" data-gallery-giant>
          <span>Loved</span> By All
        </p>

        <header className="s-gallery__head">
          <p className="s-gallery__kicker">Loved by Thousands of Snackers</p>
          <h2 className="s-gallery__title" data-split-chars>
            Real Stories.<br />Pure Crunch.
          </h2>
        </header>

        <div className="s-gallery__track" data-gallery-track>
          {TESTIMONIALS.map((item, index) => {
            const isLow = index % 2 === 1;
            return (
              <figure
                key={item.id}
                className={`card card--testimonial ${isLow ? 'card--low' : ''}`}
                data-card
              >
                <div className="card__media">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    width="720"
                    height="480"
                    data-card-img=""
                  />
                  <div className="card__overlay" aria-hidden="true"></div>
                </div>

                <div className="card__review">
                  <p className="card__quote">“{item.quote}”</p>
                  <div className="card__author">
                    <div className="card__avatar" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div className="card__meta-text">
                      <span className="card__name">{item.name}</span>
                      <span className="card__city">{item.city}</span>
                    </div>
                  </div>
                </div>

                <span className="card__num" aria-hidden="true">{item.num}</span>
              </figure>
            );
          })}

          <div className="card card--end">
            <p>Loved by 10k+</p>
            <span>Snackers Worldwide.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef } from 'react';
import './WhyWeExist.css';

export default function WhyWeExist() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !canvas || !wrapper) return;

    const rows = gsap.utils.toArray('.giant-row', canvas);
    const topTitle = canvas.querySelector('.top-title');

    function calculateStops() {
      const r = window.innerWidth;
      const a = window.innerHeight;
      const l = r * 0.045; // margin inset
      const rawStops = [];

      for (let row of rows) {
        const t = row.offsetLeft;
        const s = row.offsetWidth;
        let u = row.getBoundingClientRect().left;
        let f = s;
        for (let p of row.querySelectorAll('.giant-prop')) {
          f = Math.max(f, p.getBoundingClientRect().right - u);
        }
        const d = a / 2 - (row.offsetTop + row.offsetHeight / 2);
        if (f <= r - 2 * l) {
          rawStops.push({ x: r / 2 - (t + s / 2), y: d });
        } else {
          // Slide smoothly across the row from start to end (with full clearance for trailing cards)
          rawStops.push({ x: l - t, y: d });
          const pad = 2 * l;
          rawStops.push({ x: r - pad - (t + f), y: d });
        }
      }

      if (topTitle) {
        const titleY = a * 0.42 - (topTitle.offsetTop + topTitle.offsetHeight / 2);
        rawStops.unshift({ x: rawStops[0].x, y: titleY });
      }

      // Bezier curve smoothing across turning corners
      const smoothed = [];
      for (let idx = 0; idx < rawStops.length; idx++) {
        const curr = rawStops[idx];
        const prev = rawStops[idx - 1];
        const next = rawStops[idx + 1];

        if (!prev || !next) {
          smoothed.push(curr);
          continue;
        }

        const fx = curr.x - prev.x, fy = curr.y - prev.y;
        const cx = next.x - curr.x, cy = next.y - curr.y;
        const pDist = Math.hypot(fx, fy), cDist = Math.hypot(cx, cy);

        if (pDist < 1 || cDist < 1) {
          smoothed.push(curr);
          continue;
        }

        const dot = (fx * cx + fy * cy) / (pDist * cDist);
        const angle = (180 * Math.acos(Math.min(1, Math.max(-1, dot)))) / Math.PI;

        if (angle < 60) {
          smoothed.push(curr);
          continue;
        }

        // Subdivide with quadratic bezier curve for silky corner turns
        const A = 0.16 * Math.min(pDist, cDist);
        const yx = curr.x - (fx / pDist) * A, yy = curr.y - (fy / pDist) * A;
        const mx = curr.x + (cx / cDist) * A, my = curr.y + (cy / cDist) * A;

        const T = 4;
        for (let step = 0; step <= T; step++) {
          const n = step / T;
          const o = 1 - n;
          smoothed.push({
            x: o * o * yx + 2 * o * n * curr.x + n * n * mx,
            y: o * o * yy + 2 * o * n * curr.y + n * n * my
          });
        }
      }

      return smoothed.length > 0 ? smoothed : rawStops;
    }

    const stops = calculateStops();
    const B = stops.length;
    const diffs = stops.slice(1).map((pt, i) => Math.hypot(pt.x - stops[i].x, pt.y - stops[i].y));
    const totalDist = diffs.reduce((sum, d) => sum + d, 0) || 1;

    // Initial positioning
    gsap.set(canvas, { x: stops[0].x, y: stops[0].y });

    // Setup stroke dasharray & dashoffset for arrows and hand notes
    const arrowLines = gsap.utils.toArray('.arrow-line', section);
    const arrowHeads = gsap.utils.toArray('.arrow-head', section);
    const arrows = gsap.utils.toArray('.diag-down-arrow, .diag-up-arrow', section);
    const giantIndices = gsap.utils.toArray('.giant-index', section);

    // Number SVGs (01, 02, 03) remain visible and static
    gsap.set(giantIndices, { scale: 1, rotate: 0, opacity: 1, visibility: 'visible' });

    arrowLines.forEach(line => {
      const len = line.getTotalLength ? line.getTotalLength() : 180;
      line.style.strokeDasharray = `${len} ${len}`;
      line.style.strokeDashoffset = `${len}`;
    });

    arrowHeads.forEach(head => {
      head.style.opacity = '0';
      head.style.transform = 'scale(0)';
      head.style.transformOrigin = 'center';
      head.style.transition = 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });

    // Prepare each hand-drawn note with rule lines and individual word spans
    const notesData = gsap.utils.toArray('.hand-note', section).map(note => {
      const ruleX = note.querySelector('.hand-rule--x path');
      const ruleY = note.querySelector('.hand-rule--y path');
      const words = gsap.utils.toArray('.hand-word', note);

      const lenX = ruleX && ruleX.getTotalLength ? ruleX.getTotalLength() : 110;
      const lenY = ruleY && ruleY.getTotalLength ? ruleY.getTotalLength() : 110;

      if (ruleX) {
        ruleX.style.strokeDasharray = `${lenX} ${lenX}`;
        ruleX.style.strokeDashoffset = `${lenX}`;
      }
      if (ruleY) {
        ruleY.style.strokeDasharray = `${lenY} ${lenY}`;
        ruleY.style.strokeDashoffset = `${lenY}`;
      }

      gsap.set(words, { clipPath: 'inset(0 100% 0 0)' });

      return { note, ruleX, ruleY, lenX, lenY, words, revealed: false };
    });

    // Animate Header chars on enter
    const titleChars = gsap.utils.toArray('.top-title .char', section);
    gsap.fromTo(titleChars, 
      { yPercent: 120, rotate: () => gsap.utils.random(-8, 8), opacity: 0 },
      {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.02,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 80%',
          once: true
        }
      }
    );

    // Initial character states for giant tracks - each character will pop up progressively based on its horizontal screen arrival
    const giantChars = [];
    rows.forEach(row => {
      const rChars = gsap.utils.toArray('.char', row);
      rChars.forEach((ch, idx) => {
        gsap.set(ch, { yPercent: 120, rotate: ((idx % 3) - 1) * 8, opacity: 0 });
        giantChars.push({
          el: ch,
          row,
          revealed: false
        });
      });
    });

    const tapeStrips = gsap.utils.toArray('.giant-tape', section);
    tapeStrips.forEach(t => t.style.setProperty('--peel', '0'));

    // Parallax props
    const props = gsap.utils.toArray('.giant-prop', canvas).map(el => {
      const pp = parseFloat(el.style.getPropertyValue('--pp')) || 0.03;
      const setterX = gsap.quickSetter(el, 'x', 'px');
      return { el, pp, setterX };
    });

    // Scrubbed camera timeline with exact proportional durations
    const tl = gsap.timeline();
    for (let i = 1; i < B; i++) {
      const dur = (diffs[i - 1] / totalDist) * (B - 1);
      tl.to(canvas, {
        x: stops[i].x,
        y: stops[i].y,
        duration: dur,
        ease: 'none'
      });
    }

    const winW = window.innerWidth;
    const triggerThreshold = winW * 0.92;

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: () => `+=${Math.round(totalDist * 0.95)}`,
      pin: wrapper,
      pinSpacing: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      animation: tl,
      onUpdate: (self) => {
        const prog = self.progress;

        // Parallax drift on floating cards and props
        const currentX = gsap.getProperty(canvas, 'x');
        props.forEach(p => {
          p.setterX(-p.pp * currentX * 0.35);
        });

        // 1. Reveal Letter-by-Letter based on exact character screen arrival
        giantChars.forEach(item => {
          const rect = item.el.getBoundingClientRect();
          // When a letter crosses from the right into the viewport
          if (rect.left < triggerThreshold && rect.right > 0) {
            if (!item.revealed) {
              item.revealed = true;
              gsap.to(item.el, {
                yPercent: 0,
                rotate: 0,
                opacity: 1,
                duration: 0.65,
                ease: 'back.out(1.8)',
                overwrite: 'auto'
              });
            }
          } else if (rect.left >= triggerThreshold) {
            if (item.revealed) {
              item.revealed = false;
              gsap.to(item.el, {
                yPercent: 120,
                rotate: gsap.utils.random(-8, 8),
                opacity: 0,
                duration: 0.35,
                ease: 'power2.in',
                overwrite: 'auto'
              });
            }
          }
        });

        // 2. Animate Hand-Drawn Notes and their 2 SVG bracket lines when crossing into viewport
        notesData.forEach(nItem => {
          const nRect = nItem.note.getBoundingClientRect();
          if (nRect.left < winW * 0.90 && nRect.right > 0) {
            if (!nItem.revealed) {
              nItem.revealed = true;
              // Animate both SVG lines drawing
              if (nItem.ruleX) {
                gsap.to(nItem.ruleX, { strokeDashoffset: 0, duration: 0.65, ease: 'power2.out' });
              }
              if (nItem.ruleY) {
                gsap.to(nItem.ruleY, { strokeDashoffset: 0, duration: 0.65, delay: 0.1, ease: 'power2.out' });
              }
              // Animate cursive text with authentic word-by-word pen handwriting reveal
              gsap.to(nItem.words, {
                clipPath: 'inset(0 0% 0 0)',
                duration: 0.45,
                stagger: 0.16,
                delay: 0.15,
                ease: 'power1.inOut',
                overwrite: 'auto'
              });
            }
          } else if (nRect.left >= winW * 0.90) {
            if (nItem.revealed) {
              nItem.revealed = false;
              if (nItem.ruleX) {
                gsap.to(nItem.ruleX, { strokeDashoffset: nItem.lenX, duration: 0.35, ease: 'power2.in' });
              }
              if (nItem.ruleY) {
                gsap.to(nItem.ruleY, { strokeDashoffset: nItem.lenY, duration: 0.35, ease: 'power2.in' });
              }
              gsap.to(nItem.words, {
                clipPath: 'inset(0 100% 0 0)',
                duration: 0.25,
                ease: 'power2.in',
                overwrite: 'auto'
              });
            }
          }
        });

        // 3. Animate connecting arrows stroke drawing based on viewport proximity
        arrows.forEach((arr, arrIdx) => {
          const aRect = arr.getBoundingClientRect();
          const line = arrowLines[arrIdx];
          const head = arrowHeads[arrIdx];
          if (!line) return;

          const aLen = line.getTotalLength ? line.getTotalLength() : 180;
          // Progress from when arrow enters right of viewport to when it reaches center
          // Delay arrow 2 (arrIdx === 1, the diagonal up-arrow before TO NOURISH) so it starts when closer to viewport
          const enterX = arrIdx === 1 ? winW * 0.72 : winW * 0.95;
          const fullX = arrIdx === 1 ? winW * 0.22 : winW * 0.35;
          const aProg = gsap.utils.clamp(0, 1, (enterX - aRect.left) / (enterX - fullX));

          line.style.strokeDashoffset = `${aLen * (1 - aProg)}`;
          if (head) {
            head.style.opacity = aProg > 0.8 ? '1' : '0';
            head.style.transform = aProg > 0.8 ? 'scale(1)' : 'scale(0)';
          }
        });

        // 3. Dynamic tape peeling
        tapeStrips.forEach((tape, i) => {
          const threshold = 0.15 + i * 0.28;
          if (self.progress > threshold) {
            const peelVal = Math.min(1, (self.progress - threshold) * 4);
            tape.style.setProperty('--peel', peelVal.toFixed(3));
          } else {
            tape.style.setProperty('--peel', '0');
          }
        });
      }
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* SVG Filters for Realistic Tape Peel Backing */}
      <svg aria-hidden="true" focusable="false" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="peel-back" x="0%" y="0%" width="100%" height="100%">
            <feFlood floodColor="#d7d2c7" result="flood" />
            <feComposite operator="in" in="flood" in2="SourceAlpha" />
          </filter>
          <filter id="peel-back-black" x="0%" y="0%" width="100%" height="100%">
            <feFlood floodColor="#2f2f2f" result="flood" />
            <feComposite operator="in" in="flood" in2="SourceAlpha" />
          </filter>
          <filter id="peel-back-kraft" x="0%" y="0%" width="100%" height="100%">
            <feFlood floodColor="#b69566" result="flood" />
            <feComposite operator="in" in="flood" in2="SourceAlpha" />
          </filter>
          <filter id="peel-back-tissue" x="0%" y="0%" width="100%" height="100%">
            <feFlood floodColor="#e3e3e3" result="flood" />
            <feComposite operator="in" in="flood" in2="SourceAlpha" />
          </filter>
          <filter id="peel-back-mark" x="0%" y="0%" width="100%" height="100%">
            <feFlood floodColor="#60a000" result="flood" />
            <feComposite operator="in" in="flood" in2="SourceAlpha" />
          </filter>
        </defs>
      </svg>

      <section ref={sectionRef} className="giant-pinning">
        <span className="giant-brow" aria-hidden="true"></span>
        <div ref={wrapperRef} className="wrapper">
          <div ref={canvasRef} className="giant-canvas">
            
            {/* Header / Subhead */}
            <div className="top-title">
              <h5 className="subhead">WHY WE EXIST</h5>
              <h2 className="h2" aria-label="CRAFTED FOR THE SMARTER CRUNCH.">
                <span className="line">
                  {'CRAFTED FOR'.split('').map((ch, i) => (
                    <span key={i} className="clip" style={{ '--i': i }}>
                      <span className="char">{ch === ' ' ? '\u00A0' : ch}</span>
                    </span>
                  ))}
                </span>
                <span className="line">
                  {'THE SMARTER'.split('').map((ch, i) => (
                    <span key={i} className="clip" style={{ '--i': i }}>
                      <span className="char">{ch === ' ' ? '\u00A0' : ch}</span>
                    </span>
                  ))}
                </span>
                <span className="line">
                  {'CRUNCH.'.split('').map((ch, i) => (
                    <span key={i} className="clip" style={{ '--i': i }}>
                      <span className="char">{ch}</span>
                    </span>
                  ))}
                </span>
              </h2>
            </div>

            {/* Pillar 1: TO CRUNCH */}
            <div className="giant-row down-to-horizontal">
              <h2 className="giant" aria-label="TO CRUNCH">
                <img className="giant-index" src="/sweet-tape-assets/index-1.svg" alt="" aria-hidden="true" draggable="false" />
                <span className="clip" style={{ '--i': 0 }}><span className="char">T</span></span>
                <span className="clip" style={{ '--i': 1 }}><span className="char">O</span></span>
                
                {/* Photo Card with Peeled Tape */}
                <span
                  className="giant-slot"
                  aria-hidden="true"
                  style={{
                    '--giant-tilt': '2.5deg',
                    '--giant-dy': '0em',
                    '--giant-dx': '0em',
                    '--pp': '0.012'
                  }}
                >
                  <img className="giant-card" src="/sweet-tape-assets/crunch.png" alt="To Crunch" />
                  <span
                    className="peel giant-tape"
                    style={{
                      '--peel-w': '0.62em',
                      '--peel-h': '0.1961em',
                      '--peel-dir': '88.4deg',
                      '--peel-back': 'url(#peel-back-kraft)'
                    }}
                    data-peel="manual"
                  >
                    <span className="peel-face">
                      <span className="peel-turn">
                        <img src="/sweet-tape-assets/opp-tape-x4.png" alt="" draggable="false" />
                      </span>
                    </span>
                    <span className="peel-flap" aria-hidden="true">
                      <span className="peel-turn">
                        <img src="/sweet-tape-assets/opp-tape-x4.png" alt="" draggable="false" />
                      </span>
                    </span>
                  </span>
                </span>

                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {'CRUNCH'.split('').map((ch, i) => (
                    <span key={i} className="clip" style={{ '--i': i }}>
                      <span className="char">{ch}</span>
                    </span>
                  ))}
                </span>
              </h2>

              {/* Floating Props & Badges */}
              <span
                className="giant-prop giant-prop--shot"
                aria-hidden="true"
                style={{
                  '--px': '98%',
                  '--py': '-15%',
                  '--pw': '15vw',
                  '--pr': '-8deg',
                  '--pz': 2,
                  '--pp': -0.03
                }}
              >
                <img src="/sweet-tape-assets/crunch2.png" alt="" />
                <span
                  className="peel giant-tape"
                  style={{
                    '--peel-w': '0.62em',
                    '--peel-h': '0.1961em',
                    '--peel-dir': '88.4deg',
                    '--peel-back': 'url(#peel-back-kraft)'
                  }}
                  data-peel="manual"
                >
                  <span className="peel-face">
                    <span className="peel-turn">
                      <img src="/sweet-tape-assets/opp-tape-x4.png" alt="" draggable="false" />
                    </span>
                  </span>
                  <span className="peel-flap" aria-hidden="true">
                    <span className="peel-turn">
                      <img src="/sweet-tape-assets/opp-tape-x4.png" alt="" draggable="false" />
                    </span>
                  </span>
                </span>
              </span>

              <img
                className="giant-prop giant-prop--tag"
                src="/sweet-tape-assets/7.png"
                alt=""
                aria-hidden="true"
                style={{
                  '--px': '79%',
                  '--py': '-24%',
                  '--pw': '15vw',
                  '--pr': '-6deg',
                  '--pz': 5,
                  '--pp': 0.03
                }}
              />
              <img
                className="giant-prop giant-prop--tag"
                src="/sweet-tape-assets/2.png"
                alt=""
                aria-hidden="true"
                style={{
                  '--px': '58%',
                  '--py': '30%',
                  '--pw': '13vw',
                  '--pr': '-5deg',
                  '--pz': 5,
                  '--pp': 0.03
                }}
              />

              {/* Hand Drawn Note */}
              <div className="hand-note giant-note" style={{ '--px': '26%', '--py': '94%' }} aria-hidden="true">
                <div className="hand-ink" aria-hidden="true">
                  <svg className="hand-rule hand-rule--x" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M 0 3 C 30 8 65 8 100 1"></path>
                  </svg>
                  <svg className="hand-rule hand-rule--y" viewBox="0 0 10 100" preserveAspectRatio="none">
                    <path d="M 6 0 C 2 33 3 70 6 100"></path>
                  </svg>
                  <span className="hand-line">
                    <span className="hand-word">ancient</span>
                    <span className="hand-word">millets</span>
                  </span>
                  <span className="hand-line">
                    <span className="hand-word">roasted</span>
                    <span className="hand-word">to</span>
                    <span className="hand-word">golden</span>
                  </span>
                  <span className="hand-line">
                    <span className="hand-word">perfection.</span>
                  </span>
                </div>
              </div>
            </div>

              {/* Connecting Diagonal Down Arrow */}
              <div className="diag-down-arrow" aria-hidden="true">
                <svg viewBox="0 0 150 100" fill="none" aria-hidden="true">
                  <path className="arrow-line" d="M4 8 C 46 14 100 42 132 84"></path>
                  <path className="arrow-head" d="M111 80 L132 84 L123 65"></path>
                </svg>
              </div>

            {/* Pillar 2: TO SAVOUR */}
            <div className="giant-row diagdown-to-horizontal">
              <h2 className="giant" aria-label="TO SAVOUR">
                <img className="giant-index" src="/sweet-tape-assets/index-2.svg" alt="" aria-hidden="true" draggable="false" />
                <span className="clip" style={{ '--i': 0 }}><span className="char">T</span></span>
                <span className="clip" style={{ '--i': 1 }}><span className="char">O</span></span>

                {/* Photo Card with Black Cloth Tape */}
                <span
                  className="giant-slot"
                  aria-hidden="true"
                  style={{
                    '--giant-tilt': '4.5deg',
                    '--giant-dy': '0em',
                    '--giant-dx': '0em',
                    '--pp': '0.01'
                  }}
                >
                  <img className="giant-card" src="/sweet-tape-assets/savour.png" alt="To Savour" />
                  <span
                    className="peel giant-tape"
                    style={{
                      '--peel-w': '0.62em',
                      '--peel-h': '0.2105em',
                      '--peel-dir': '88.4deg',
                      '--peel-back': 'url(#peel-back-black)'
                    }}
                    data-peel="manual"
                  >
                    <span className="peel-face">
                      <span className="peel-turn">
                        <img src="/sweet-tape-assets/black-cloth-tape-x4.png" alt="" draggable="false" />
                      </span>
                    </span>
                    <span className="peel-flap" aria-hidden="true">
                      <span className="peel-turn">
                        <img src="/sweet-tape-assets/black-cloth-tape-x4.png" alt="" draggable="false" />
                      </span>
                    </span>
                  </span>
                </span>

                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {'SAVOUR'.split('').map((ch, i) => (
                    <span key={i} className="clip" style={{ '--i': i }}>
                      <span className="char">{ch}</span>
                    </span>
                  ))}
                </span>
              </h2>

              {/* Floating Props */}
              <span
                className="giant-prop giant-prop--shot"
                aria-hidden="true"
                style={{
                  '--px': '100%',
                  '--py': '12%',
                  '--pw': '16vw',
                  '--pr': '-10deg',
                  '--pz': 5,
                  '--pp': -0.025
                }}
              >
                <img src="/sweet-tape-assets/savour2.png" alt="" />
                <span
                  className="peel giant-tape"
                  style={{
                    '--peel-w': '0.62em',
                    '--peel-h': '0.2105em',
                    '--peel-dir': '88.4deg',
                    '--peel-back': 'url(#peel-back-black)'
                  }}
                  data-peel="manual"
                >
                  <span className="peel-face">
                    <span className="peel-turn">
                      <img src="/sweet-tape-assets/black-cloth-tape-x4.png" alt="" draggable="false" />
                    </span>
                  </span>
                  <span className="peel-flap" aria-hidden="true">
                    <span className="peel-turn">
                      <img src="/sweet-tape-assets/black-cloth-tape-x4.png" alt="" draggable="false" />
                    </span>
                  </span>
                </span>
              </span>

              <img
                className="giant-prop giant-prop--tag"
                src="/sweet-tape-assets/5.png"
                alt=""
                aria-hidden="true"
                style={{
                  '--px': '-5%',
                  '--py': '60%',
                  '--pw': '21vw',
                  '--pr': '12deg',
                  '--pz': 1,
                  '--pp': 0.04
                }}
              />
              <img
                className="giant-prop giant-prop--tag"
                src="/sweet-tape-assets/6.png"
                alt=""
                aria-hidden="true"
                style={{
                  '--px': '68%',
                  '--py': '44%',
                  '--pw': '15vw',
                  '--pr': '-8deg',
                  '--pz': 5,
                  '--pp': -0.02
                }}
              />

              {/* Hand Drawn Note */}
              <div className="hand-note giant-note" style={{ '--px': '19%', '--py': '-24%' }} aria-hidden="true">
                <div className="hand-ink" aria-hidden="true">
                  <svg className="hand-rule hand-rule--x" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M 0 3 C 30 8 65 8 100 1"></path>
                  </svg>
                  <svg className="hand-rule hand-rule--y" viewBox="0 0 10 100" preserveAspectRatio="none">
                    <path d="M 6 0 C 2 33 3 70 6 100"></path>
                  </svg>
                  <span className="hand-line">
                    <span className="hand-word">velvety</span>
                    <span className="hand-word">chocolate</span>
                  </span>
                  <span className="hand-line">
                    <span className="hand-word">that</span>
                    <span className="hand-word">melts,</span>
                    <span className="hand-word">then</span>
                  </span>
                  <span className="hand-line">
                    <span className="hand-word">crunches</span>
                    <span className="hand-word">inside.</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Connecting Diagonal Up Arrow */}
            <div className="diag-up-arrow" aria-hidden="true">
              <svg viewBox="0 0 150 100" fill="none" aria-hidden="true">
                <path className="arrow-line" d="M4 92 C 46 86 100 58 132 16"></path>
                <path className="arrow-head" d="M111 20 L132 16 L123 35"></path>
              </svg>
            </div>

            {/* Pillar 3: TO NOURISH */}
            <div className="giant-row diagup-to-horizontal">
              <h2 className="giant" aria-label="TO NOURISH">
                <img className="giant-index" src="/sweet-tape-assets/index-3.svg" alt="" aria-hidden="true" draggable="false" />
                <span className="clip" style={{ '--i': 0 }}><span className="char">T</span></span>
                <span className="clip" style={{ '--i': 1 }}><span className="char">O</span></span>

                {/* Photo Card with OPP Tape */}
                <span
                  className="giant-slot"
                  aria-hidden="true"
                  style={{
                    '--giant-tilt': '3deg',
                    '--giant-dy': '0em',
                    '--giant-dx': '0em',
                    '--pp': '0.014'
                  }}
                >
                  <img className="giant-card" src="/sweet-tape-assets/nourish.png" alt="To Nourish" />
                  <span
                    className="peel giant-tape"
                    style={{
                      '--peel-w': '0.62em',
                      '--peel-h': '0.1961em',
                      '--peel-dir': '88.4deg',
                      '--peel-back': 'url(#peel-back-kraft)'
                    }}
                    data-peel="manual"
                  >
                    <span className="peel-face">
                      <span className="peel-turn">
                        <img src="/sweet-tape-assets/opp-tape-x4.png" alt="" draggable="false" />
                      </span>
                    </span>
                    <span className="peel-flap" aria-hidden="true">
                      <span className="peel-turn">
                        <img src="/sweet-tape-assets/opp-tape-x4.png" alt="" draggable="false" />
                      </span>
                    </span>
                  </span>
                </span>

                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {'NOURISH'.split('').map((ch, i) => (
                    <span key={i} className="clip" style={{ '--i': i }}>
                      <span className="char">{ch}</span>
                    </span>
                  ))}
                </span>
              </h2>

              {/* Floating Props */}
              <span
                className="giant-prop giant-prop--shot"
                aria-hidden="true"
                style={{
                  '--px': '98%',
                  '--py': '10%',
                  '--pw': '17vw',
                  '--pr': '5deg',
                  '--pz': 3,
                  '--pp': 0.045
                }}
              >
                <img src="/sweet-tape-assets/nourish2.png" alt="" />
                <span
                  className="peel giant-tape"
                  style={{
                    '--peel-w': '0.62em',
                    '--peel-h': '0.1961em',
                    '--peel-dir': '88.4deg',
                    '--peel-back': 'url(#peel-back-kraft)'
                  }}
                  data-peel="manual"
                >
                  <span className="peel-face">
                    <span className="peel-turn">
                      <img src="/sweet-tape-assets/opp-tape-x4.png" alt="" draggable="false" />
                    </span>
                  </span>
                  <span className="peel-flap" aria-hidden="true">
                    <span className="peel-turn">
                      <img src="/sweet-tape-assets/opp-tape-x4.png" alt="" draggable="false" />
                    </span>
                  </span>
                </span>
              </span>

              <img
                className="giant-prop giant-prop--tag"
                src="/sweet-tape-assets/8.png"
                alt=""
                aria-hidden="true"
                style={{
                  '--px': '76.4%',
                  '--py': '-27%',
                  '--pw': '15vw',
                  '--pr': '6deg',
                  '--pz': 5,
                  '--pp': -0.02
                }}
              />
              <img
                className="giant-prop giant-prop--tag"
                src="/sweet-tape-assets/4.png"
                alt=""
                aria-hidden="true"
                style={{
                  '--px': '43%',
                  '--py': '49%',
                  '--pw': '22.71vw',
                  '--pr': '9deg',
                  '--pz': 5,
                  '--pp': 0.032
                }}
              />

              {/* Hand Drawn Note */}
              <div className="hand-note giant-note" style={{ '--px': '25%', '--py': '94%' }} aria-hidden="true">
                <div className="hand-ink" aria-hidden="true">
                  <svg className="hand-rule hand-rule--x" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M 0 3 C 30 8 65 8 100 1"></path>
                  </svg>
                  <svg className="hand-rule hand-rule--y" viewBox="0 0 10 100" preserveAspectRatio="none">
                    <path d="M 6 0 C 2 33 3 70 6 100"></path>
                  </svg>
                  <span className="hand-line">
                    <span className="hand-word">zero</span>
                    <span className="hand-word">maida,</span>
                  </span>
                  <span className="hand-line">
                    <span className="hand-word">high</span>
                    <span className="hand-word">fibre,</span>
                  </span>
                  <span className="hand-line">
                    <span className="hand-word">100%</span>
                    <span className="hand-word">guilt-free.</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

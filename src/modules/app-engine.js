import { setupScroll } from './scroll.js';
import { loadIntro, revealIntro } from './intro.js';
import { initSections } from './sections.js';
import { initCursor } from './cursor.js';
import { preloadAll } from './preload.js';

export function startNibbloEngine() {
  const root = document.documentElement;
  root.classList.replace('no-js', 'js');

  const nibbloDataEl = document.getElementById('emg-nibblo-data');
  let loadedData = null;
  try {
    if (nibbloDataEl && nibbloDataEl.textContent) {
      loadedData = JSON.parse(nibbloDataEl.textContent);
    }
  } catch (e) {}

  const data = loadedData || {
    themeUrl: '/wp-content/themes/emg-nibblo',
    launch: '2026-10-14T18:30:00+02:00',
    hours: {
      '3': ['18:30', '22:30'],
      '4': ['18:30', '22:30'],
      '5': ['17:00', '22:30']
    },
    tz: 'Europe/Zurich',
    no3d: false,
    logo: '/wp-content/themes/emg-nibblo/assets/img/logo/seul-creme.svg'
  };

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** État partagé entre les animations GSAP (écriture) et la 3D (lecture). */
  const state = (window.__nibblo = {
    reduced,
    hero: { p: 0, mx: 0, my: 0, enter: 0 },
    build: { p: 0 },
    drinks: { p: 0 },
    rain: { active: false, reset: null }
  });

  function webgl() {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGL2RenderingContext && c.getContext('webgl2'));
    } catch (e) {
      return false;
    }
  }

  /** Lance la 3D ; réessaie une fois en cas d'échec ponctuel. */
  function loadGL() {
    if (data.no3d || !webgl()) return Promise.resolve(null);
    const attempt = () => import('../gl/stage.js').then((m) => m.createStage(state, data));
    return attempt()
      .catch(() => new Promise((r) => setTimeout(r, 1200)).then(attempt))
      .catch((e) => {
        console.error('[NIBBLO] 3D unavailable :', e);
        return null;
      });
  }

  /** Active la 3D (fondu croisé avec les illustrations de secours). */
  function showGL(gl, late = false) {
    if (!gl || root.classList.contains('has-gl')) return;
    root.classList.add('has-gl');
    if (window.gsap && !reduced) {
      window.gsap.fromTo('[data-view] canvas', { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power2.out' });
      if (late) window.gsap.fromTo(state.hero, { enter: 0 }, { enter: 1, duration: 1.8, ease: 'power2.out' });
    } else {
      state.hero.enter = 1;
    }
  }

  /** Attend que le navigateur ait réellement peint. */
  const painted = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

  let lenisInstance = null;
  let stageInstance = null;
  let resizeHandler = null;

  async function boot() {
    // 1. Initialiser le mode réduit si besoin
    const { gsap, ScrollTrigger, SplitText, CustomEase } = window;
    if (reduced || !gsap || !ScrollTrigger) {
      root.classList.add('reduced');
      state.build.p = 0.75;
      state.drinks.p = 1;
      state.hero.enter = 1;
      loadGL().then((gl) => {
        stageInstance = gl;
        showGL(gl);
      });
      return;
    }

    if (SplitText && CustomEase) {
      gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
    } else {
      gsap.registerPlugin(ScrollTrigger);
    }
    ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load' });
    if (CustomEase) {
      CustomEase.create('nibblo', 'M0,0 C0.2,0.8 0.2,1 1,1');
    }

    // 2. Smooth scroll
    lenisInstance = setupScroll();
    lenisInstance.stop();

    // 3. Curseur personnalisé
    initCursor();

    // 4. Attente du premier rendu
    await painted();

    // 5. Préchargement & 3D en parallèle
    const glReady = loadGL();
    let onImg = () => {};
    const images = preloadAll((f) => onImg(f));

    // 6. Intro
    const gl = await loadIntro({ glReady, images, onImages: (cb) => (onImg = cb) });
    stageInstance = gl;

    if (gl) {
      showGL(gl);
    } else {
      glReady.then((lateGL) => {
        stageInstance = lateGL;
        showGL(lateGL, true);
      });
    }

    // 7. Animations des sections GSAP
    initSections(state, lenisInstance);
    ScrollTrigger.refresh();

    // 8. Révélation du site et démarrage du scroll
    await revealIntro(state);
    lenisInstance.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    lenisInstance.start();

    // 9. Resize debounce
    let lastW = window.innerWidth;
    let timer = 0;
    resizeHandler = () => {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 250);
    };
    window.addEventListener('resize', resizeHandler);
  }

  boot().catch(console.error);

  return {
    state,
    destroy() {
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
      if (stageInstance?.destroy) stageInstance.destroy();
    }
  };
}

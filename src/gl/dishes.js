/**
 * Plats assemblés : pinchos et cazuelas, d'après les vraies photos du Topaze.
 * Chaque pincho a son origine au centre de la tranche de pain.
 */
import * as THREE from "three";
import * as F from "./food.js";
import { rng, smoothstep } from "./noise.js";
import { loadProductModel } from "./model-loader.js";

const TOP = F.BREAD.top + 0.035; // dessus de la mie

function onTop(r, radius = 0.62, y = TOP) {
  const a = r() * Math.PI * 2;
  const d = Math.sqrt(r()) * radius;
  return new THREE.Vector3(
    Math.cos(a) * d * F.BREAD.squash,
    y,
    Math.sin(a) * d,
  );
}

/** NIBBLO 5-Step Product Assembly: Millets -> Chocolate -> Rice Crisp -> Jaggery -> Snap Crunch */
export function pinchoSuisse(mats, { flag = false, seed = 1 } = {}) {
  const group = new THREE.Group();
  // Step 1: Ancient Millets Core (Roasted Jowar & Ragi)
  const bread = F.jowarMillet(mats, 0.95, seed);
  bread.position.y = -0.04;

  // Step 2: Velvety Chocolate enrobing blanket
  const cheese = F.breadCheese(mats, seed);
  const pepper = F.pepper(mats, 45, 0.55, seed + 2);
  pepper.position.y = F.BREAD.h / 2 + 0.04 + 0.085;
  const pepperG = new THREE.Group();
  pepperG.add(pepper);

  // Step 3: Puffed Rice Crisps
  const corni = F.riceCrisp(mats, 0.55, seed + 3);
  corni.position.set(-0.04, TOP + 0.22, 0.02);
  corni.scale.setScalar(1.2);
  corni.rotation.set(0.12, 0.7, 0.1);

  // Step 4: Organic Jaggery Caramel Chunk
  const onion = F.jaggeryBlock(mats, 0.42, seed + 4);
  onion.position.set(0.03, TOP + 0.48, 0);

  // Step 5: Snap pick
  let pick;
  let wave = null;
  if (flag) {
    const fp = F.flagPick(mats, 2.35);
    pick = fp.group;
    wave = fp.wave;
  } else {
    pick = F.knotPick(mats, 1.55);
  }
  pick.position.set(0.03, -0.12, 0);
  pick.rotation.z = -0.05;

  group.add(bread, cheese, pepperG, corni, onion, pick);
  return {
    group,
    parts: { bread, cheese, pepper: pepperG, corni, onion, pick },
    wave,
  };
}

/** Pincho poulet paprika, oignon rouge, ciboulette (photos 8 à 10). */
export function pinchoPoulet(mats, { seed = 11 } = {}) {
  const group = new THREE.Group();
  group.add(F.bread(mats, seed));
  const r = rng(seed);
  for (let i = 0; i < 10; i++) {
    const c = F.stewChunk(mats, seed + i, 0.12 + r() * 0.05);
    c.position.copy(onTop(r, 0.55, TOP + 0.05 + r() * 0.08));
    c.rotation.set(r() * 3, r() * 3, r() * 3);
    group.add(c);
  }
  for (let i = 0; i < 2; i++) {
    const o = F.redOnion(mats, Math.PI * (1.05 + r() * 0.2), 0.3 + r() * 0.06);
    o.position.set((i - 0.5) * 0.35, TOP + 0.12, (r() - 0.5) * 0.2);
    o.rotation.set(0, (r() - 0.5) * 1.2, 0);
    group.add(o);
  }
  group.add(
    F.scatter(
      F.chiveGeo(),
      mats.herb,
      26,
      (rr) => onTop(rr, 0.55, TOP + 0.24 + rr() * 0.06),
      seed + 3,
    ),
  );
  const pick = F.knotPick(mats, 1.45);
  pick.position.set(0.02, -0.1, 0.02);
  group.add(pick);
  return { group };
}

/** Le Chalutier : crevettes, sauce cocktail, oignons crispy. */
export function pinchoChalutier(mats, { seed = 21 } = {}) {
  const group = new THREE.Group();
  group.add(F.bread(mats, seed));
  const sauce = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 48, 24),
    mats.cocktail,
  );
  sauce.scale.set(F.BREAD.squash, 0.16, 1);
  sauce.position.y = TOP + 0.02;
  group.add(sauce);
  const r = rng(seed);
  for (let i = 0; i < 2; i++) {
    const s = F.shrimp(mats, seed + i);
    s.scale.setScalar(1.25);
    s.position.set((i - 0.5) * 0.42, TOP + 0.22, (r() - 0.5) * 0.15);
    s.rotation.set(-0.35, (i - 0.5) * 1.4 + r() * 0.3, 0.1);
    group.add(s);
  }
  group.add(
    F.scatter(
      F.crispyGeo(),
      mats.crispy,
      22,
      (rr) => onTop(rr, 0.5, TOP + 0.12 + rr() * 0.1),
      seed + 2,
    ),
  );
  group.add(
    F.scatter(
      F.chiveGeo(),
      mats.herb,
      14,
      (rr) => onTop(rr, 0.5, TOP + 0.2 + rr() * 0.08),
      seed + 4,
    ),
  );
  const pick = F.knotPick(mats, 1.45);
  pick.position.set(0, -0.1, 0);
  group.add(pick);
  return { group };
}

/**
 * NIBBLO Hero Centerpiece Showcase:
 * Signature Chocolate-coated millet crunch bite with surrounding roasted millets,
 * dark chocolate chunks, organic jaggery, and the waving NIBBLO brand flag.
 */
export function pinchoPecheur(
  mats,
  { seed = 31, flag = false, lite = false, productModel = null } = {},
) {
  const group = new THREE.Group();

  // Middle item in hero: 3D Product Model (product.glb)
  let bite;
  if (productModel) {
    bite = productModel.clone();
    bite.position.y = 0.08;
  } else {
    bite = F.nibbloCrunchBite(mats, 0.98, seed);
    bite.position.y = 0.08;
  }
  group.add(bite);

  // Flag pick connected directly into the top of the middle product item
  let pick;
  let wave = null;
  if (flag) {
    const fp = F.flagPick(mats, 1.15);
    pick = fp.group;
    wave = fp.wave;
  } else {
    pick = F.knotPick(mats, 1.45);
  }
  pick.position.set(0.06, 0.62, -0.02);
  pick.rotation.z = -0.06;
  group.add(pick);

  // Function to swap in product.glb when loaded asynchronously
  const setProduct = (model) => {
    if (!model) return;
    group.remove(bite);
    bite = model.clone();
    bite.position.y = 0.08;
    group.add(bite);
    group.remove(pick);
    group.add(pick);
  };

  if (!productModel) {
    loadProductModel().then((m) => {
      if (m) setProduct(m);
    }).catch(console.error);
  }

  return { group, wave, setProduct };
}

/**
 * Cazuela : cocotte + pommes de terre (+ garniture).
 * kind : 'suissesse' (raclette, cornichons, oignons) ou 'piqo' (chorizo, sauce cocktail).
 * Retourne aussi la liste des cubes et la nappe pour les animer.
 */
export function cazuela(mats, { kind = "suissesse", seed = 41 } = {}) {
  const group = new THREE.Group();
  const pot = F.cazuelaPot(mats);
  group.add(pot);
  const r = rng(seed);
  const cubes = [];
  const layers = [
    [0.1, 0.62, 9],
    [0.32, 0.55, 7],
    [0.5, 0.38, 4],
  ];
  for (const [y, rad, n] of layers) {
    for (let i = 0; i < n; i++) {
      const isChorizo = kind === "piqo" && r() < 0.35;
      const c = F.cube(
        mats,
        isChorizo ? "chorizo" : "potato",
        seed + cubes.length,
      );
      const a = (i / n) * Math.PI * 2 + r() * 0.6;
      const d = rad * (0.55 + r() * 0.45);
      c.position.set(Math.cos(a) * d, y + 0.14 + r() * 0.05, Math.sin(a) * d);
      c.rotation.set(r() * 0.8, r() * 3, r() * 0.8);
      c.userData.rest = c.position.clone();
      c.userData.restRot = c.rotation.clone();
      cubes.push(c);
      group.add(c);
    }
  }
  let topping = null;
  let dust = null;
  const extras = [];
  if (kind === "suissesse") {
    // Surface fondue : enveloppe douce des pommes de terre, flaque contre la paroi.
    const H = (x, z) => {
      let acc = 0;
      for (const c of cubes) {
        const p = c.userData.rest;
        const d = Math.hypot(x - p.x, z - p.z);
        // Nappe fine : épouse chaque morceau, les plus hauts dépassent.
        const top = p.y + 0.135 - (d / 0.26) ** 2 * 0.28;
        acc += Math.exp(top / 0.028);
      }
      acc += Math.exp(0.42 / 0.028);
      let h = 0.028 * Math.log(acc) + 0.008;
      const rr = Math.hypot(x, z);
      h += (0.44 - h) * smoothstep(0.82, 1.0, rr);
      return h;
    };
    topping = F.meltBlanket(mats, H, { R: 1.0, seed });
    topping.userData.baseY = 0;
    group.add(topping);
    const place = (o, x, z, lift, yaw, tilt = 0.15) => {
      o.position.set(x, H(x, z) + lift, z);
      o.rotation.set(tilt * (r() - 0.5) * 2, yaw, tilt * (r() - 0.5) * 2);
      extras.push(o);
      group.add(o);
    };
    for (let i = 0; i < 2; i++) {
      const c = F.cornichon(mats, seed + 9 + i);
      c.scale.setScalar(0.72);
      const x = (i - 0.5) * 0.62;
      const z = (r() - 0.5) * 0.3;
      place(c, x, z, 0.075, 0.6 + i * 2.1 + r() * 0.5);
    }
    const spots = [
      [-0.1, -0.38],
      [0.32, 0.28],
      [-0.4, 0.2],
    ];
    spots.forEach(([x, z], i) => {
      const o = F.pearlOnion(mats, 0.14 + i * 0.01, i + 4);
      place(o, x, z, 0.1, r() * 6, 0.35);
    });
    dust = F.sprinkle(
      new THREE.IcosahedronGeometry(0.008, 0),
      mats.pepper,
      90,
      (x, z) => H(x, z) + 0.008,
      { rx: 0.8, rz: 0.8, seed: seed + 5 },
    );
    dust.visible = false;
    group.add(dust);
  } else {
    topping = F.drizzle(mats, mats.cocktail, {
      width: 1.4,
      depth: 1.05,
      turns: 7,
      height: (x, z) => 0.7 + 0.14 * Math.max(0, 1 - (x * x + z * z) / 0.6),
      radius: 0.02,
      seed,
    });
    topping.userData.baseY = 0;
    group.add(topping);
  }
  const forks = [];
  for (const s of [-1, 1]) {
    const f = F.woodFork(mats);
    f.position.set(s * 0.45, 1.05, -0.15 * s);
    f.rotation.set(-0.9, s * 0.5, s * 0.25);
    forks.push(f);
    group.add(f);
  }
  return { group, cubes, topping, extras, forks, dust };
}

/**
 * NIBBLO 3D Floating Ingredients Orbiting the Hero:
 * - Millets (Jowar, Ragi)
 * - Dark Chocolate
 * - Cocoa (Whole Beans)
 * - Organic Jaggery Chunks
 * - Airy Rice Crisps
 */
export function floatingIngredients(mats) {
  const items = [];
  // Scale factor: scaled down so the floating ingredients gracefully orbit the hero
  // as refined ingredient particles without overshadowing the center product or typography.
  const SCALE = 0.88;
  const add = (m, s = 1) => {
    m.scale.multiplyScalar(s * SCALE);
    items.push(m);
  };

  // 1. Millets: Golden Puffed Jowar & Roasted Ragi
  add(F.jowarMillet(mats, 0.24, 3), 0.9);
  add(F.jowarMillet(mats, 0.24, 3), 0.9);
  add(F.jowarMillet(mats, 0.24, 3), 0.9);
  add(F.jowarMillet(mats, 0.34, 21), 1.1);
  add(F.ragiMillet(mats, 0.32, 4), 1.2);
  add(F.ragiMillet(mats, 0.25, 5), 1.05);
  add(F.ragiMillet(mats, 0.28, 22), 1.1);

  // 2. Dark Chocolate Chunks & Shards
  add(F.darkChocolateChunk(mats, 0.40, 6), 1.25);
  add(F.darkChocolateChunk(mats, 0.32, 7), 1.05);
  add(F.darkChocolateChunk(mats, 0.25, 8), 0.9);
  add(F.darkChocolateChunk(mats, 0.35, 23), 1.1);

  // 3. Whole Roasted Cocoa Beans
  add(F.cocoaBean(mats, 0.28, 10), 1.0);
  add(F.cocoaBean(mats, 0.28, 10), 1.0);
  add(F.cocoaBean(mats, 0.22, 11), 0.9);

  // 4. Organic Jaggery Caramel Chunks
  add(F.jaggeryBlock(mats, 0.34, 12), 1.2);
  add(F.jaggeryBlock(mats, 0.26, 13), 1.0);
  add(F.jaggeryBlock(mats, 0.22, 24), 0.9);

  // 5. Puffed Rice Crisps
  add(F.riceCrisp(mats, 0.36, 14), 1.2);
  add(F.riceCrisp(mats, 0.28, 15), 1.05);
  add(F.riceCrisp(mats, 0.22, 16), 0.9);
  add(F.riceCrisp(mats, 0.30, 25), 1.1);

  return items;
}

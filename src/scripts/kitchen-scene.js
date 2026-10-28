// The 3D bun-shop kitchen on /zh/kitchen. Blotz as a little restaurant you can walk around: the front hall
// (users and marketing), the research room (product), the design room behind the meeting room, the meeting
// room between product and the big kitchen (developers), the AI lab and the cooking classroom. Each team has its own colour on the floor, and a
// numbered path on the floor shows how a user's idea goes round the shop and comes back as a new version. Furniture and food are KayKit Restaurant Bits (CC0, public/kitchen/kaykit);
// the people are drawn here so each can do their own job.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PEOPLE, CAST, LOOP, DEPTS, STAGES, stageOf, stageTeams } from '../data/kitchen';

const INK = '#1e2140', W = '#ffffff', PAPER = '#f4f7ee';
const FONT = '"SF Pro Rounded", ui-rounded, "PingFang SC", "Hiragino Sans GB", sans-serif';
const KAYKIT = '/kitchen/kaykit/';
const MODELS = ['kitchencounter_straight_A', 'kitchencounter_straight_A_decorated', 'kitchencounter_straight_B', 'kitchencounter_sink',
  'stove_multi_decorated', 'oven', 'fridge_A_decorated', 'extractorhood', 'kitchencabinet', 'kitchentable_A', 'kitchentable_A_large_decorated',
  'kitchentable_A_large', 'kitchentable_B', 'table_round_A', 'chair_A', 'crate_buns', 'crate_carrots', 'crate_tomatoes', 'crate_lettuce',
  'food_ingredient_bun', 'plate', 'pot_large', 'cuttingboard', 'knife', 'jar_A_large', 'jar_B_medium', 'jar_C_small', 'menu',
  'shelf_papertowel_decorated', 'dishrack_plates'];
const WALL_MOUNTED = new Set(['extractorhood', 'kitchencabinet', 'shelf_papertowel_decorated']);

// The building: an irregular polygon, front at +z. Each room is a polygon inside it, and not all of them square:
// the research room has a slanted front, the meeting room a rounded front and a slanted back wall.
const MEET_ARC = Array.from({ length: 11 }, (_, i) => [-8 - 5.5 * i / 10, -2 + 2.6 * Math.sin(Math.PI * i / 10)]);
const OUTLINE = [[-16, 8], [-6, 8], [-4, 10.5], [4, 10.5], [6, 8], [12, 8], [16, 4], [16, -12], [12, -16], [-16, -16], [-20, -12], [-20, 4]];
const SHOPFRONT = new Set([0, 1, 2, 3, 4]); // outline edges that are glass shop front instead of wall
const ROOMS = {
  pm: [[-20, -12], [-16, -16], [-13.5, -16], [-13.5, -2], [-16.5, -2], [-20, 0.2]],
  dev: [[-8, -16], [6, -16], [6, -2], [-8, -2]],
  ai: [[6, -16], [12, -16], [16, -12], [16, -7], [6, -9]],
  learn: [[6, -9], [16, -7], [16, -2], [6, -2]],
  meet: [[-13.5, -8.2], [-8, -10], ...MEET_ARC], // where product and the kitchen meet
  design: [[-13.5, -16], [-8, -16], [-8, -10], [-13.5, -8.2]],
  // marketing has the whole front: the dining hall (round the meeting room's curve) and the pavement outside
  guest: [[-20, 0.2], [-16.5, -2], ...[...MEET_ARC].reverse(), [16, -2], [16, 4], [12, 8], [6, 8], [4, 10.5], [-4, 10.5], [-6, 8], [-16, 8], [-20, 4]],
  mkt: [[-16, 10.7], [16, 10.7], ...Array.from({ length: 13 }, (_, i) => [16 * Math.cos(Math.PI * (i + 1) / 14), 10.7 + 5.6 * Math.sin(Math.PI * (i + 1) / 14)])],
};
// Where the camera goes for each room or thing: [target x, z, distance]
const VIEWS = {
  home: [-2.5, 1.5, 53], guest: [-2, 4, 26], mkt: [-1, 6, 40], feedback: [-15.5, -3, 24], pm: [-16.5, -8.5, 24], design: [-10.8, -12, 20],
  dev: [-1, -9, 26], ai: [11, -12, 20], learn: [11, -5, 20], meet: [-10.8, -5.2, 18], board: [-5.2, -4.8, 17], taste: [1.5, -3.5, 16], out: [-1, -2, 20], pass: [8, -1, 18], night: [9.4, -0.6, 15], feedbot: [-16, -2, 18],
  loop: [-4, -3, 44],
};

export async function initKitchen(el, { onPick, onHover, onTour, mode = 0, still = false }) {
  let MODE = mode;

  // renderer, labels, ink outlines like the drawings on the rest of the site
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.className = 'kz-canvas';
  el.prepend(renderer.domElement);
  const css = new CSS2DRenderer();
  css.domElement.className = 'kz-labels';
  el.appendChild(css.domElement);
  const effect = new OutlineEffect(renderer, { defaultThickness: 0.0028, defaultColor: [0.118, 0.129, 0.251] });

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(PAPER);
  scene.fog = new THREE.Fog(PAPER, 90, 160);
  const camera = new THREE.PerspectiveCamera(30, 1.6, 0.5, 400);
  const controls = new OrbitControls(camera, renderer.domElement);
  Object.assign(controls, {
    enableDamping: true, dampingFactor: 0.12, rotateSpeed: 0.6, zoomSpeed: 1.1, panSpeed: 1.0,
    screenSpacePanning: false, zoomToCursor: true, minDistance: 9, maxDistance: 120, minPolarAngle: 0.22, maxPolarAngle: 1.2,
  });
  // game-style moves: drag the map with the left button or one finger, turn it with the right button,
  // pinch or wheel to zoom (a trackpad's two-finger scroll moves the map, see the wheel handler below)
  controls.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE };
  controls.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_ROTATE };
  controls.panSpeed = 1.3;
  const HOME_DIR = new THREE.Vector3(0.42, 0.62, 0.66).normalize(); // the overview: from the front right, above
  // narrow screens see less from side to side, so the camera stands further back
  const fitDist = d => d * Math.max(1, Math.min(1.6, 1.1 / camera.aspect));
  const homeDist = () => fitDist(VIEWS.home[2]);
  const placeHome = () => {
    controls.target.set(VIEWS.home[0], 0, VIEWS.home[1]);
    camera.position.copy(controls.target).addScaledVector(HOME_DIR, homeDist());
    controls.update();
  };
  // keep the point the camera looks at over the shop
  const clampTarget = () => {
    const t = controls.target;
    const cx = THREE.MathUtils.clamp(t.x, -24, 20), cz = THREE.MathUtils.clamp(t.z, -20, 15);
    if (cx !== t.x || cz !== t.z || t.y !== 0) { const d = new THREE.Vector3(cx - t.x, -t.y, cz - t.z); t.add(d); camera.position.add(d); }
  };
  controls.addEventListener('change', clampTarget);
  // moves that don't come from OrbitControls: trackpad scrolling, keys, the on-screen buttons
  const fwd = new THREE.Vector3(), side = new THREE.Vector3(), offset = new THREE.Vector3();
  function panBy(dx, dz) { // dx to the right of the screen, dz into the screen, in world units
    camera.getWorldDirection(fwd); fwd.y = 0; fwd.normalize();
    side.crossVectors(fwd, camera.up).normalize();
    const d = side.multiplyScalar(dx).addScaledVector(fwd, dz);
    controls.target.add(d); camera.position.add(d);
    clampTarget();
  }
  function rotateBy(angle) {
    offset.copy(camera.position).sub(controls.target).applyAxisAngle(camera.up, angle);
    camera.position.copy(controls.target).add(offset);
  }
  function zoomBy(f) {
    offset.copy(camera.position).sub(controls.target);
    const d = THREE.MathUtils.clamp(offset.length() * f, controls.minDistance, controls.maxDistance);
    camera.position.copy(controls.target).add(offset.setLength(d));
  }
  // a trackpad sends small pixel steps, often sideways: that scrolls the map. A pinch (ctrl) or a mouse
  // wheel's big steps fall through to OrbitControls, which zooms toward the cursor.
  el.addEventListener('wheel', e => {
    if (e.target !== renderer.domElement) return;
    const mouseWheel = e.deltaMode !== 0 || (e.deltaX === 0 && Math.abs(e.deltaY) >= 40 && Number.isInteger(e.deltaY));
    if (e.ctrlKey || mouseWheel) return;
    e.preventDefault(); e.stopPropagation();
    const k = camera.position.distanceTo(controls.target) * 0.0011;
    panBy(e.deltaX * k, -e.deltaY * k);
    byHand();
  }, { capture: true, passive: false });
  // keys: WASD or arrows move, Q/E turn, +/- zoom
  const keys = new Set();
  const KEYS = ['w', 'a', 's', 'd', 'q', 'e', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', '=', '+', '-'];
  addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    if (!KEYS.includes(k) || e.metaKey || e.ctrlKey || e.target.closest?.('input, textarea')) return;
    keys.add(k); byHand(); e.preventDefault();
  });
  addEventListener('keyup', e => keys.delete(e.key.toLowerCase()));
  addEventListener('blur', () => keys.clear());
  // the on-screen buttons turn or zoom in a short smooth step
  const nudge = { turn: 0, zoom: 0 };
  function moveByKeys(dt) {
    if (keys.size) {
      const speed = camera.position.distanceTo(controls.target) * 0.45 * dt;
      const has = (...ks) => ks.some(k => keys.has(k));
      const dx = (has('d', 'arrowright') ? 1 : 0) - (has('a', 'arrowleft') ? 1 : 0);
      const dz = (has('w', 'arrowup') ? 1 : 0) - (has('s', 'arrowdown') ? 1 : 0);
      if (dx || dz) panBy(dx * speed, dz * speed);
      if (has('q')) rotateBy(dt * 1.4);
      if (has('e')) rotateBy(-dt * 1.4);
      if (has('=', '+')) zoomBy(1 - dt * 1.2);
      if (has('-')) zoomBy(1 + dt * 1.2);
    }
    if (nudge.turn) { const a = Math.sign(nudge.turn) * Math.min(Math.abs(nudge.turn), dt * 3); rotateBy(a); nudge.turn -= a; }
    if (nudge.zoom) { const z = Math.sign(nudge.zoom) * Math.min(Math.abs(nudge.zoom), dt * 1.5); zoomBy(1 + z); nudge.zoom -= z; }
  }
  let flight = null;
  const tour = { on: false, paused: false, step: -1 };
  function byHand() { flight = null; if (tour.on) endTour(); }
  function endTour() { tour.on = false; tour.paused = false; onTour?.(null); stopMarks.forEach(sm => sm.el.classList.remove('on')); }
  controls.addEventListener('start', byHand);

  // materials: three-step toon shading so the KayKit models and the people look like one drawing
  const grad = new THREE.DataTexture(new Uint8Array([150, 150, 150, 255, 215, 215, 215, 255, 255, 255, 255, 255]), 3, 1);
  grad.minFilter = grad.magFilter = THREE.NearestFilter;
  grad.needsUpdate = true;
  const mats = {};
  const toon = c => mats[c] ||= new THREE.MeshToonMaterial({ color: c, gradientMap: grad });
  const flat = (c, o = 1) => {
    const m = new THREE.MeshBasicMaterial({ color: c, transparent: o < 1, opacity: o });
    m.userData.outlineParameters = { visible: false };
    return m;
  };
  const glass = new THREE.MeshBasicMaterial({ color: '#cfe8ff', transparent: true, opacity: 0.3, depthWrite: false });
  glass.userData.outlineParameters = { thickness: 0.002 };
  const geos = {};
  const geo = (key, make) => geos[key] ||= make();
  const mesh = (g, mat, x = 0, y = 0, z = 0) => {
    const m = new THREE.Mesh(g, typeof mat === 'string' ? toon(mat) : mat);
    m.position.set(x, y, z);
    m.castShadow = m.receiveShadow = true;
    return m;
  };
  const box = (w, h, d, c, x, y, z) => mesh(geo(`b${w},${h},${d}`, () => new THREE.BoxGeometry(w, h, d)), c, x, y, z);
  const sphere = (r, c, x, y, z) => mesh(geo(`s${r}`, () => new THREE.SphereGeometry(r, 20, 14)), c, x, y, z);
  const cyl = (rt, rb, h, c, x, y, z, seg = 20) => mesh(geo(`c${rt},${rb},${h},${seg}`, () => new THREE.CylinderGeometry(rt, rb, h, seg)), c, x, y, z);
  const capsule = (r, l, c, x, y, z) => mesh(geo(`p${r},${l}`, () => new THREE.CapsuleGeometry(r, l, 4, 10)), c, x, y, z);

  scene.add(new THREE.HemisphereLight('#ffffff', '#efe2c6', 1.9));
  const sun = new THREE.DirectionalLight('#fff7ea', 2.1);
  sun.position.set(14, 30, 18);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -30, right: 30, top: 30, bottom: -30, near: 1, far: 90 });
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);

  // ── load the KayKit models once; every copy shares geometry and material ──
  const loader = new GLTFLoader();
  const toonOf = new Map();
  const templates = {};
  await Promise.all(MODELS.map(name => new Promise((resolve, reject) => {
    loader.load(KAYKIT + name + '.gltf', gltf => {
      const root = gltf.scene;
      root.traverse(o => {
        if (!o.isMesh) return;
        const m = o.material;
        if (!toonOf.has(m)) toonOf.set(m, new THREE.MeshToonMaterial({ map: m.map, color: m.color, gradientMap: grad }));
        o.material = toonOf.get(m);
        o.castShadow = o.receiveShadow = true;
      });
      if (!WALL_MOUNTED.has(name)) {
        const b = new THREE.Box3().setFromObject(root);
        root.position.y -= b.min.y;
      }
      const holder = new THREE.Group(); holder.add(root);
      templates[name] = holder;
      resolve();
    }, undefined, reject);
  })));
  const kk = (name, x, z, rot = 0, y = 0, s = 1) => {
    const o = templates[name].clone(true);
    o.position.set(x, y, z); o.rotation.y = rot; o.scale.setScalar(s);
    return o;
  };

  // ── text on canvases ──
  function canvasTex(w, h, draw) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }
  function fitText(g, text, size, maxW) {
    g.font = `900 ${size}px ${FONT}`;
    const k = Math.min(1, maxW / g.measureText(text).width);
    g.font = `900 ${size * k}px ${FONT}`;
  }
  const textMat = t => { const m = flat(W); m.map = t; m.transparent = true; return m; };
  function board(text, w, h, bg, fg, sub) {
    const g = new THREE.Group();
    g.add(box(w, h, 0.1, bg, 0, 0, 0));
    const t = canvasTex(512, Math.max(64, Math.round(512 * h / w)), (c, cw, ch) => {
      c.fillStyle = fg; c.textAlign = 'center'; c.textBaseline = 'middle';
      fitText(c, text, ch * (sub ? 0.4 : 0.56), cw - 40);
      c.fillText(text, cw / 2, sub ? ch * 0.38 : ch / 2);
      if (sub) { fitText(c, sub, ch * 0.2, cw - 40); c.fillText(sub, cw / 2, ch * 0.76); }
    });
    const p = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.94, h * 0.88), textMat(t));
    p.position.z = 0.056; g.add(p);
    return g;
  }
  // signs in pairs: the bun-shop words and the Blotz words; the switch shows one of them
  const SWAP = [];
  function pair(make, parent = scene) { const a = make(0), b = make(1); parent.add(a, b); SWAP.push([a, b]); }
  function applyMode() { for (const [a, b] of SWAP) { a.visible = MODE === 0; b.visible = MODE === 1; } }

  // ── floors ──
  const shapeOf = pts => new THREE.Shape(pts.map(([x, z]) => new THREE.Vector2(x, -z)));
  const floorTex = (draw, size, rep) => {
    const t = canvasTex(size, size, draw);
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep, rep);
    return t;
  };
  const tex = {
    tiles: floorTex((g, s) => { g.fillStyle = '#fbf6ea'; g.fillRect(0, 0, s, s); g.fillStyle = '#d9ecef'; g.fillRect(0, 0, s / 2, s / 2); g.fillRect(s / 2, s / 2, s / 2, s / 2); g.strokeStyle = '#c8dfe2'; g.lineWidth = 2; g.strokeRect(0, 0, s, s); }, 128, 0.5),
    planks: floorTex((g, s) => {
      g.fillStyle = '#f2d4a4'; g.fillRect(0, 0, s, s); g.strokeStyle = '#d9b37c'; g.lineWidth = 3;
      for (let i = 0; i <= 4; i++) { g.beginPath(); g.moveTo(0, i * s / 4); g.lineTo(s, i * s / 4); g.stroke(); }
      for (let i = 0; i < 4; i++) { const x = (i % 2) * s / 2 + s / 4; g.beginPath(); g.moveTo(x, i * s / 4); g.lineTo(x, (i + 1) * s / 4); g.stroke(); }
    }, 256, 0.25),
    carpet: floorTex((g, s) => { g.fillStyle = '#e4dcfb'; g.fillRect(0, 0, s, s); g.fillStyle = '#d6cbf6'; for (let i = 0; i < 8; i++) g.fillRect(0, i * s / 8, s, s / 32); }, 128, 0.25),
    lab: floorTex((g, s) => { g.fillStyle = '#e8f3ff'; g.fillRect(0, 0, s, s); g.strokeStyle = '#c4dcf5'; g.lineWidth = 3; g.strokeRect(1, 1, s - 2, s - 2); }, 64, 0.5),
    school: floorTex((g, s) => { g.fillStyle = '#eef4fb'; g.fillRect(0, 0, s, s); g.strokeStyle = '#d2e2f4'; g.lineWidth = 3; for (let i = 0; i <= 3; i++) { g.beginPath(); g.moveTo(i * s / 3, 0); g.lineTo(i * s / 3, s); g.stroke(); } }, 128, 0.3),
    meet: floorTex((g, s) => { g.fillStyle = '#dff3f1'; g.fillRect(0, 0, s, s); g.fillStyle = '#cdeae6'; for (let i = 0; i < 4; i++) g.fillRect(0, i * s / 4, s, s / 8); }, 128, 0.25),
    rugDesign: floorTex((g, s) => { g.fillStyle = '#fde3e3'; g.fillRect(0, 0, s, s); g.fillStyle = '#fbd2d2'; for (let i = 0; i < 4; i++) g.fillRect(i * s / 4, 0, s / 8, s); }, 128, 0.3),
    patio: floorTex((g, s) => { g.fillStyle = '#fff1cf'; g.fillRect(0, 0, s, s); g.strokeStyle = '#f5dc9f'; g.lineWidth = 4; g.strokeRect(2, 2, s - 4, s - 4); }, 128, 0.4),
    street: floorTex((g, s) => { g.fillStyle = '#e9e6df'; g.fillRect(0, 0, s, s); g.strokeStyle = '#d5d0c5'; g.lineWidth = 3; for (const [x, y] of [[1, 1], [s / 2, 1], [1, s / 2], [s / 2, s / 2]]) g.strokeRect(x, y, s / 2 - 1, s / 2 - 1); }, 128, 0.3),
  };
  for (const t of Object.values(tex)) t.colorSpace = THREE.SRGBColorSpace;
  const slab = mesh(new THREE.ExtrudeGeometry(shapeOf(OUTLINE), { depth: 0.6, bevelEnabled: false }), '#c98a45');
  slab.rotation.x = -Math.PI / 2; slab.position.y = -0.6; slab.castShadow = false;
  scene.add(slab);
  tex.street.repeat.set(64 * 0.3, 9 * 0.3);
  const street = mesh(new THREE.PlaneGeometry(64, 9), new THREE.MeshToonMaterial({ map: tex.street, gradientMap: grad }));
  street.rotation.x = -Math.PI / 2; street.position.set(-2, -0.58, 14.5); street.castShadow = false;
  const kerb = box(64, 0.25, 0.5, '#d5d0c5', -2, -0.5, 19); kerb.castShadow = false; scene.add(kerb);
  const groups = {};
  const group = k => groups[k] ||= (() => { const g = new THREE.Group(); g.userData.k = k; scene.add(g); return g; })();
  // each floor belongs to a team (dept) or to nobody; picking「我是…」dims the floors that aren't yours
  const floors = [];
  const roomFloor = (pts, t, k, dept = null, y = 0.005) => {
    const m = mesh(new THREE.ShapeGeometry(shapeOf(pts)), new THREE.MeshToonMaterial({ map: t, gradientMap: grad }));
    m.rotation.x = -Math.PI / 2; m.position.y = y; m.castShadow = false;
    m.material.userData.outlineParameters = { visible: false };
    group(k).add(m);
    floors.push({ m, dept, lit: 1 });
  };
  roomFloor(ROOMS.guest, tex.planks, 'mkt', 'mkt');
  roomFloor(ROOMS.mkt, tex.patio, 'mkt', 'mkt', -0.565);
  group('mkt').add(street); floors.push({ m: street, dept: 'mkt', lit: 1 });
  roomFloor(ROOMS.pm, tex.carpet, 'pm', 'pm');
  roomFloor(ROOMS.dev, tex.tiles, 'dev', 'dev');
  roomFloor(ROOMS.ai, tex.lab, 'ai', 'dev');
  roomFloor(ROOMS.learn, tex.school, 'learn', 'dev');
  roomFloor(ROOMS.meet, tex.meet, 'meet', null, 0.012);
  roomFloor(ROOMS.design, tex.rugDesign, 'design', 'design');
  // a band of the team's colour just inside the edge of its area
  const COLOR = Object.fromEntries(DEPTS.map(d => [d.id, d.color]));
  const edges = [];
  function inset(pts, d) {
    let area = 0;
    pts.forEach(([x0, z0], i) => { const [x1, z1] = pts[(i + 1) % pts.length]; area += x0 * z1 - x1 * z0; });
    const sgn = Math.sign(area);
    const lines = pts.map(([x0, z0], i) => {
      const [x1, z1] = pts[(i + 1) % pts.length], len = Math.hypot(x1 - x0, z1 - z0);
      const nx = -sgn * (z1 - z0) / len, nz = sgn * (x1 - x0) / len;
      return { x: x0 + nx * d, z: z0 + nz * d, dx: (x1 - x0) / len, dz: (z1 - z0) / len };
    });
    return lines.map((b, i) => {
      const a = lines[(i + lines.length - 1) % lines.length], den = a.dx * b.dz - a.dz * b.dx;
      if (Math.abs(den) < 1e-6) return [b.x, b.z];
      const t = ((b.x - a.x) * b.dz - (b.z - a.z) * b.dx) / den;
      return [a.x + a.dx * t, a.z + a.dz * t];
    });
  }
  function teamEdge(pts, dept, y = 0.03) {
    const mat = flat(COLOR[dept], 1); mat.transparent = true;
    const ring = inset(pts, 0.42);
    ring.forEach(([x0, z0], i) => {
      const [x1, z1] = ring[(i + 1) % ring.length], len = Math.hypot(x1 - x0, z1 - z0);
      const b = new THREE.Mesh(geo(`edge${len.toFixed(2)}`, () => new THREE.BoxGeometry(len + 0.26, 0.02, 0.26)), mat);
      b.position.set((x0 + x1) / 2, y, (z0 + z1) / 2); b.rotation.y = -Math.atan2(z1 - z0, x1 - x0);
      scene.add(b);
    });
    edges.push({ mat, dept });
  }
  teamEdge(ROOMS.pm, 'pm');
  teamEdge([[-8, -16], [12, -16], [16, -12], [16, -2], [-8, -2]], 'dev'); // kitchen, AI lab and classroom are one team
  teamEdge(ROOMS.design, 'design', 0.035);
  teamEdge(ROOMS.guest, 'mkt');
  teamEdge(ROOMS.mkt, 'mkt', -0.545);

  // ── outside walls: they sink when they would block the view, like a doll's house ──
  const walls = [];
  const WALL_H = 3.2;
  OUTLINE.forEach((a, i) => {
    const b = OUTLINE[(i + 1) % OUTLINE.length];
    const dx = b[0] - a[0], dz = b[1] - a[1], len = Math.hypot(dx, dz);
    const g = new THREE.Group();
    g.position.set((a[0] + b[0]) / 2, 0, (a[1] + b[1]) / 2);
    g.rotation.y = -Math.atan2(dz, dx);
    const normal = new THREE.Vector3(-dz, 0, dx).normalize(); // points out of the building
    if (SHOPFRONT.has(i)) {
      if (i === 2) { // the entrance: two glass doors
        for (const s of [-1, 1]) {
          const door = new THREE.Group(); door.position.set(s * 1.5, 0, 0);
          door.add(box(0.12, 2.8, 0.14, '#3b3f5c', -s * 1.4, 1.4, 0), box(0.12, 2.8, 0.14, '#3b3f5c', s * 0.1, 1.4, 0), box(1.6, 0.12, 0.14, '#3b3f5c', -s * 0.65, 2.8, 0));
          const pane = new THREE.Mesh(geo('door-pane', () => new THREE.BoxGeometry(1.4, 2.6, 0.06)), glass); pane.position.set(-s * 0.65, 1.4, 0); door.add(pane);
          door.add(box(0.08, 0.6, 0.12, '#f6b73c', -s * 0.05, 1.3, 0.12));
          g.add(door);
        }
      } else {
        g.add(box(len, 0.8, 0.4, '#e9b48a', 0, 0.4, 0));
        const pane = new THREE.Mesh(new THREE.BoxGeometry(len - 0.3, 2.2, 0.06), glass); pane.position.set(0, 1.9, 0); g.add(pane);
        g.add(box(len, 0.16, 0.3, '#3b3f5c', 0, 3.0, 0));
        const n = Math.max(1, Math.round(len / 2.5));
        for (let k = 0; k <= n; k++) g.add(box(0.14, 2.3, 0.18, '#3b3f5c', -len / 2 + k * len / n, 1.95, 0));
      }
    } else {
      g.add(box(len + 0.4, WALL_H, 0.4, '#fbf1dc', 0, WALL_H / 2, 0));
      g.add(box(len + 0.42, 0.5, 0.44, '#e9b48a', 0, 0.25, 0));
      g.add(box(len + 0.5, 0.18, 0.52, '#c98a45', 0, WALL_H + 0.05, 0));
    }
    scene.add(g);
    walls.push({ g, normal, h: 1, low: i === 2 ? 1 : SHOPFRONT.has(i) ? 0.4 : 0.16 });
  });
  const posts = OUTLINE.map(([x, z]) => { const p = cyl(0.32, 0.32, WALL_H + 0.3, '#e9b48a', x, (WALL_H + 0.3) / 2, z, 12); scene.add(p); return p; });
  // the entrance: awning and shop sign over the doors
  {
    const g = group('mkt');
    const aw = new THREE.Group(); aw.position.set(0, 3.25, 11.4); aw.rotation.x = 0.35;
    for (let i = 0; i < 8; i++) aw.add(box(1.0, 0.1, 2.0, i % 2 ? W : '#f56767', -3.5 + i, 0, 0));
    g.add(aw);
    pair(m => { const s = board(['BlotzTask 包子铺', 'BlotzTask'][m], 6.5, 1.0, INK, W); s.position.set(0, 4.25, 10.55); return s; }, g);
    for (const x of [-4, 4]) g.add(cyl(0.12, 0.12, 4.3, '#3b3f5c', x, 2.15, 10.7, 10));
    // three poster stands on the pavement, each made up like one of our posts on that platform.
    // The words are the website's own (hero title and sub); the Blotz icon is drawn in once it has loaded.
    const rr = (c, x, y, w, h, r) => { c.beginPath(); c.roundRect(x, y, w, h, r); };
    const bun = (c, x, y, r) => {
      c.fillStyle = '#f2c27b'; c.strokeStyle = INK; c.lineWidth = 5;
      c.beginPath(); c.ellipse(x, y, r, r * 0.78, 0, 0, 7); c.fill(); c.stroke();
      c.lineWidth = 4; for (const a of [-1, 0, 1]) { c.beginPath(); c.moveTo(x + a * r * 0.08, y - r * 0.6); c.quadraticCurveTo(x + a * r * 0.42, y - r * 0.5, x + a * r * 0.5, y - r * 0.28); c.stroke(); }
      c.fillStyle = '#e8ad5c'; c.beginPath(); c.arc(x, y - r * 0.62, r * 0.1, 0, 7); c.fill(); c.stroke();
      c.fillStyle = INK; for (const sx of [-1, 1]) { c.beginPath(); c.arc(x + sx * r * 0.32, y + r * 0.22, r * 0.07, 0, 7); c.fill(); }
    };
    const avatar = (c, x, y, r, logo) => {
      c.save(); c.beginPath(); c.arc(x, y, r, 0, 7); c.fillStyle = '#9ad513'; c.fill();
      if (logo) { c.clip(); c.drawImage(logo, x - r, y - r, r * 2, r * 2); }
      c.restore();
    };
    const POSTS = {
      小红书: (c, w, h, logo) => {
        c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = W; c.fillRect(0, 0, w, h);
        c.fillStyle = '#fff4da'; c.fillRect(0, 0, w, 250); bun(c, w / 2, 120, 72);
        c.fillStyle = INK; c.textAlign = 'center'; c.textBaseline = 'middle'; fitText(c, '你的 AI 生活规划师', 28, w - 30); c.fillText('你的 AI 生活规划师', w / 2, 222);
        c.fillStyle = '#ff2442'; rr(c, 14, 14, 92, 34, 17); c.fill(); c.fillStyle = W; c.font = `900 20px ${FONT}`; c.fillText('小红书', 60, 32);
        c.fillStyle = INK; c.textAlign = 'left'; fitText(c, '用语音记下要做的事', 26, w - 36); c.fillText('用语音记下要做的事', 18, 288);
        avatar(c, 34, 352, 18, logo); c.font = `800 20px ${FONT}`; c.fillStyle = '#5b6078'; c.fillText('BlotzTask', 60, 353);
        c.strokeStyle = '#5b6078'; c.lineWidth = 3; c.beginPath(); c.moveTo(262, 362); c.bezierCurveTo(240, 346, 244, 334, 254, 336); c.bezierCurveTo(259, 337, 262, 342, 262, 344); c.bezierCurveTo(262, 342, 265, 337, 270, 336); c.bezierCurveTo(280, 334, 284, 346, 262, 362); c.stroke();
      },
      官网: (c, w, h, logo) => {
        c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = '#f4f7ee'; c.fillRect(0, 0, w, h);
        c.fillStyle = '#e3e5ec'; c.fillRect(0, 0, w, 46);
        ['#f56767', '#f6b73c', '#9ad513'].forEach((col, i) => { c.fillStyle = col; c.beginPath(); c.arc(20 + i * 20, 23, 6, 0, 7); c.fill(); });
        c.fillStyle = W; rr(c, 82, 11, w - 96, 24, 12); c.fill(); c.fillStyle = '#5b6078'; c.font = `800 16px ${FONT}`; c.textBaseline = 'middle'; c.fillText('blotztask.com', 96, 24);
        if (logo) { c.save(); rr(c, w / 2 - 56, 76, 112, 112, 26); c.clip(); c.drawImage(logo, w / 2 - 56, 76, 112, 112); c.restore(); } else bun(c, w / 2, 132, 50);
        c.fillStyle = INK; c.textAlign = 'center'; c.font = `900 34px ${FONT}`; c.fillText('BlotzTask', w / 2, 224);
        fitText(c, '你的 AI 生活规划师', 26, w - 40); c.fillText('你的 AI 生活规划师', w / 2, 264);
        c.fillStyle = '#9ad513'; rr(c, w / 2 - 80, 304, 160, 50, 25); c.fill(); c.strokeStyle = INK; c.lineWidth = 3; c.stroke();
        c.fillStyle = INK; c.font = `900 22px ${FONT}`; c.fillText('下载 App', w / 2, 330);
      },
      Instagram: (c, w, h, logo) => {
        c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = W; c.fillRect(0, 0, w, h);
        avatar(c, 30, 28, 18, logo); c.fillStyle = INK; c.font = `900 20px ${FONT}`; c.textBaseline = 'middle'; c.textAlign = 'left'; c.fillText('BlotzTask', 58, 29);
        c.strokeStyle = '#c13584'; c.lineWidth = 3.5; rr(c, w - 44, 14, 28, 28, 8); c.stroke(); c.beginPath(); c.arc(w - 30, 28, 7, 0, 7); c.stroke();
        const g = c.createLinearGradient(0, 56, w, 356); g.addColorStop(0, '#feda75'); g.addColorStop(0.5, '#fa7e1e'); g.addColorStop(1, '#d62976');
        c.fillStyle = g; c.fillRect(0, 56, w, 290); bun(c, w / 2, 180, 70);
        c.fillStyle = W; c.textAlign = 'center'; fitText(c, '你的 AI 生活规划师', 26, w - 40); c.fillText('你的 AI 生活规划师', w / 2, 300);
        c.strokeStyle = INK; c.lineWidth = 3.5;
        c.beginPath(); c.moveTo(34, 386); c.bezierCurveTo(12, 370, 16, 356, 26, 358); c.bezierCurveTo(31, 359, 34, 364, 34, 366); c.bezierCurveTo(34, 364, 37, 359, 42, 358); c.bezierCurveTo(52, 356, 56, 370, 34, 386); c.stroke();
        c.beginPath(); c.arc(84, 370, 13, 0.6, Math.PI * 2.3); c.lineTo(73, 386); c.closePath(); c.stroke();
        c.beginPath(); c.moveTo(112, 358); c.lineTo(142, 370); c.lineTo(112, 384); c.lineTo(118, 370); c.closePath(); c.stroke();
      },
    };
    const posters = [];
    [['小红书', -12.4, 0.5], ['官网', -9.2, 0.45], ['Instagram', -6.0, 0.4]].forEach(([t, x, rot]) => {
      const st = new THREE.Group(); st.position.set(x, -0.58, 13.0); st.rotation.y = rot;
      st.add(box(1.9, 0.12, 0.6, '#3b3f5c', 0, 0.06, 0));
      for (const dx of [-0.82, 0.82]) st.add(box(0.08, 2.9, 0.08, '#3b3f5c', dx, 1.45, 0));
      st.add(box(1.76, 2.3, 0.06, '#3b3f5c', 0, 1.75, 0));
      const tex = canvasTex(300, 400, (c, w, h) => POSTS[t](c, w, h));
      const pic = new THREE.Mesh(new THREE.PlaneGeometry(1.66, 2.2), textMat(tex)); pic.position.set(0, 1.75, 0.035); st.add(pic);
      g.add(st); posters.push({ t, tex });
    });
    const blotzIcon = new Image();
    blotzIcon.onload = () => posters.forEach(({ t, tex }) => { POSTS[t](tex.image.getContext('2d'), tex.image.width, tex.image.height, blotzIcon); tex.needsUpdate = true; });
    blotzIcon.src = '/app/icon.png';
    for (const x of [7.5, 9.5, 13.5]) { // planters
      g.add(cyl(0.6, 0.5, 0.7, '#c98a45', x, -0.23, 12.0, 14));
      const bush = sphere(0.75, '#7cc04a', x, 0.55, 12.0); bush.scale.y = 0.8; g.add(bush);
    }
  }

  // ── low inside walls and glass, so you can see over them ──
  const lowWall = (x0, z0, x1, z1, h = 1.1) => {
    const len = Math.hypot(x1 - x0, z1 - z0), rot = -Math.atan2(z1 - z0, x1 - x0);
    const w = box(len, h, 0.3, '#fbf1dc', (x0 + x1) / 2, h / 2, (z0 + z1) / 2); w.rotation.y = rot; scene.add(w);
    const cap = box(len + 0.1, 0.12, 0.38, '#e9b48a', (x0 + x1) / 2, h + 0.06, (z0 + z1) / 2); cap.rotation.y = rot; scene.add(cap);
  };
  const glassWall = (x0, z0, x1, z1, trim = '#3486F3') => {
    const len = Math.hypot(x1 - x0, z1 - z0), rot = -Math.atan2(z1 - z0, x1 - x0);
    const g = new THREE.Mesh(new THREE.BoxGeometry(len, 2.6, 0.08), glass); g.position.set((x0 + x1) / 2, 1.5, (z0 + z1) / 2); g.rotation.y = rot; scene.add(g);
    const base = box(len, 0.2, 0.3, trim, (x0 + x1) / 2, 0.1, (z0 + z1) / 2); base.rotation.y = rot; scene.add(base);
    const top = box(len, 0.14, 0.2, trim, (x0 + x1) / 2, 2.85, (z0 + z1) / 2); top.rotation.y = rot; scene.add(top);
  };
  lowWall(-8, -16, -8, -7.6); lowWall(-8, -6.2, -8, -2);          // design and meeting rooms | kitchen, door at z -7.6..-6.2
  lowWall(-13.5, -2, -16.5, -2); lowWall(-16.5, -2, -17.56, -1.33); lowWall(-18.92, -0.48, -20, 0.2); // research room | hall: slanted, door in the slant
  MEET_ARC.slice(1).forEach(([x, z], i) => lowWall(MEET_ARC[i][0], MEET_ARC[i][1], x, z));           // meeting room | hall: rounded
  lowWall(-13.5, -16, -13.5, -7.6); lowWall(-13.5, -6.2, -13.5, -2); // research room | design and meeting rooms, door at z -7.6..-6.2
  lowWall(-13.5, -8.2, -8, -10);                                   // design room | meeting room: slanted
  lowWall(6, -9, 6, -5.5); lowWall(6, -3.5, 6, -2);                // classroom | kitchen, door at z -5.5..-3.5
  lowWall(6, -2, 10, -2); lowWall(12, -2, 16, -2);                 // classroom | hall, door at x 10..12
  glassWall(6, -16, 6, -10.5);                                     // AI lab | kitchen, door at z -10.5..-9
  glassWall(6, -9, 16, -7);                                        // AI lab | classroom: slanted

  // ── the people: chibi cooks who each do their own job ──
  const ink = flat(INK), blush = flat('#f58fa8', 0.7);
  const SKIN = ['#f6d2b5', '#eec4a0', '#f9dcc4', '#e3b08a'];
  const HAIR = ['#3b2a20', '#1e2140', '#6b4426', '#2b2b2b', '#8a5a3a'];
  const sparks = [], kanban = [];
  const HATS = {
    design: () => { const g = new THREE.Group(); const b = cyl(0.4, 0.44, 0.1, '#f56767', 0.06, 0.84, 0, 28); b.rotation.z = -0.22; g.add(b, sphere(0.05, '#f56767', 0.03, 0.93, 0)); return g; },
    pm: () => { const g = new THREE.Group(); const c = mesh(geo('cap', () => new THREE.SphereGeometry(0.5, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2)), '#8b6ef6', 0, 0.66, 0); c.scale.y = 0.7; g.add(c, sphere(0.08, INK, 0, 1.02, 0)); return g; },
    mkt: () => { const g = new THREE.Group(); const sc = mesh(geo('scarf', () => new THREE.TorusGeometry(0.5, 0.08, 10, 36)), '#f6b73c', 0, 0.68, 0); sc.rotation.x = Math.PI / 2; g.add(sc, sphere(0.11, '#f6b73c', -0.48, 0.7, -0.18)); return g; },
    chef: () => { const g = new THREE.Group(); g.add(cyl(0.36, 0.38, 0.3, W, 0, 0.92, 0, 22)); const p = sphere(0.44, W, 0, 1.16, 0); p.scale.y = 0.62; g.add(p); return g; },
    ai: () => { const g = new THREE.Group(); g.add(cyl(0.36, 0.38, 0.6, W, 0, 1.06, 0, 22)); const p = sphere(0.46, W, 0, 1.44, 0); p.scale.y = 0.6; g.add(p); const s = mesh(geo('spark', () => new THREE.OctahedronGeometry(0.15)), '#f6b73c', 0.8, 1.3, 0); g.add(s); sparks.push(s); return g; },
    lead: () => { const g = new THREE.Group(); for (let i = 0; i < 3; i++) g.add(cyl(0.44 - i * 0.02, 0.44 - i * 0.02, 0.16, '#e3a65c', 0, 0.88 + i * 0.17, 0, 22)); g.add(mesh(geo('lid', () => new THREE.ConeGeometry(0.44, 0.22, 22)), '#e3a65c', 0, 1.48, 0)); return g; },
    teacher: () => { const g = new THREE.Group(); g.add(cyl(0.36, 0.38, 0.18, INK, 0, 0.84, 0)); const t = box(0.95, 0.06, 0.95, INK, 0, 0.96, 0); t.rotation.y = Math.PI / 4; g.add(t, sphere(0.07, '#3486F3', 0.45, 0.88, 0)); return g; },
  };
  const people = [];
  function makePerson({ shirt = W, pants = '#3b3f5c', apron = false, hat = null, skin = 0, hair = 0, s = 1, act = 'idle', k = null }) {
    const g = new THREE.Group(), body = new THREE.Group();
    g.add(body);
    const legs = [], arms = [];
    for (const sx of [-1, 1]) {
      const leg = new THREE.Group(); leg.position.set(sx * 0.12, 0.44, 0);
      leg.add(capsule(0.085, 0.24, pants, 0, -0.2, 0), box(0.16, 0.08, 0.24, INK, 0, -0.4, 0.04));
      body.add(leg); legs.push(leg);
    }
    const torso = new THREE.Group(); torso.position.y = 0.5; body.add(torso);
    torso.add(capsule(0.27, 0.3, shirt, 0, 0.3, 0));
    if (apron) torso.add(box(0.38, 0.44, 0.04, '#8fbaf7', 0, 0.24, 0.25));
    for (const sx of [-1, 1]) {
      const arm = new THREE.Group(); arm.position.set(sx * 0.33, 0.52, 0);
      arm.add(capsule(0.07, 0.26, shirt, 0, -0.18, 0), sphere(0.075, SKIN[skin], 0, -0.38, 0));
      torso.add(arm); arms.push(arm);
    }
    const head = new THREE.Group(); head.position.y = 0.88; torso.add(head);
    head.add(mesh(geo('head', () => new THREE.SphereGeometry(0.32, 24, 18)), SKIN[skin]));
    const hairCap = mesh(geo('hair', () => new THREE.SphereGeometry(0.335, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.56)), HAIR[hair], 0, 0.01, -0.01);
    hairCap.rotation.x = -0.5; head.add(hairCap);
    for (const sx of [-1, 1]) {
      const e = new THREE.Mesh(geo('eye', () => new THREE.SphereGeometry(0.038, 8, 6)), ink); e.position.set(sx * 0.11, 0, 0.3); head.add(e);
      const c = new THREE.Mesh(geo('cheek', () => new THREE.CircleGeometry(0.05, 12)), blush); c.position.set(sx * 0.18, -0.08, 0.265); c.rotation.y = sx * 0.55; head.add(c);
    }
    const mouth = new THREE.Mesh(geo('mouth', () => new THREE.TorusGeometry(0.045, 0.012, 6, 12, Math.PI)), ink);
    mouth.position.set(0, -0.1, 0.3); mouth.rotation.z = Math.PI; head.add(mouth);
    let hatObj = null;
    if (hat) { hatObj = HATS[hat](); hatObj.scale.setScalar(0.62); hatObj.position.y = -0.22; head.add(hatObj); }
    g.scale.setScalar(s * 1.45);
    g.userData = { k, parts: { body, torso, legs, arms, head, hat: hatObj }, act, phase: Math.random() * 6, seated: false };
    people.push(g);
    return g;
  }
  function seat(p) { p.userData.seated = true; for (const l of p.userData.parts.legs) l.rotation.x = -1.45; }
  // a thing held in front of the chest, attached to the torso so it moves with the person
  const hold = (p, obj, y = 0.25, z = 0.42) => { obj.position.set(0, y, z); p.userData.parts.torso.add(obj); return obj; };

  // what each kind of work looks like; arms[0] is the left arm, arms[1] the right
  const ACTS = {
    idle: (P, t) => { P.arms[0].rotation.x = P.arms[1].rotation.x = Math.sin(t * 1.5) * 0.05; },
    stir: (P, t) => { P.torso.rotation.x = 0.12; P.arms[1].rotation.x = -1.05 + Math.sin(t * 5) * 0.12; P.arms[1].rotation.z = 0.1 + Math.cos(t * 5) * 0.25; P.arms[0].rotation.x = -0.7; },
    knead: (P, t) => { P.torso.rotation.x = 0.18 + Math.sin(t * 6) * 0.05; P.arms[0].rotation.x = -1.1 + Math.sin(t * 6) * 0.3; P.arms[1].rotation.x = -1.1 - Math.sin(t * 6) * 0.3; },
    chop: (P, t) => { P.torso.rotation.x = 0.1; P.arms[1].rotation.x = -0.9 - Math.abs(Math.sin(t * 9)) * 0.6; P.arms[0].rotation.x = -0.8; },
    type: (P, t) => { P.head.rotation.x = 0.18; P.arms[0].rotation.x = -1.15 + Math.sin(t * 18) * 0.05; P.arms[1].rotation.x = -1.15 + Math.cos(t * 17) * 0.05; P.head.rotation.y = Math.sin(t * 0.7) * 0.15; },
    read: (P, t) => { P.arms[0].rotation.x = P.arms[1].rotation.x = -1.35; P.arms[0].rotation.z = -0.35; P.arms[1].rotation.z = 0.35; P.head.rotation.x = 0.12; P.head.rotation.y = Math.sin(t * 0.8) * 0.25; },
    paint: (P, t) => { P.arms[1].rotation.x = -1.6 + Math.sin(t * 3) * 0.35; P.arms[1].rotation.z = 0.2 + Math.cos(t * 3) * 0.2; P.arms[0].rotation.x = -0.5; P.head.rotation.y = Math.sin(t * 0.6) * 0.2; },
    point: (P, t) => { P.arms[1].rotation.x = -2.2 + Math.sin(t * 2.4) * 0.15; P.arms[0].rotation.z = -0.4; P.head.rotation.y = Math.sin(t * 0.9) * 0.3; },
    wave: (P, t) => { P.arms[1].rotation.z = 2.5 + Math.sin(t * 6) * 0.4; P.torso.rotation.z = Math.sin(t * 3) * 0.04; },
    teach: (P, t) => { const c = Math.sin(t * 0.7) > 0; P.arms[1].rotation.x = c ? -2.0 : -0.6 + Math.sin(t * 3) * 0.3; P.head.rotation.y = c ? -0.6 : 0.3; P.arms[0].rotation.x = -0.4; },
    write: (P, t) => { P.head.rotation.x = 0.25; P.arms[1].rotation.x = -1.0 + Math.sin(t * 9) * 0.06; P.arms[1].rotation.z = Math.sin(t * 4) * 0.12; P.arms[0].rotation.x = -0.9; },
    eat: (P, t) => { const u = Math.max(0, Math.sin(t * 1.3)); P.arms[1].rotation.x = -0.7 - u * 1.4; P.arms[0].rotation.x = -0.7; P.head.rotation.x = -u * 0.1; },
    talk: (P, t) => { P.arms[0].rotation.x = -0.6 + Math.sin(t * 3) * 0.3; P.arms[1].rotation.x = -0.4 + Math.cos(t * 2.5) * 0.3; P.head.rotation.z = Math.sin(t * 2) * 0.08; },
    carry: P => { P.arms[0].rotation.x = P.arms[1].rotation.x = -1.25; P.arms[0].rotation.z = 0.1; P.arms[1].rotation.z = -0.1; },
    drop: P => { P.arms[1].rotation.x = -1.4; },
  };
  function animatePerson(p, t, moving) {
    const P = p.userData.parts, ph = p.userData.phase;
    // stand straight, then put on the pose for the job
    P.torso.rotation.set(0, 0, 0); P.head.rotation.set(0, 0, 0);
    P.arms[0].rotation.set(0, 0, -0.12); P.arms[1].rotation.set(0, 0, 0.12);
    (ACTS[p.userData.act] || ACTS.idle)(P, t + ph);
    if (moving) {
      const a = Math.sin(t * 9) * 0.55;
      P.legs[0].rotation.x = a; P.legs[1].rotation.x = -a;
      if (p.userData.act !== 'carry') { P.arms[0].rotation.x = -a * 0.8; P.arms[1].rotation.x = a * 0.8; }
      P.body.position.y = Math.abs(Math.sin(t * 9)) * 0.05;
    } else if (!p.userData.seated) {
      P.legs[0].rotation.x = P.legs[1].rotation.x = 0;
      P.body.position.y = Math.sin((t + ph) * 2.2) * 0.012;
    }
  }

  const SHIRTS = ['#f8e9c6', '#a3c4f3', '#fb9e8c', '#b8e6c4', '#f7aac9', '#fde3b0', '#c9b8f6', '#86cfe8', '#ffd166', '#ffb4a2', '#a8dc3c'];
  let look = 0;
  const nextLook = () => { const i = look++; return { shirt: SHIRTS[i % SHIRTS.length], skin: i % 4, hair: (i * 3) % 5 }; };
  // a person at their work spot; leads (CAST) get their name
  function person(zone, x, z, faceY, act, opts = {}) {
    const name = (CAST[zone] || [])[opts.slot ?? -1] ?? null;
    const p = makePerson({ ...nextLook(), ...opts, act, k: name ? 'p:' + name : zone });
    p.position.set(x, 0, z); p.rotation.y = faceY;
    group(zone).add(p);
    if (name) nameTag(p, name);
    return p;
  }
  function nameTag(p, name) {
    const tag = document.createElement('button');
    tag.type = 'button'; tag.className = 'kz-name'; tag.textContent = name; tag.dataset.k = 'p:' + name;
    tag.addEventListener('click', () => onPick('p:' + name));
    const o = new CSS2DObject(tag); o.position.set(0, 2.3, 0); p.add(o);
  }
  const roomSign = (zone, words, x, z, rot = 0, y = 1.75) => {
    pair(m => {
      const s = board(words[m], Math.max(2.4, words[m].length * 0.5 + 0.8), 0.75, INK, W);
      s.position.set(x, y, z); s.rotation.y = rot;
      return s;
    }, group(zone));
  };

  // ── FRONT HALL: tables of guests eating buns, the feedback box, the waiter ──
  const hall = group('guest');
  // [x, z, guests]: two tables full, the others with one guest and an empty chair
  [[-15, 3.5, 2], [4.6, 4.4, 2], [11.8, 4.4, 1], [-8.6, 5.6, 1], [13.2, 0.8, 1], [8.4, 6.6, 1]].forEach(([tx, tz, n]) => {
    hall.add(kk('table_round_A', tx, tz, 0, 0, 0.75));
    hall.add(kk('plate', tx - 0.3, tz + 0.1, 0, 0.76), kk('food_ingredient_bun', tx - 0.3, tz + 0.1, 0.4, 0.84, 0.75));
    if (n > 1) hall.add(kk('plate', tx + 0.45, tz - 0.3, 0, 0.76), kk('food_ingredient_bun', tx + 0.45, tz - 0.3, 1.1, 0.84, 0.75));
    [[-1.9, 0.2], [1.9, -0.1]].forEach(([dx, dz], j) => {
      const faceY = Math.atan2(-dx, -dz);
      hall.add(kk('chair_A', tx + dx, tz + dz, faceY));
      if (j >= n) return;
      const p = makePerson({ ...nextLook(), act: j ? 'talk' : 'eat', k: 'guest', s: 0.9 });
      p.position.set(tx + dx * 0.95, 0, tz + dz); p.rotation.y = faceY; seat(p); hall.add(p);
    });
  });
  hall.add(kk('menu', 2.6, 9.6, Math.PI * 0.85), kk('menu', -2.6, 9.6, -Math.PI * 0.85));
  {
    const f = group('feedback');
    f.add(box(1.1, 1.3, 0.8, '#f56767', -15.6, 0.65, -1.45), box(0.6, 0.07, 0.12, INK, -15.6, 1.12, -1.03));
    pair(m => { const t = board(['意见箱', '用户反馈'][m], 1.0, 0.36, W, INK); t.position.set(-15.6, 0.55, -1.03); return t; }, f);
  }

  // ── THE LOOP: a numbered path on the floor, from a user's idea to a new version and back to the users ──
  // Control points; the ones marked with a step number are the stops in LOOP order.
  const LOOP_PTS = [
    [1.6, 2.4, 1], [-1.5, 2.4], [-6, 2.2], [-10.5, 1.9], [-13.6, 1.0],
    [-15.6, 0.1, 2], [-17.2, -0.2], [-18.2, -0.9], [-18.3, -2.6], [-17.8, -4.4],
    [-16.6, -6.8, 3], [-14.6, -7.0], [-13.5, -6.9], [-12.7, -7.2],
    [-12.0, -7.5, 4], [-10.7, -7.9],
    [-9.3, -8.1, 5], [-8.6, -7.2], [-7.0, -6.9],
    [-4.9, -6.4, 6], [-2.6, -6.9], [-0.9, -8.8],
    [-0.8, -11.6, 7], [0.6, -12.5], [3.6, -12.4], [4.7, -11.0], [4.8, -8.0],
    [3.8, -5.8, 8], [4.6, -3.6],
    [4.4, -1.0, 9], [3.9, 1.4],
  ];
  const loopCurve = new THREE.CatmullRomCurve3(LOOP_PTS.map(([x, z]) => new THREE.Vector3(x, 0.035, z)), true, 'centripetal');
  const loopLengths = loopCurve.getLengths(2000), loopLen = loopLengths[2000];
  const stopIdx = LOOP_PTS.map((p, i) => (p[2] ? i : -1)).filter(i => i >= 0);
  const stopU = stopIdx.map(i => loopLengths[Math.round(i / LOOP_PTS.length * 2000)] / loopLen);
  const teamOf = i => LOOP[i].who[0] || null; // the team doing step i
  const stopColor = i => COLOR[teamOf(i)] || '#5b6078';
  // which step an arrow is walking towards, from where it is on the loop
  const nextStop = u => { const i = stopU.findIndex(su => su > u + 1e-4); return i < 0 ? 0 : i; };
  const arrows = [], stopMarks = [];
  {
    const f = group('loop');
    const chevron = new THREE.Shape([[-0.38, -0.22], [0, 0.22], [0.38, -0.22], [0.2, -0.22], [0, 0.02], [-0.2, -0.22]].map(([x, y]) => new THREE.Vector2(x, y)));
    const arrowGeo = new THREE.ShapeGeometry(chevron).rotateX(Math.PI / 2);
    const arrowMats = LOOP.map((_, i) => { const m = flat(stopColor(i)); m.side = THREE.DoubleSide; m.transparent = true; return m; });
    const n = Math.round(loopLen / 1.5);
    for (let i = 0; i < n; i++) { const a = new THREE.Mesh(arrowGeo, arrowMats[0]); a.userData = { off: i / n, k: 'loop', mats: arrowMats }; f.add(a); arrows.push(a); }
    // the loop in four parts (用户 → 产品 → 开发 → 上线): a spot on the floor in the team's colour and the
    // part's number floating just above it, so the order reads from far away; clicking it plays from there
    STAGES.forEach((st, i) => {
      const p = loopCurve.getPointAt(stopU[st.at]);
      const mat = flat(COLOR[st.who]); mat.transparent = true;
      const spot = new THREE.Mesh(geo('stop-spot', () => new THREE.CircleGeometry(0.6, 28).rotateX(-Math.PI / 2)), mat);
      spot.position.set(p.x, 0.05, p.z); f.add(spot);
      const el = document.createElement('button');
      el.type = 'button'; el.className = 'kz-step'; el.textContent = String(i + 1);
      el.style.setProperty('--c', COLOR[st.who]);
      el.title = `${st.word}：${st.line}`; el.setAttribute('aria-label', `第 ${i + 1} 段，${st.word}：${st.line}`);
      el.addEventListener('click', () => onPick('tour:' + st.steps[0]));
      const o = new CSS2DObject(el); o.position.set(p.x, 0.9, p.z); scene.add(o);
      stopMarks.push({ mat, el, who: stageTeams(i) });
    });
  }
  // the runner who carries one idea round the loop: a note, then a PBI card, three cards, a bun, a tested bun
  const runner = makePerson({ shirt: W, pants: INK, skin: 2, hair: 1, act: 'idle', k: 'loop' });
  const carried = {
    note: box(0.3, 0.02, 0.36, '#f6b73c', 0, 0, 0),
    card: (() => { const g = new THREE.Group(); g.add(box(0.44, 0.02, 0.32, W, 0, 0, 0), box(0.44, 0.03, 0.08, '#3486F3', 0, 0.005, -0.12)); return g; })(),
    cards: (() => { const g = new THREE.Group(); [-0.2, 0, 0.2].forEach((x, i) => { const c = box(0.26, 0.02, 0.32, W, x, i * 0.025, 0); c.rotation.y = (i - 1) * 0.25; g.add(c, box(0.26, 0.03, 0.07, '#3486F3', x, i * 0.025 + 0.005, -0.12)); }); return g; })(),
    bun: (() => { const g = new THREE.Group(); g.add(cyl(0.3, 0.3, 0.04, W, 0, 0, 0, 18), kk('food_ingredient_bun', 0, 0.02, 0, 0.02, 0.6)); return g; })(),
    ok: (() => { const g = new THREE.Group(); g.add(cyl(0.3, 0.3, 0.04, W, 0, 0, 0, 18), kk('food_ingredient_bun', 0, 0.02, 0, 0.02, 0.6), cyl(0.015, 0.015, 0.5, INK, 0.2, 0.25, 0, 6), box(0.2, 0.13, 0.02, '#9ad513', 0.3, 0.42, 0)); return g; })(),
  };
  for (const o of Object.values(carried)) { hold(runner, o, 0.12, 0.5); o.visible = false; }
  scene.add(runner);
  // what the runner holds after each stop
  const AFTER = ['note', 'note', 'card', 'card', 'card', 'cards', 'bun', 'ok', null];
  const DWELL = 2.4, PACE = 4.2;
  const legs = stopU.map((u, i) => ((stopU[(i + 1) % stopU.length] - u + 1) % 1 || 1));
  const legT = legs.map(f => f * loopLen / PACE);
  const LOOP_T = legT.reduce((a, b) => a + b, 0) + DWELL * stopU.length;
  function loopAt(time) {
    let tt = ((time % LOOP_T) + LOOP_T) % LOOP_T;
    for (let i = 0; i < stopU.length; i++) {
      if (tt < DWELL) return { i, u: stopU[i], moving: false, f: tt / DWELL };
      tt -= DWELL;
      if (tt < legT[i]) return { i, u: (stopU[i] + legs[i] * (tt / legT[i])) % 1, moving: true, f: 1 };
      tt -= legT[i];
    }
    return { i: 0, u: stopU[0], moving: false, f: 0 };
  }

  // the marketing lead greets people at the door
  person('mkt', 1.3, 6.2, 0.35, 'wave', { hat: 'mkt', slot: 0 });
  // the waiter brings buns from the pass to the tables, on a tray
  const waiter = makePerson({ ...nextLook(), hat: 'mkt', act: 'carry', k: 'mkt' });
  const tray = new THREE.Group();
  tray.add(cyl(0.5, 0.5, 0.05, '#c98a45', 0, 0, 0, 20), kk('food_ingredient_bun', -0.18, 0.03, 0, 0.03, 0.55), kk('food_ingredient_bun', 0.2, 0.08, 0.6, 0.03, 0.55));
  hold(waiter, tray, 0.12, 0.55);
  group('mkt').add(waiter);
  // a guest who walks in and drops a note in the feedback box
  const guest = makePerson({ ...nextLook(), act: 'idle', k: 'guest', s: 0.9 });
  const note = hold(guest, box(0.24, 0.02, 0.3, '#f6b73c', 0, 0, 0), 0.05, 0.4);
  note.rotation.x = -0.9;
  hall.add(guest);

  // ── MEETING ROOM: between the research room and the kitchen, where product and developers meet ──
  {
    const m = group('meet');
    // the week's meetings, on the back wall facing the hall
    // kept low so it doesn't hide the design room behind it
    const t = canvasTex(640, 300, (c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      c.fillStyle = INK; c.textBaseline = 'middle';
      fitText(c, '每周的会（悉尼时间）', 46, w - 60); c.fillText('每周的会（悉尼时间）', 30, 42);
      c.fillStyle = '#2bb3a6'; c.fillRect(30, 74, w - 60, 6);
      [['周六 12:00', '产品会'], ['周日 20:00', '开发周会'], ['每晚 21:00', 'Discord 5 分钟 check in']].forEach(([d, n], i) => {
        c.font = `900 40px ${FONT}`; c.fillStyle = '#5b6078'; c.fillText(d, 30, 128 + i * 62);
        fitText(c, n, 40, w - 290); c.fillStyle = INK; c.fillText(n, 260, 128 + i * 62);
      });
    });
    const b = new THREE.Group(); b.position.set(-10.67, 0, -8.86); b.rotation.y = 0.32;
    for (const dx of [-1.3, 1.3]) b.add(box(0.1, 1.0, 0.1, '#3b3f5c', dx, 0.5, 0));
    b.add(box(3.0, 1.45, 0.1, '#3b3f5c', 0, 1.65, 0));
    const face = new THREE.Mesh(new THREE.PlaneGeometry(2.85, 1.33), textMat(t)); face.position.set(0, 1.65, 0.06); b.add(face);
    m.add(b);
    m.add(kk('kitchentable_A_large', -10.75, -4.9, Math.PI / 2));
    m.add(kk('plate', -10.75, -5.5, 0, 1.0), kk('food_ingredient_bun', -10.75, -5.5, 0.3, 1.08, 0.6), kk('jar_C_small', -10.5, -4.1, 0, 1.0));
    [[-12.55, -4.9, Math.PI / 2, 'pm'], [-8.95, -4.9, -Math.PI / 2, 'chef']].forEach(([x, z, f, hat], i) => {
      m.add(kk('chair_A', x, z, f));
      const p = makePerson({ ...nextLook(), hat, apron: hat === 'chef', act: i % 2 ? 'talk' : 'write', k: 'meet' });
      p.position.set(x + Math.sign(f) * 0.2, 0, z); p.rotation.y = f; seat(p); m.add(p);
    });
  }

  // ── RESEARCH ROOM: the product managers read the feedback, research and decide ──
  {
    const f = group('feedback');
    // the sorting table: notes sorted by kind, the same issue stacked up with a count
    f.add(kk('kitchentable_A_large', -15.3, -3.6, 0));
    [['#f56767', 7, '×7'], ['#86cfe8', 3, '×3'], ['#a8dc3c', 5, '×5']].forEach(([c, n, count], i) => {
      const x = -16.3 + i * 1.0;
      f.add(box(0.8, 0.12, 0.7, '#e3a65c', x, 1.06, -3.6));
      for (let j = 0; j < n; j++) { const nt = box(0.5, 0.03, 0.4, c, x + (j % 2 ? 0.03 : -0.03), 1.14 + j * 0.035, -3.6 + (j % 3 - 1) * 0.02); nt.rotation.y = (j % 3 - 1) * 0.12; f.add(nt); }
      const t = canvasTex(128, 64, g => { g.fillStyle = INK; g.font = `900 46px ${FONT}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(count, 64, 34); });
      const tag = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.25), textMat(t)); tag.position.set(x, 1.5 + n * 0.035, -3.55); f.add(tag);
    });
    pair(m => { const s = board(['分拣台', '反馈整理'][m], 1.5, 0.4, INK, W); s.position.set(-15.3, 1.35, -2.55); return s; }, f);
    // the review board at the back: the product side decides on each note
    const b = new THREE.Group(); b.position.set(-15.9, 0, -13.8);
    for (const dx of [-1.6, 1.6]) b.add(box(0.12, 1.2, 0.12, '#3b3f5c', dx, 0.6, 0));
    b.add(box(3.6, 2.0, 0.12, '#3b3f5c', 0, 2.1, 0));
    pair(m => {
      const t = canvasTex(720, 400, (c, w, h) => {
        c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
        c.fillStyle = INK; c.textBaseline = 'middle'; c.textAlign = 'center';
        fitText(c, ['评审板 · 客人的意见', '反馈评审'][m], 44, w - 40); c.fillText(['评审板 · 客人的意见', '反馈评审'][m], w / 2, 40);
        [['采纳', '#eef8d2', '#9ad513'], ['不采纳', '#fde7f0', '#f56767'], ['已解决', '#eef6ff', '#3486F3']].forEach(([n, bg, ink2], i) => {
          const x = 20 + i * 230;
          c.fillStyle = bg; c.fillRect(x, 80, 220, 300);
          c.fillStyle = ink2; c.font = `900 38px ${FONT}`; c.fillText(n, x + 110, 120);
          for (let j = 0; j < 3 - (i === 1 ? 1 : 0); j++) { c.fillStyle = '#ffffff'; c.fillRect(x + 30, 160 + j * 70, 160, 54); c.fillStyle = ink2; c.beginPath(); c.arc(x + 170, 175 + j * 70, 14, 0, 7); c.fill(); }
        });
      });
      const face = new THREE.Mesh(new THREE.PlaneGeometry(3.45, 1.9), textMat(t)); face.position.set(0, 2.1, 0.07); return face;
    }, b);
    f.add(b);
  }
  // a desk with a laptop, the person sitting behind it facing the hall
  const laptopAt = (g, x, z) => {
    const l = new THREE.Group(); l.position.set(x, 1.0, z);
    l.add(box(0.9, 0.05, 0.6, '#c9ccd8', 0, 0.02, 0));
    const scr = box(0.9, 0.58, 0.04, '#3b3f5c', 0, 0.3, -0.3); scr.rotation.x = -0.25; l.add(scr);
    g.add(l);
  };
  {
    const r = group('pm');
    r.add(kk('kitchentable_A', -18.3, -9.4, 0), kk('chair_A', -18.3, -10.8, 0));
    r.add(kk('kitchentable_A', -15.2, -9.4, 0), kk('chair_A', -15.2, -10.8, 0));
    const p1 = person('pm', -18.3, -10.6, 0, 'read', { hat: 'pm', slot: 0 }); seat(p1);
    const paperTex = canvasTex(512, 360, (c, w, h) => {
      c.fillStyle = '#fbf7ec'; c.fillRect(0, 0, w, h);
      c.fillStyle = INK; c.font = `900 60px ${FONT}`; c.textAlign = 'center'; c.fillText('用户反馈日报', w / 2, 76);
      c.fillRect(30, 102, w - 60, 6);
      c.fillStyle = '#8a8fa8'; for (let i = 0; i < 6; i++) { c.fillRect(30, 136 + i * 34, 200, 14); c.fillRect(272, 136 + i * 34, i % 3 ? 210 : 150, 14); }
    });
    const pm2 = flat(W); pm2.map = paperTex; pm2.side = THREE.DoubleSide;
    const paper = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.78), pm2); paper.rotation.x = -0.35;
    hold(p1, paper, 0.32, 0.55);
    const p2 = person('pm', -15.2, -10.6, 0, 'type', { hat: 'pm', slot: 1 }); seat(p2);
    laptopAt(r, -15.2, -9.2);
    // the product numbers on the wall: who uses the App and how much (the monthly 产品数据 report)
    r.add(box(0.12, 1.9, 3.5, '#3b3f5c', -19.75, 2.0, -6.2));
    const chart = canvasTex(640, 340, (c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      c.fillStyle = INK; c.textBaseline = 'middle'; fitText(c, '产品数据', 46, 300); c.fillText('产品数据', 28, 40);
      c.fillStyle = '#8b6ef6'; c.fillRect(28, 70, w - 56, 5);
      [0.35, 0.5, 0.42, 0.62, 0.7, 0.86].forEach((v, i) => { c.fillStyle = i === 5 ? '#8b6ef6' : '#d6ccfb'; c.fillRect(40 + i * 60, 310 - v * 210, 40, v * 210); });
      c.strokeStyle = '#3486F3'; c.lineWidth = 7; c.lineJoin = 'round'; c.beginPath();
      [0.3, 0.38, 0.36, 0.52, 0.6, 0.74].forEach((v, i) => { const x = 60 + i * 60, y = 300 - v * 210; i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.stroke();
      ['活跃用户', 'AI 使用'].forEach((a, i) => {
        const y = 120 + i * 100; c.fillStyle = '#f1edff'; c.fillRect(420, y, 192, 80);
        c.fillStyle = INK; c.font = `900 30px ${FONT}`; c.fillText(a, 436, y + 40);
      });
    });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.3, 1.75), textMat(chart));
    screen.rotation.y = Math.PI / 2; screen.position.set(-19.68, 2.0, -6.2); r.add(screen);
  }
  // ── DESIGN ROOM: drawing the next dish, every page of the App ──
  {
    const d = group('design');
    const art = canvasTex(400, 480, (c, w, h) => {
      c.fillStyle = W; c.fillRect(0, 0, w, h);
      c.strokeStyle = INK; c.lineWidth = 10; c.beginPath(); c.roundRect(110, 40, 180, 380, 30); c.stroke();
      c.fillStyle = '#9ad513'; c.fillRect(135, 90, 130, 46);
      c.fillStyle = '#f1edff'; for (let i = 0; i < 4; i++) c.fillRect(135, 160 + i * 52, 130, 36);
      c.fillStyle = '#f56767'; c.beginPath(); c.arc(240, 380, 18, 0, 7); c.fill();
    });
    const ease = new THREE.Group();
    for (const [dx, rz] of [[-0.45, 0.12], [0.45, -0.12]]) { const leg = box(0.09, 2.3, 0.09, '#c98a45', dx, 1.15, 0); leg.rotation.z = rz; ease.add(leg); }
    const back = box(0.09, 2.2, 0.09, '#c98a45', 0, 1.1, -0.45); back.rotation.x = -0.25; ease.add(back);
    const cb = new THREE.Group(); cb.add(box(1.3, 1.5, 0.07, W, 0, 0, 0));
    const face = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.4), textMat(art)); face.position.z = 0.04; cb.add(face);
    cb.position.set(0, 1.75, 0.08); cb.rotation.x = -0.08; ease.add(cb);
    ease.position.set(-9.4, 0, -11.4); ease.rotation.y = 0.75; d.add(ease); // off to the side, not behind the meeting board
    person('design', -10.4, -12.4, 0.75, 'paint', { hat: 'design', slot: 0 });
    // the screens pinned up on the back wall
    for (const dx of [-1.2, 0, 1.2]) {
      const fr = new THREE.Group(); fr.position.set(-10.75 + dx, 2.2, -15.72);
      fr.add(box(0.95, 1.2, 0.05, W, 0, 0, 0));
      const pic = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 1.1), textMat(art)); pic.position.z = 0.03; fr.add(pic);
      d.add(fr);
    }
  }

  // ── BIG KITCHEN: cooks at the stoves, the bun tables and the pass ──
  {
    const k = group('dev');
    k.add(kk('fridge_A_decorated', -7, -15, 0), kk('kitchencounter_sink', -5, -15, 0), kk('stove_multi_decorated', -3, -15, 0), kk('stove_multi_decorated', -1, -15, 0),
      kk('oven', 1, -15, 0), kk('kitchencounter_straight_A_decorated', 3, -15, 0), kk('kitchencounter_straight_B', 5, -15, 0));
    k.add(kk('extractorhood', -3, -16, 0), kk('extractorhood', -1, -16, 0), kk('kitchencabinet', 3, -16, 0), kk('kitchencabinet', 5, -16, 0), kk('shelf_papertowel_decorated', -5, -15.75, 0, 2.6));
    person('dev', -2, -12.9, Math.PI, 'stir', { hat: 'chef', apron: true });
    // the bun tables: knead the dough, fold and fill
    k.add(kk('kitchentable_A_large_decorated', -3.8, -9.4, 0));
    person('dev', -3.8, -11.0, 0, 'knead', { hat: 'chef', apron: true });
    k.add(kk('kitchentable_A_large', 2.2, -9.4, 0), kk('crate_buns', 3.0, -9.3, 0, 1.0, 0.55), kk('cuttingboard', 1.5, -9.4, 0.2, 1.0), kk('knife', 1.5, -9.2, 0.6, 1.07));
    for (let i = 0; i < 3; i++) k.add(kk('food_ingredient_bun', 0.9 + i * 0.5, -8.8, i, 1.02, 0.6));
    person('dev', 1.6, -11.0, 0, 'chop', { hat: 'chef', apron: true });
    // the head chef (Tech Lead) at the order board, splitting the work into cards
    person('dev', -4.2, -3.9, -1.94, 'point', { hat: 'lead', apron: true, slot: 0 });
    // the pass: counters facing the hall, plates waiting to go out
    for (const x of [-4, -2, 0, 2]) k.add(kk('kitchencounter_straight_A', x, -2.6, Math.PI));
    for (const x of [-3.4, -1.2, 1.0]) k.add(kk('plate', x, -2.4, 0, 1.0), kk('food_ingredient_bun', x, -2.4, x, 1.08, 0.7));
    // the order board: four columns, cards that the AI moves along
    {
      const kb = group('board');
      const b = new THREE.Group(); b.position.set(-6.0, 0, -4.4); b.rotation.y = 1.2;
      for (const dx of [-1.3, 1.3]) b.add(box(0.12, 1.0, 0.12, '#3b3f5c', dx, 0.5, 0));
      b.add(box(3.0, 2.0, 0.12, '#3b3f5c', 0, 2.0, 0));
      const t = canvasTex(600, 400, (c, w, h) => {
        c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
        const cols = ['Backlog', 'Doing', 'Review', 'Done'], tint = ['#eef6ff', '#fff4da', '#f1edff', '#eef8d2'];
        cols.forEach((n, i) => { c.fillStyle = tint[i]; c.fillRect(i * 150 + 6, 70, 138, h - 80); c.fillStyle = INK; c.font = `900 30px ${FONT}`; c.textAlign = 'center'; c.fillText(n, i * 150 + 75, 46); });
      });
      const f = new THREE.Mesh(new THREE.PlaneGeometry(2.85, 1.85), textMat(t)); f.position.set(0, 2.0, 0.07); b.add(f);
      ['#86cfe8', '#f7aac9', '#a8dc3c', '#f6b73c', '#c9b8f6'].forEach((col, i) => {
        const card = box(0.5, 0.26, 0.03, col, 0, 0, 0.1); card.userData = { off: i * 0.21, row: i % 3 }; b.add(card); kanban.push(card);
      });
      kb.add(b);
      pair(m => { const s = board(['订单看板', '任务看板'][m], 1.6, 0.42, INK, W); s.position.set(0, 3.3, 0.05); return s; }, b);
    }
    // testing before it goes out: the tester at the end of the pass tries the test build on a phone
    {
      const tz = group('taste');
      const p = makePerson({ ...nextLook(), hat: 'lead', apron: true, act: 'read', k: 'taste' });
      p.position.set(2.4, 0, -4.1); tz.add(p);
      const phone = new THREE.Group();
      phone.add(box(0.3, 0.52, 0.05, INK, 0, 0, 0), box(0.24, 0.42, 0.01, '#86cfe8', 0, 0.01, 0.03), box(0.1, 0.1, 0.012, '#3486F3', 0, 0.06, 0.04));
      phone.rotation.x = -0.5; hold(p, phone, 0.28, 0.45);
      pair(m => { const s = board(['试吃把关', '测试'][m], 1.6, 0.42, INK, W); s.position.set(2.5, 1.32, -2.0); return s; }, tz);
    }
    k.add(kk('crate_carrots', -6.6, -11.5, 0.3, 0, 0.8), kk('crate_tomatoes', -6.8, -9.8, -0.2, 0, 0.8), kk('crate_lettuce', 5, -12.2, 0.2, 0, 0.8), kk('dishrack_plates', 5, -6, 0));
  }

  // ── AI FILLING LAB ──
  {
    const a = group('ai');
    roomSign('ai', ['AI 调馅料实验室', 'AI 功能'], 9, -8.4, -0.197, 3.32);
    a.add(kk('kitchentable_A_large', 11, -12.5, 0), kk('pot_large', 10.6, -12.6, 0, 1.0));
    a.add(mesh(geo('glow', () => new THREE.CylinderGeometry(0.85, 0.85, 0.08, 24)), flat('#c9b8f6'), 10.6, 1.62, -12.6));
    a.add(kk('jar_A_large', 12.1, -12.2, 0, 1.0), kk('jar_B_medium', 12.4, -12.8, 0, 1.0), kk('jar_C_small', 11.8, -12.9, 0, 1.0));
    person('ai', 10.8, -14.1, 0, 'stir', { hat: 'ai', apron: true, slot: 0 });
    a.add(kk('kitchencounter_straight_A', 8, -15, 0), kk('kitchencounter_straight_A', 10, -15, 0));
  }

  // ── COOKING CLASSROOM ──
  {
    const l = group('learn');
    pair(m => {
      const bb = board(['今天学：包包子', '今天学：把项目跑起来'][m], 3.6, 1.7, '#2f5d50', W);
      bb.position.set(11, 1.9, -7.85); bb.rotation.y = -0.197; return bb;
    }, l);
    person('learn', 13.4, -6.9, -0.4, 'teach', { hat: 'teacher', slot: 0 });
    [[9, -4.6], [12.8, -4.6], [9, -3.0]].forEach(([x, z]) => {
      l.add(kk('kitchentable_A', x, z - 0.9, 0, 0, 0.6), kk('chair_A', x, z + 0.25, Math.PI));
      l.add(kk('food_ingredient_bun', x + 0.25, z - 0.9, 0, 0.62, 0.5));
      const p = makePerson({ ...nextLook(), act: 'write', k: 'learn', s: 0.88 });
      p.position.set(x, 0, z + 0.15); p.rotation.y = Math.PI; seat(p); l.add(p);
    });
  }
  // the graduate walks from the classroom to the bun table and gets a chef's hat
  const graduate = makePerson({ shirt: '#a8dc3c', apron: true, hat: 'chef', skin: 1, hair: 2, act: 'idle', k: 'learn', s: 0.95 });
  graduate.userData.parts.hat.scale.setScalar(0.001);
  scene.add(graduate);

  // ── the report board, and the AI helper robot who walks reports to it ──
  const papers = [];
  {
    const r = group('pass');
    for (const dx of [-0.85, 0.85]) r.add(box(0.12, 1.5, 0.12, '#c98a45', 8 + dx, 0.75, -1.5));
    r.add(box(2.0, 1.4, 0.1, '#e9c79a', 8, 2.1, -1.5));
    pair(m => { const h = board(['报告栏', '报告中心'][m], 1.2, 0.38, INK, W); h.position.set(8, 3.0, -1.44); return h; }, r);
    const cols = [W, '#86cfe8', '#f7aac9', '#c9b8f6', '#a8dc3c', '#fff4da'];
    for (let i = 0; i < 6; i++) { const p = box(0.46, 0.56, 0.02, cols[i], 7.35 + (i % 3) * 0.65, 2.32 - Math.floor(i / 3) * 0.66, -1.43); p.rotation.z = (i % 2 ? 0.06 : -0.05); r.add(p); papers.push(p); }
  }
  function makeRobot(k, held) {
    const bot = new THREE.Group();
    const body = new THREE.Group(); bot.add(body);
    const torso = new THREE.Group(); body.add(torso);
    const legs = [], arms = [];
    for (const sx of [-1, 1]) {
      const leg = new THREE.Group(); leg.position.set(sx * 0.14, 0.34, 0);
      leg.add(cyl(0.06, 0.06, 0.26, '#8b6ef6', 0, -0.14, 0, 8), box(0.18, 0.07, 0.24, INK, 0, -0.29, 0.03));
      body.add(leg); legs.push(leg);
    }
    torso.add(box(0.62, 0.5, 0.45, '#c9b8f6', 0, 0.6, 0), box(0.7, 0.5, 0.52, '#c9b8f6', 0, 1.12, 0), box(0.52, 0.32, 0.02, INK, 0, 1.12, 0.27));
    const head = new THREE.Group(); head.position.y = 1.12; torso.add(head);
    for (const sx of [-1, 1]) {
      const e = new THREE.Mesh(geo('bot-eye', () => new THREE.CircleGeometry(0.06, 14)), flat('#9ad513')); e.position.set(sx * 0.12, 0.03, 0.285); head.add(e);
      const st = new THREE.Mesh(geo('antenna', () => new THREE.CylinderGeometry(0.022, 0.022, 0.3, 6)), ink); st.position.set(sx * 0.16, 0.38, 0); st.rotation.z = -sx * 0.3; head.add(st);
      head.add(sphere(0.075, sx < 0 ? '#8b6ef6' : '#7fc6f2', sx * 0.21, 0.53, 0));
      const arm = new THREE.Group(); arm.position.set(sx * 0.38, 0.85, 0);
      arm.add(cyl(0.05, 0.05, 0.3, '#8b6ef6', 0, -0.12, 0, 8)); torso.add(arm); arms.push(arm);
    }
    torso.add(held);
    bot.userData = { k, act: 'carry', phase: 0, seated: false, parts: { body, torso, legs, arms, head, carried: held } };
    // an invisible column round the robot, so it is easy to click while it walks
    const hit = new THREE.Mesh(geo('bot-hit', () => new THREE.CylinderGeometry(0.55, 0.55, 1.9, 10)), new THREE.MeshBasicMaterial());
    hit.position.y = 0.95; hit.visible = false; bot.add(hit);
    bot.scale.setScalar(1.35);
    scene.add(bot);
    return bot;
  }
  // the AI helper who walks the night's report to the board
  const reportPaper = box(0.44, 0.52, 0.03, W, 0, 0.72, 0.4); reportPaper.rotation.x = -0.4;
  const robot = makeRobot('night', reportPaper);
  // the one who empties the feedback box once a month and sorts the notes
  const basket = new THREE.Group(); basket.position.set(0, 0.62, 0.42);
  basket.add(cyl(0.3, 0.24, 0.22, '#e3a65c', 0, 0, 0, 14));
  const basketNotes = new THREE.Group(); basket.add(basketNotes);
  ['#f56767', '#86cfe8', '#a8dc3c', '#f6b73c'].forEach((c, i) => { const n = box(0.26, 0.02, 0.2, c, (i % 2 - 0.5) * 0.12, 0.13 + i * 0.025, 0); n.rotation.y = i; basketNotes.add(n); });
  const collector = makeRobot('feedbot', basket);
  applyMode();

  // ── paths ──
  function route(pts, speed, stops) {
    const segs = []; let T = 0;
    pts.forEach((a, i) => {
      if (stops[i]) { segs.push({ a, b: a, t0: T, d: stops[i], stop: i }); T += stops[i]; }
      const b = pts[(i + 1) % pts.length], len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (len) { segs.push({ a, b, t0: T, d: len / speed }); T += len / speed; }
    });
    return {
      stopAt: i => segs.find(s => s.stop === i).t0,
      at(t) {
        const u = ((t % T) + T) % T;
        const s = segs.find(s => u < s.t0 + s.d) || segs[segs.length - 1];
        const f = s.d ? (u - s.t0) / s.d : 0;
        return { x: s.a[0] + (s.b[0] - s.a[0]) * f, z: s.a[1] + (s.b[1] - s.a[1]) * f, moving: s.a !== s.b, dx: s.b[0] - s.a[0], dz: s.b[1] - s.a[1], stop: s.stop, u, f, n: Math.floor(t / T) };
      },
    };
  }
  const robotRoute = route([[10.6, -0.8], [8.2, 0.2]], 1.2, { 0: 4.5, 1: 2.8 });
  const waiterRoute = route([[3.8, -0.6], [4.6, 1.0], [4.6, 2.5], [4.6, 1.0]], 1.6, { 0: 1.6, 2: 2.2 });
  const guestRoute = route([[0, 12.6], [0, 7.5], [-6, 3.0], [-13.6, 1.4], [-15.6, -0.2], [-13.6, 1.4], [-6, 3.0], [0, 7.5]], 1.9, { 0: 2.0, 4: 2.2 });
  const collectRoute = route([[-14.5, -1.1], [-15.6, 0.1], [-17.4, -0.3], [-18.3, -1.2], [-17.9, -3.6], [-18.3, -1.2], [-17.4, -0.3], [-15.6, 0.1]], 1.5, { 0: 2.4, 4: 3.4 });
  const gradRoute = route([[9.6, -2.2], [7.6, -4.5], [4.6, -4.5], [3.4, -7.7], [4.6, -4.5], [7.6, -4.5]], 1.6, { 0: 2.6, 3: 3.2 });
  // the loop's own clock, so the tour can start the runner from step 1
  let loopClock = 0, focus = null;
  const stopStart = stopU.map((_, i) => legT.slice(0, i).reduce((a, b) => a + b, 0) + DWELL * i);

  const turn = (obj, dx, dz) => { if (dx || dz) obj.rotation.y = Math.atan2(dx, dz); };
  const walkers = new Set([robot, collector, waiter, guest, graduate, runner]);
  function follow(obj, r, t) {
    const w = r.at(t);
    obj.position.set(w.x, 0, w.z);
    if (w.moving) turn(obj, w.dx, w.dz);
    return w;
  }
  const camDir = new THREE.Vector3();
  function animate(t, dt) {
    for (const p of people) if (!walkers.has(p)) animatePerson(p, t, false);
    for (const s of sparks) { s.rotation.y += dt * 2; s.position.y = 1.3 + Math.sin(t * 3) * 0.05; }
    for (const c of kanban) {
      const u = (t * 0.05 + c.userData.off) % 1, col = Math.floor(u * 4), f = (u * 4) % 1;
      const colX = i => -1.07 + i * 0.715;
      const x = f > 0.82 && col < 3 ? colX(col) + (colX(col + 1) - colX(col)) * ((f - 0.82) / 0.18) : colX(col);
      c.position.set(x, 2.45 - c.userData.row * 0.38, 0.1);
    }
    // arrows take the colour of the team whose step they are heading to
    for (const a of arrows) {
      const u = (a.userData.off + t * 0.012) % 1;
      a.position.copy(loopCurve.getPointAt(u));
      const d = loopCurve.getTangentAt(u); a.rotation.y = Math.atan2(d.x, d.z);
      a.material = a.userData.mats[nextStop(u)];
    }
    // the runner and what they carry
    const lw = loopAt(loopClock);
    runner.position.copy(loopCurve.getPointAt(lw.u)).setY(0);
    if (lw.moving) { const d = loopCurve.getTangentAt(lw.u); runner.rotation.y = Math.atan2(d.x, d.z); }
    const holding = lw.moving || lw.f >= 0.5 ? AFTER[lw.i] : AFTER[(lw.i + AFTER.length - 1) % AFTER.length];
    for (const [k, o] of Object.entries(carried)) o.visible = k === holding;
    runner.userData.act = holding ? 'carry' : 'idle';
    animatePerson(runner, t, lw.moving);
    if (tour.on) {
      if (loopClock >= LOOP_T) { tour.on = false; loopClock = 0; onTour?.('done'); stopMarks.forEach(sm => sm.el.classList.remove('on')); }
      else if (lw.i !== tour.step) { tour.step = lw.i; onTour?.(lw.i); stopMarks.forEach((sm, i) => sm.el.classList.toggle('on', i === stageOf(lw.i))); }
    }
    // a picked team keeps its colours; everyone else's floor, edges and steps fade
    const k = Math.min(1, dt * 6);
    for (const fl of floors) { fl.lit += ((!focus || fl.dept === focus ? 1 : 0.6) - fl.lit) * k; fl.m.material.color.setScalar(fl.lit); }
    for (const e of edges) e.mat.opacity += ((!focus || e.dept === focus ? 1 : 0.2) - e.mat.opacity) * k;
    for (const sm of stopMarks) {
      const lit = !focus || sm.who.includes(focus);
      sm.mat.opacity += ((lit ? 1 : 0.3) - sm.mat.opacity) * k;
      sm.el.classList.toggle('dim', !lit);
    }
    arrows[0]?.userData.mats.forEach((m, i) => { m.opacity += ((!focus || LOOP[i].who.includes(focus) ? 1 : 0.25) - m.opacity) * k; });
    // the report robot writes by the board, then walks over and pins the report up
    const h = follow(robot, robotRoute, t);
    if (h.stop === 1) robot.rotation.y = Math.PI;
    if (h.stop === 0) robot.rotation.y = -0.6;
    animatePerson(robot, t, h.moving);
    const dropped = h.u >= robotRoute.stopAt(1);
    robot.userData.parts.carried.visible = !dropped && h.stop !== 0;
    papers.forEach((p, i) => { p.visible = i < 2 + (h.n + (dropped ? 1 : 0)) % 5; });
    // the collector: notes in the basket from the box until they are sorted
    const cw = follow(collector, collectRoute, t);
    if (cw.stop === 0) collector.rotation.y = -Math.PI / 2;
    if (cw.stop === 4) collector.rotation.y = Math.PI / 2;
    animatePerson(collector, t, cw.moving);
    basketNotes.visible = cw.u >= collectRoute.stopAt(0) + 1.2 && cw.u < collectRoute.stopAt(4) + 1.5;
    // the waiter: tray full on the way out, empty on the way back
    const w = follow(waiter, waiterRoute, t);
    if (w.stop === 0) waiter.rotation.y = Math.PI;
    if (w.stop === 2) waiter.rotation.y = 0;
    animatePerson(waiter, t, w.moving);
    const served = w.u >= waiterRoute.stopAt(2) + 1;
    tray.children.slice(1).forEach(b => { b.visible = !served; });
    // the guest who leaves feedback
    const gw = follow(guest, guestRoute, t);
    if (gw.stop === 4) guest.rotation.y = Math.PI;
    guest.userData.act = gw.stop === 4 ? 'drop' : 'idle';
    animatePerson(guest, t, gw.moving);
    note.visible = gw.u < guestRoute.stopAt(4) + 1;
    // the graduate
    const g2 = follow(graduate, gradRoute, t);
    if (g2.stop === 3) graduate.rotation.y = Math.PI;
    graduate.userData.act = g2.stop === 3 ? 'knead' : 'idle';
    animatePerson(graduate, t, g2.moving);
    const hat = graduate.userData.parts.hat;
    hat.scale.setScalar(Math.max(0.001, g2.stop === 3 ? Math.min(0.62, g2.f * 2) : (g2.stop === 0 ? 0.001 : hat.scale.x * 0.92)));
    // outside walls sink when they stand between the camera and the rooms
    camDir.copy(camera.position).sub(controls.target).setY(0).normalize();
    walls.forEach((wl, i) => {
      const goalH = wl.normal.dot(camDir) > 0.2 ? wl.low : 1;
      wl.h += (goalH - wl.h) * Math.min(1, dt * 8);
      wl.g.scale.y = wl.h;
      posts[i].scale.y = Math.max(wl.h, walls[(i + walls.length - 1) % walls.length].h);
    });
  }

  // a picked team keeps its colours (see animate); new reports are listed on the team's page, not in the scene
  function setFocus(id) { focus = id; }

  // ── camera flights ──
  const goal = { target: new THREE.Vector3(), dist: 0, dir: null };
  const personZone = k => {
    const name = k.slice(2);
    for (const [zone, names] of Object.entries(CAST)) if (names.includes(name)) return zone;
    return PEOPLE.find(r => r[0] === name)?.[1] || 'home';
  };
  function flyTo(k) {
    const v = VIEWS[k] || VIEWS[k?.startsWith('p:') ? personZone(k) : 'home'] || VIEWS.home;
    goal.target.set(v[0], 0, v[1]);
    goal.dist = fitDist(v[2]);
    goal.dir = null;
    flight = 0;
  }

  // ── sizing, picking, the loop ──
  function fit() {
    const w = el.clientWidth, h = el.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false); css.setSize(w, h);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  new ResizeObserver(fit).observe(el);
  fit();
  placeHome();

  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  let down = null, hoverK = null, lastMove = 0;
  function pick(e) {
    const r = renderer.domElement.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    for (const hit of ray.intersectObjects(scene.children, true)) {
      if (hit.object.material === glass) continue;
      let o = hit.object;
      while (o && !o.userData?.k) o = o.parent;
      if (o) return o.userData.k;
    }
    return null;
  }
  renderer.domElement.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY]; renderer.domElement.style.cursor = 'grabbing'; });
  renderer.domElement.addEventListener('pointerup', e => {
    if (down && e.button === 0 && Math.hypot(e.clientX - down[0], e.clientY - down[1]) < 6) { const k = pick(e); if (k) onPick(k); }
    down = null;
  });
  renderer.domElement.addEventListener('pointermove', e => {
    if (down || performance.now() - lastMove < 60) return;
    lastMove = performance.now();
    const k = pick(e);
    renderer.domElement.style.cursor = k ? 'pointer' : 'grab';
    hoverK = k;
    onHover?.(k, e);
  });
  renderer.domElement.addEventListener('pointerleave', () => { hoverK = null; onHover?.(null); });

  let onScreen = true;
  new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; }).observe(el);
  const clock = new THREE.Clock();
  let t = 0, frames = 0;
  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!onScreen || document.hidden) return;
    if (!still) t += dt;
    if ((!still || tour.on) && !tour.paused) loopClock += dt;
    if (tour.on) {
      goal.target.copy(runner.position).setY(0); goal.dist = fitDist(24); goal.dir = HOME_DIR;
      flight = 0;
    }
    animate(still ? 6 : t, dt);
    moveByKeys(dt);
    if (flight !== null) {
      flight = Math.min(1, flight + dt * 1.4);
      if (tour.on) flight = 0.5;
      const dir = camera.position.clone().sub(controls.target).normalize();
      const dist = camera.position.distanceTo(controls.target);
      const k = still ? 1 : 0.12;
      if (goal.dir) dir.lerp(goal.dir, k).normalize();
      controls.target.lerp(goal.target, k);
      camera.position.copy(controls.target).add(dir.multiplyScalar(dist + (goal.dist - dist) * k));
      if (flight >= 1 && controls.target.distanceTo(goal.target) < 0.05) flight = null;
    }
    controls.update();
    effect.render(scene, camera);
    css.render(scene, camera);
    frames++;
  });

  return {
    flyTo,
    home() { goal.target.set(VIEWS.home[0], 0, VIEWS.home[1]); goal.dist = homeDist(); goal.dir = HOME_DIR.clone(); flight = 0; },
    setMode(m) { MODE = m; applyMode(); },
    setFocus,
    turn(a) { byHand(); nudge.turn += a; },
    zoom(z) { byHand(); nudge.zoom += z; },
    // the tour: the runner starts again from step 1 (or from step i) and the camera follows
    tour(i = 0) { setFocus(null); loopClock = stopStart[i]; tour.on = true; tour.paused = false; tour.step = -1; },
    pauseTour(p) { tour.paused = p; },
    stopTour() { if (tour.on) endTour(); },
    frames: () => frames,
    camera, controls, scene,
  };
}

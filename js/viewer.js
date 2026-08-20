let currentScene = null;
let activeId = "a";
const viewers = { a: null, b: null };
let scenePillTimer = null;
let arrowElements = [];
let arrowRafId = null;

/* ─────────────────────────────────────────
   AUTO ROTATION
───────────────────────────────────────── */

const AUTO_ROTATE_DELAY = 6000; // 6 seconds
const AUTO_ROTATE_SPEED = 4;    // degrees per second

let autoRotateTimer = null;
let userIsInteracting = false;

function activeViewer() {
  return viewers[activeId];
}

function stopAutoRotate() {
  clearTimeout(autoRotateTimer);
  autoRotateTimer = null;

  const viewer = activeViewer();

  if (viewer) {
    try {
      viewer.stopAutoRotate();
    } catch {}
  }
}

function startAutoRotate() {
  const viewer = activeViewer();

  if (!viewer || userIsInteracting) return;

  try {
    viewer.startAutoRotate(AUTO_ROTATE_SPEED);
  } catch {}
}

function scheduleAutoRotate() {
  clearTimeout(autoRotateTimer);
  autoRotateTimer = null;

  if (!currentScene) return;

  autoRotateTimer = setTimeout(() => {
    if (!userIsInteracting && currentScene) {
      startAutoRotate();
    }
  }, AUTO_ROTATE_DELAY);
}

function registerUserInteraction() {
  userIsInteracting = true;

  stopAutoRotate();

  clearTimeout(autoRotateTimer);

  /*
    Wait briefly for the interaction to finish,
    then begin a fresh inactivity countdown.
  */
  autoRotateTimer = setTimeout(() => {
    userIsInteracting = false;
    scheduleAutoRotate();
  }, 300);
}

/* ─────────────────────────────────────────
   GENERAL HELPERS
───────────────────────────────────────── */

const MAX_TEX = (() => {
  try {
    const c = document.createElement("canvas");
    const gl =
      c.getContext("webgl") ||
      c.getContext("experimental-webgl");

    return gl
      ? gl.getParameter(gl.MAX_TEXTURE_SIZE)
      : 4096;
  } catch {
    return 4096;
  }
})();

function panoEl(id) {
  return document.getElementById(`pano-${id}`);
}

function inactiveId() {
  return activeId === "a" ? "b" : "a";
}

function showOverlay(show) {
  document
    .getElementById("load-overlay")
    .classList.toggle("hidden", !show);
}

function setQualityBadge(label) {
  const badge = document.getElementById("quality-badge");

  badge.textContent = label;
  badge.style.opacity = "1";
}

function showScenePill(scene) {
  document.getElementById("scene-group-display").textContent =
    scene.group;

  document.getElementById("scene-name-display").textContent =
    scene.name;

  const pill = document.getElementById("scene-pill");

  pill.classList.add("show");

  clearTimeout(scenePillTimer);

  scenePillTimer = setTimeout(() => {
    pill.classList.remove("show");
  }, 2200);
}

/* ─────────────────────────────────────────
   HOTSPOTS
───────────────────────────────────────── */

function buildHotspots(scene, navigate) {
  return (scene.hotspots || []).map(hotspot => ({
    type: "scene",

    pitch: hotspot.pitch,
    yaw: hotspot.yaw,

    text: hotspot.text,

    sceneId: hotspot.target,

    createTooltipFunc: hotspotDiv => {
      hotspotDiv.setAttribute(
        "data-scene-id",
        hotspot.target
      );
    },

    clickHandlerFunc: () => {
      navigate(hotspot.target);
    }
  }));
}

function bindHotspotTouch(containerId, navigate) {
  const el = panoEl(containerId);

  if (!el || el._hotspotDelegated) return;

  el._hotspotDelegated = true;

  let touchMoved = false;

  el.addEventListener(
    "touchstart",
    () => {
      touchMoved = false;
    },
    { passive: true }
  );

  el.addEventListener(
    "touchmove",
    () => {
      touchMoved = true;
    },
    { passive: true }
  );

  el.addEventListener(
    "touchend",
    event => {
      if (touchMoved) return;

      const hotspot =
        event.target.closest(".pnlm-hotspot");

      if (!hotspot) return;

      event.preventDefault();
      event.stopPropagation();

      const sceneId =
        hotspot.getAttribute("data-scene-id") ||
        hotspot.dataset.sceneId;

      if (sceneId) {
        navigate(sceneId);
      }
    },
    { passive: false }
  );
}

/* ─────────────────────────────────────────
   PANNELLUM VIEWER
───────────────────────────────────────── */

function makeViewer(
  divId,
  panorama,
  opts,
  navigate
) {
  const el = panoEl(divId);

  if (viewers[divId]) {
    try {
      viewers[divId].destroy();
    } catch {}

    viewers[divId] = null;
  }

  /*
    Any direct interaction with the panorama
    stops automatic rotation.
  */
  el.addEventListener(
    "mousedown",
    registerUserInteraction
  );

  el.addEventListener(
    "touchstart",
    registerUserInteraction,
    { passive: true }
  );

  el.addEventListener(
    "pointerdown",
    registerUserInteraction
  );

  viewers[divId] = pannellum.viewer(el, {
    type: "equirectangular",

    panorama,

    autoLoad: true,

    showControls: false,

    compass: false,

    showFullscreenCtrl: false,

    showZoomCtrl: false,

    mouseZoom: false,

    minHfov: 60,

    maxHfov: 120,

    hfov: opts.hfov || 100,

    pitch: opts.pitch || 0,

    yaw: opts.yaw || 0,

    hotSpots: opts.hotSpots || []
  });

  return viewers[divId];
}

/* ─────────────────────────────────────────
   IMAGE CROSSFADE
───────────────────────────────────────── */

function crossfade(
  scene,
  nextUrl,
  navigate,
  onDone
) {
  if (currentScene?.id !== scene.id) return;

  const av = activeViewer();

  const pitch = av
    ? av.getPitch()
    : 0;

  const yaw = av
    ? av.getYaw()
    : 0;

  const hfov = av
    ? av.getHfov()
    : 100;

  const nextId = inactiveId();

  const viewer = makeViewer(
    nextId,
    nextUrl,
    {
      pitch,
      yaw,
      hfov,

      hotSpots:
        buildHotspots(
          scene,
          navigate
        )
    },
    navigate
  );

  viewer.on("load", () => {
    if (currentScene?.id !== scene.id) return;

    const active = activeViewer();

    if (active) {
      try {
        viewer.setYaw(
          active.getYaw()
        );

        viewer.setPitch(
          active.getPitch()
        );
      } catch {}
    }

    panoEl(nextId)
      .classList
      .remove("hidden-pano");

    panoEl(activeId)
      .classList
      .add("hidden-pano");

    setTimeout(() => {
      if (currentScene?.id !== scene.id) return;

      const oldId = activeId;

      activeId = nextId;

      if (viewers[oldId]) {
        try {
          viewers[oldId].destroy();
        } catch {}

        viewers[oldId] = null;
      }

      bindHotspotTouch(
        activeId,
        navigate
      );

      /*
        Restart the inactivity timer after
        the quality transition finishes.
      */
      userIsInteracting = false;
      scheduleAutoRotate();

      onDone();

    }, 650);
  });

  viewer.on("error", () => {});
}

/* ─────────────────────────────────────────
   LOAD SCENE
───────────────────────────────────────── */

export function loadScene(
  scene,
  navigate
) {
  /*
    Stop rotation from the previous scene.
  */
  stopAutoRotate();

  userIsInteracting = false;

  if (!scene) return;

  if (
    currentScene?.id === scene.id
  ) {
    return;
  }

  currentScene = scene;

  showScenePill(scene);

  document
    .querySelectorAll(".scene-pill-btn")
    .forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.id === scene.id
      );
    });

  showOverlay(true);

  setQualityBadge("25%");

  /*
    Destroy the previous viewer layers.
  */
  ["a", "b"].forEach(id => {
    if (viewers[id]) {
      try {
        viewers[id].destroy();
      } catch {}

      viewers[id] = null;
    }

    panoEl(id)
      .classList
      .add("hidden-pano");
  });

  activeId = "a";

  /*
    Load the low-resolution panorama first.
  */
  const viewer = makeViewer(
    "a",

    scene.images.low,

    {
      hotSpots:
        buildHotspots(
          scene,
          navigate
        )
    },

    navigate
  );

  panoEl("a")
    .classList
    .remove("hidden-pano");

  /*
    Once the first panorama is ready,
    start the inactivity timer.
  */
  viewer.on("load", () => {

    showOverlay(false);

    setQualityBadge("25%");

    userIsInteracting = false;

    scheduleAutoRotate();

    bindHotspotTouch(
      "a",
      navigate
    );

    buildArrows(
      scene,
      navigate
    );

    /*
      Load medium quality.
    */
    loadQuality(
      scene,
      scene.images.medium,
      "50%",
      navigate,
      () => {

        /*
          Load high quality.
        */
        loadQuality(
          scene,
          scene.images.high,
          "HD",
          navigate,
          () => {

            setTimeout(() => {
              document
                .getElementById(
                  "quality-badge"
                )
                .style.opacity = "0";

            }, 2000);

          }
        );

      }
    );
  });

  viewer.on("error", () => {
    showOverlay(false);
  });
}

/* ─────────────────────────────────────────
   PROGRESSIVE QUALITY LOADING
───────────────────────────────────────── */

function loadQuality(
  scene,
  url,
  label,
  navigate,
  onDone
) {
  if (
    currentScene?.id !== scene.id
  ) {
    return;
  }

  const img = new Image();

  img.onload = () => {

    /*
      Prevent loading textures that exceed
      the device's maximum texture size.
    */
    if (
      img.naturalWidth > MAX_TEX
    ) {
      onDone();
      return;
    }

    crossfade(
      scene,
      url,
      navigate,
      () => {

        setQualityBadge(label);

        onDone();
      }
    );
  };

  img.onerror = () => {
    onDone();
  };

  img.src = url;
}

/* ─────────────────────────────────────────
   DIRECTIONAL FLOOR ARROWS
───────────────────────────────────────── */

function makeArrowSVG() {
  return `
    <svg
      class="arrow-svg"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >

      <path
        d="M20 3 L35 30 L26 26 L26 37 L14 37 L14 26 L5 30 Z"
        fill="rgba(0,0,0,0.5)"
        transform="translate(0.6,1.2)"
      />

      <path
        d="M20 3 L35 30 L26 26 L26 37 L14 37 L14 26 L5 30 Z"
        fill="#bf9b60"
      />

      <path
        d="M20 3 L35 30 L26 26 L20 9 L14 26 L5 30 Z"
        fill="#d4ae72"
      />

      <path
        d="M20 8 L30 27 L25 25 Z"
        fill="rgba(255,255,255,0.13)"
      />

      <path
        d="M20 3 L35 30 L26 26 L26 37 L14 37 L14 26 L5 30 Z"
        stroke="rgba(0,0,0,0.5)"
        stroke-width="1"
        stroke-linejoin="round"
        fill="none"
      />

    </svg>
  `;
}

function angleDiff(
  from,
  to
) {
  return (
    ((to - from) % 360 + 540) % 360
  ) - 180;
}

function pitchToOpacity(
  pitch
) {
  if (pitch > 0) {
    return 0;
  }

  return (
    Math.min(
      1,
      (-pitch) / 10
    ) * 0.95
  );
}

function isHotspotInView(
  yaw,
  hotspotYaw,
  hfov
) {
  return (
    Math.abs(
      angleDiff(
        yaw,
        hotspotYaw
      )
    ) <
    hfov / 2 + 10
  );
}

function buildArrows(
  scene,
  navigate
) {
  const layer =
    document.getElementById(
      "arrow-layer"
    );

  layer.innerHTML = "";

  arrowElements = [];

  if (arrowRafId) {
    cancelAnimationFrame(
      arrowRafId
    );

    arrowRafId = null;
  }

  if (
    !scene.hotspots?.length
  ) {
    return;
  }

  scene.hotspots.forEach(
    hotspot => {

      const el =
        document.createElement(
          "div"
        );

      el.className =
        "nav-arrow in-view";

      el.innerHTML = `
        ${makeArrowSVG()}

        <div class="arrow-label">
          ${hotspot.text}
        </div>
      `;

      const label =
        el.querySelector(
          ".arrow-label"
        );

      el.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          navigate(
            hotspot.target
          );
        }
      );

      el.addEventListener(
        "touchend",
        event => {

          event.preventDefault();

          event.stopPropagation();

          navigate(
            hotspot.target
          );
        },
        {
          passive: false
        }
      );

      layer.appendChild(el);

      arrowElements.push({
        el,
        label,
        hotspot
      });
    }
  );

  updateArrows();
}

function updateArrows() {
  const viewer =
    activeViewer();

  if (!viewer) {

    arrowRafId =
      requestAnimationFrame(
        updateArrows
      );

    return;
  }

  let pitch = 0;
  let yaw = 0;
  let hfov = 100;

  try {

    pitch =
      viewer.getPitch();

    yaw =
      viewer.getYaw();

    hfov =
      viewer.getHfov();

  } catch {}

  document
    .getElementById(
      "arrow-layer"
    )
    .style.opacity =
      pitchToOpacity(
        pitch
      );

  arrowElements.forEach(
    ({
      el,
      label,
      hotspot
    }) => {

      const delta =
        angleDiff(
          yaw,
          hotspot.yaw
        );

      const inView =
        isHotspotInView(
          yaw,
          hotspot.yaw,
          hfov
        );

      el.style.transform =
        `rotate(${delta}deg)`;

      label.style.transform =
        `translateX(-50%) rotate(${-delta}deg)`;

      el.classList.toggle(
        "in-view",
        inView
      );

      el.classList.toggle(
        "out-of-view",
        !inView
      );

      el.classList.toggle(
        "facing",
        inView &&
        Math.abs(delta) < 20
      );
    }
  );

  arrowRafId =
    requestAnimationFrame(
      updateArrows
    );
}

/* ─────────────────────────────────────────
   RESET VIEWER
───────────────────────────────────────── */

export function resetViewer() {

  stopAutoRotate();

  userIsInteracting = false;

  currentScene = null;

  arrowElements = [];

  if (arrowRafId) {

    cancelAnimationFrame(
      arrowRafId
    );

    arrowRafId = null;
  }

  ["a", "b"].forEach(id => {

    if (viewers[id]) {

      try {
        viewers[id].destroy();
      } catch {}

      viewers[id] = null;
    }

    panoEl(id)
      .classList
      .add("hidden-pano");
  });

  document
    .getElementById(
      "arrow-layer"
    )
    .innerHTML = "";
}

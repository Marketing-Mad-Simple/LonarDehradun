let currentScene = null;
let activeId = "a";

const viewers = {
  a: null,
  b: null
};

let scenePillTimer = null;
let arrowElements = [];
let arrowRafId = null;


/* =========================================================
   AUTO ROTATION
========================================================= */

const AUTO_ROTATE_DELAY = 6000;
const AUTO_ROTATE_SPEED = 4;

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

  if (!viewer || userIsInteracting) {
    return;
  }

  try {
    viewer.startAutoRotate(AUTO_ROTATE_SPEED);
  } catch {}
}

function scheduleAutoRotate() {
  clearTimeout(autoRotateTimer);
  autoRotateTimer = null;

  if (!currentScene) {
    return;
  }

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

  autoRotateTimer = setTimeout(() => {
    userIsInteracting = false;
    scheduleAutoRotate();
  }, 300);
}


/* =========================================================
   GENERAL HELPERS
========================================================= */

const MAX_TEX = (() => {
  try {
    const canvas =
      document.createElement("canvas");

    const gl =
      canvas.getContext("webgl") ||
      canvas.getContext(
        "experimental-webgl"
      );

    return gl
      ? gl.getParameter(
          gl.MAX_TEXTURE_SIZE
        )
      : 4096;

  } catch {
    return 4096;
  }
})();


function panoEl(id) {
  return document.getElementById(
    `pano-${id}`
  );
}


function inactiveId() {
  return activeId === "a"
    ? "b"
    : "a";
}


function showOverlay(show) {
  const overlay =
    document.getElementById(
      "load-overlay"
    );

  if (!overlay) {
    return;
  }

  overlay.classList.toggle(
    "hidden",
    !show
  );
}


function setQualityBadge(label) {
  const badge =
    document.getElementById(
      "quality-badge"
    );

  if (!badge) {
    return;
  }

  badge.textContent =
    label;

  badge.style.opacity =
    "1";
}


function showScenePill(scene) {
  const group =
    document.getElementById(
      "scene-group-display"
    );

  const name =
    document.getElementById(
      "scene-name-display"
    );

  const pill =
    document.getElementById(
      "scene-pill"
    );

  if (group) {
    group.textContent =
      scene.group;
  }

  if (name) {
    name.textContent =
      scene.name;
  }

  if (!pill) {
    return;
  }

  pill.classList.add(
    "show"
  );

  clearTimeout(
    scenePillTimer
  );

  scenePillTimer =
    setTimeout(() => {
      pill.classList.remove(
        "show"
      );
    }, 2200);
}


/* =========================================================
   PANNELLUM VIEWER
========================================================= */

function makeViewer(
  divId,
  panorama,
  opts,
  navigate
) {
  const el =
    panoEl(divId);

  if (!el) {
    return null;
  }

  if (viewers[divId]) {
    try {
      viewers[divId].destroy();
    } catch {}

    viewers[divId] =
      null;
  }

  el.addEventListener(
    "mousedown",
    registerUserInteraction
  );

  el.addEventListener(
    "touchstart",
    registerUserInteraction,
    {
      passive: true
    }
  );

  el.addEventListener(
    "pointerdown",
    registerUserInteraction
  );

  viewers[divId] =
    pannellum.viewer(
      el,
      {
        type:
          "equirectangular",

        panorama:
          panorama,

        autoLoad:
          true,

        showControls:
          false,

        compass:
          false,

        showFullscreenCtrl:
          false,

        showZoomCtrl:
          false,

        mouseZoom:
          false,

        minHfov:
          60,

        maxHfov:
          120,

        hfov:
          opts.hfov || 100,

        pitch:
          opts.pitch || 0,

        yaw:
          opts.yaw || 0,

        hotSpots: []
      }
    );

  return viewers[divId];
}


/* =========================================================
   QUALITY CROSSFADE
========================================================= */

function crossfade(
  scene,
  nextUrl,
  navigate,
  onDone
) {
  if (
    currentScene?.id !==
    scene.id
  ) {
    return;
  }

  const av =
    activeViewer();

  const pitch =
    av
      ? av.getPitch()
      : 0;

  const yaw =
    av
      ? av.getYaw()
      : 0;

  const hfov =
    av
      ? av.getHfov()
      : 100;

  const nextId =
    inactiveId();

  const viewer =
    makeViewer(
      nextId,
      nextUrl,
      {
        pitch,
        yaw,
        hfov
      },
      navigate
    );

  if (!viewer) {
    return;
  }

  viewer.on(
    "load",
    () => {

      if (
        currentScene?.id !==
        scene.id
      ) {
        return;
      }

      const active =
        activeViewer();

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
        .remove(
          "hidden-pano"
        );

      panoEl(activeId)
        .classList
        .add(
          "hidden-pano"
        );

      setTimeout(
        () => {

          if (
            currentScene?.id !==
            scene.id
          ) {
            return;
          }

          const oldId =
            activeId;

          activeId =
            nextId;

          if (
            viewers[oldId]
          ) {
            try {
              viewers[
                oldId
              ].destroy();
            } catch {}

            viewers[oldId] =
              null;
          }

          userIsInteracting =
            false;

          scheduleAutoRotate();

          onDone();

        },
        650
      );
    }
  );

  viewer.on(
    "error",
    () => {}
  );
}


/* =========================================================
   LOAD SCENE
========================================================= */

export function loadScene(
  scene,
  navigate
) {
  stopAutoRotate();

  userIsInteracting =
    false;

  if (!scene) {
    return;
  }

  if (
    currentScene?.id ===
    scene.id
  ) {
    return;
  }

  currentScene =
    scene;

  showScenePill(
    scene
  );

  document
    .querySelectorAll(
      ".scene-pill-btn"
    )
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.id ===
        scene.id
      );

    });

  showOverlay(true);

  setQualityBadge(
    "25%"
  );

  ["a", "b"]
    .forEach(id => {

      if (
        viewers[id]
      ) {
        try {
          viewers[id].destroy();
        } catch {}

        viewers[id] =
          null;
      }

      const element =
        panoEl(id);

      if (element) {
        element.classList.add(
          "hidden-pano"
        );
      }
    });

  activeId =
    "a";

  const viewer =
    makeViewer(
      "a",
      scene.images.low,
      {},
      navigate
    );

  if (!viewer) {
    return;
  }

  panoEl("a")
    .classList
    .remove(
      "hidden-pano"
    );

  viewer.on(
    "load",
    () => {

      showOverlay(false);

      setQualityBadge(
        "25%"
      );

      userIsInteracting =
        false;

      scheduleAutoRotate();

      buildArrows(
        scene,
        navigate
      );

      loadQuality(
        scene,
        scene.images.medium,
        "50%",
        navigate,
        () => {

          loadQuality(
            scene,
            scene.images.high,
            "HD",
            navigate,
            () => {

              setTimeout(
                () => {

                  const badge =
                    document.getElementById(
                      "quality-badge"
                    );

                  if (badge) {
                    badge.style.opacity =
                      "0";
                  }

                },
                2000
              );

            }
          );

        }
      );
    }
  );

  viewer.on(
    "error",
    () => {
      showOverlay(false);
    }
  );
}


/* =========================================================
   PROGRESSIVE QUALITY LOADING
========================================================= */

function loadQuality(
  scene,
  url,
  label,
  navigate,
  onDone
) {
  if (
    currentScene?.id !==
    scene.id
  ) {
    return;
  }

  const img =
    new Image();

  img.onload =
    () => {

      if (
        img.naturalWidth >
        MAX_TEX
      ) {
        onDone();
        return;
      }

      crossfade(
        scene,
        url,
        navigate,
        () => {

          setQualityBadge(
            label
          );

          onDone();

        }
      );
    };

  img.onerror =
    () => {
      onDone();
    };

  img.src =
    url;
}


/* =========================================================
   YAW-ONLY 2D NAVIGATION ARROWS
========================================================= */

const ARROW_BASE_OPACITY =
  0.35;

const ARROW_ACTIVE_OPACITY =
  1.0;

const ARROW_CLICK_RANGE =
  5;

const ARROW_FADE_RANGE =
  45;


/*
  Convert any yaw into
  -180° to +180°.
*/

function normalizeYaw(yaw) {

  return (
    ((yaw + 180) % 360 + 360) %
    360
  ) - 180;

}


/*
  Find the shortest angular
  difference between the current
  direction and the target.
*/

function getYawDifference(
  currentYaw,
  targetYaw
) {

  let difference =
    normalizeYaw(
      targetYaw
    ) -
    normalizeYaw(
      currentYaw
    );

  if (difference > 180) {
    difference -= 360;
  }

  if (difference < -180) {
    difference += 360;
  }

  return difference;
}


/*
  Creates a completely 2D arrow.
*/

function createFloatingArrow(
  hotspot,
  navigate
) {

  const arrow =
    document.createElement(
      "button"
    );

  arrow.type =
    "button";

  arrow.className =
    "nav-arrow";

  arrow.innerHTML = `
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
        d="M20 3 L35 30 L26 26 L26 37 L14 37 L14 26 L5 30 Z"
        stroke="rgba(0,0,0,0.5)"
        stroke-width="1"
        stroke-linejoin="round"
        fill="none"
      />
    </svg>

    <div class="arrow-label">
      ${hotspot.text}
    </div>
  `;

  arrow.disabled =
    true;

  arrow.style.pointerEvents =
    "none";

  arrow.addEventListener(
    "click",
    event => {

      if (
        arrow.disabled
      ) {
        return;
      }

      event.preventDefault();

      event.stopPropagation();

      registerUserInteraction();

      navigate(
        hotspot.target
      );

    }
  );

  return arrow;
}


/*
  Build the 2D arrow layer.
*/

function buildArrows(
  scene,
  navigate
) {

  const layer =
    document.getElementById(
      "arrow-layer"
    );

  if (!layer) {
    return;
  }

  layer.innerHTML =
    "";

  arrowElements =
    [];

  if (arrowRafId) {

    cancelAnimationFrame(
      arrowRafId
    );

    arrowRafId =
      null;
  }

  const hotspots =
    scene.hotspots || [];

  if (!hotspots.length) {
    return;
  }

  hotspots.forEach(
    hotspot => {

      const arrow =
        createFloatingArrow(
          hotspot,
          navigate
        );

      layer.appendChild(
        arrow
      );

      arrowElements.push({
        arrow,
        hotspot
      });

    }
  );

  updateFloatingArrows();
}


/*
  Update ONLY using yaw.

  No pitch.
  No Pannellum hotspot positioning.
*/

function updateFloatingArrows() {

  const viewer =
    activeViewer();

  if (!viewer) {

    arrowRafId =
      requestAnimationFrame(
        updateFloatingArrows
      );

    return;
  }

  let currentYaw =
    0;

  let hfov =
    100;

  try {

    currentYaw =
      viewer.getYaw();

    hfov =
      viewer.getHfov();

  } catch {}


  /*
    Half the visible horizontal
    field of view.
  */

  const halfHfov =
    hfov / 2;


  arrowElements.forEach(
    ({
      arrow,
      hotspot
    }) => {

      const difference =
        getYawDifference(
          currentYaw,
          hotspot.yaw
        );

      const distance =
        Math.abs(
          difference
        );


      /*
        Determine horizontal
        screen position.

        50% = centre.

        Negative = left.

        Positive = right.
      */

      let screenX =
        50;


      if (
        distance <=
        halfHfov
      ) {

        screenX =
          50 +
          (
            difference /
            halfHfov
          ) *
          42;

      } else {

        /*
          Target is outside the
          visible area.

          Place arrow at the
          appropriate edge.
        */

        screenX =
          difference > 0
            ? 94
            : 6;

      }


      screenX =
        Math.max(
          6,
          Math.min(
            94,
            screenX
          )
        );


      arrow.style.left =
        `${screenX}%`;


      /*
        Opacity.

        45°+ away:
          35%

        Approaching target:
          gradual increase

        ±5°:
          100%
      */

      let opacity;


      if (
        distance <=
        ARROW_CLICK_RANGE
      ) {

        opacity =
          ARROW_ACTIVE_OPACITY;

      } else if (
        distance >=
        ARROW_FADE_RANGE
      ) {

        opacity =
          ARROW_BASE_OPACITY;

      } else {

        const progress =
          (
            ARROW_FADE_RANGE -
            distance
          ) /
          (
            ARROW_FADE_RANGE -
            ARROW_CLICK_RANGE
          );

        opacity =
          ARROW_BASE_OPACITY +
          (
            ARROW_ACTIVE_OPACITY -
            ARROW_BASE_OPACITY
          ) *
          progress;

      }


      arrow.style.opacity =
        opacity.toFixed(2);


      /*
        Only ±5° is clickable.
      */

      const isActive =
        distance <=
        ARROW_CLICK_RANGE;


      arrow.disabled =
        !isActive;


      arrow.style.pointerEvents =
        isActive
          ? "auto"
          : "none";


      arrow.classList.toggle(
        "facing",
        isActive
      );


      arrow.classList.toggle(
        "out-of-view",
        !isActive
      );

    }
  );


  arrowRafId =
    requestAnimationFrame(
      updateFloatingArrows
    );
}


/* =========================================================
   RESET
========================================================= */

export function resetViewer() {

  stopAutoRotate();

  userIsInteracting =
    false;

  currentScene =
    null;

  arrowElements =
    [];


  if (arrowRafId) {

    cancelAnimationFrame(
      arrowRafId
    );

    arrowRafId =
      null;
  }


  const arrowLayer =
    document.getElementById(
      "arrow-layer"
    );

  if (arrowLayer) {

    arrowLayer.innerHTML =
      "";

  }

}

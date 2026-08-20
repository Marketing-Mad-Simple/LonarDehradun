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
   TEMPORARY COORDINATE DISPLAY
========================================================= */

let coordinateDisplayRaf = null;

function createCoordinateDisplay() {

  let display =
    document.getElementById(
      "coordinates-display"
    );

  if (display) {
    return display;
  }

  display =
    document.createElement("div");

  display.id =
    "coordinates-display";

  display.textContent =
    "Yaw: 0.00° | Pitch: 0.00°";

  display.style.position =
    "fixed";

  display.style.top =
    "20px";

  display.style.left =
    "50%";

  display.style.transform =
    "translateX(-50%)";

  display.style.zIndex =
    "999999";

  display.style.padding =
    "9px 14px";

  display.style.background =
    "rgba(0,0,0,0.8)";

  display.style.color =
    "#ffffff";

  display.style.fontFamily =
    "monospace";

  display.style.fontSize =
    "14px";

  display.style.borderRadius =
    "6px";

  display.style.pointerEvents =
    "none";

  display.style.whiteSpace =
    "nowrap";

  document.body.appendChild(display);

  return display;
}

function updateCoordinateDisplay() {

  const viewer =
    activeViewer();

  const display =
    createCoordinateDisplay();

  if (!viewer) {

    coordinateDisplayRaf =
      requestAnimationFrame(
        updateCoordinateDisplay
      );

    return;
  }

  try {

    const yaw =
      viewer.getYaw();

    const pitch =
      viewer.getPitch();

    display.textContent =
      `Yaw: ${yaw.toFixed(2)}° | Pitch: ${pitch.toFixed(2)}°`;

  } catch {}

  coordinateDisplayRaf =
    requestAnimationFrame(
      updateCoordinateDisplay
    );
}

function startCoordinateDisplay() {

  if (coordinateDisplayRaf) {
    return;
  }

  coordinateDisplayRaf =
    requestAnimationFrame(
      updateCoordinateDisplay
    );
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
   PANNELLUM HOTSPOTS
========================================================= */

function buildHotspots(
  scene,
  navigate
) {

  /*
    We no longer use Pannellum's physical
    hotspot positioning for navigation arrows.

    This function is retained so the viewer
    architecture remains compatible with
    future non-navigation hotspots.
  */

  return [];
}


function bindHotspotTouch(
  containerId,
  navigate
) {

  const el =
    panoEl(containerId);

  if (
    !el ||
    el._hotspotDelegated
  ) {
    return;
  }

  el._hotspotDelegated =
    true;

  let touchMoved =
    false;

  el.addEventListener(
    "touchstart",
    () => {

      touchMoved =
        false;

    },
    {
      passive: true
    }
  );

  el.addEventListener(
    "touchmove",
    () => {

      touchMoved =
        true;

    },
    {
      passive: true
    }
  );

  el.addEventListener(
    "touchend",
    event => {

      if (touchMoved) {
        return;
      }

      const hotspot =
        event.target.closest(
          ".pnlm-hotspot"
        );

      if (!hotspot) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const sceneId =
        hotspot.getAttribute(
          "data-scene-id"
        ) ||
        hotspot.dataset.sceneId;

      if (sceneId) {
        navigate(sceneId);
      }

    },
    {
      passive: false
    }
  );
}


/* =========================================================
   CREATE PANNELLUM VIEWER
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

        hotSpots:
          opts.hotSpots || []
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
        hfov,

        hotSpots:
          []
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


          bindHotspotTouch(
            activeId,
            navigate
          );


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

  startCoordinateDisplay();

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
      {
        hotSpots: []
      },
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

      bindHotspotTouch(
        "a",
        navigate
      );

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
   YAW-BASED FLOATING ARROWS
========================================================= */

/*
  Behaviour:

  - Arrow stays at a fixed vertical position.
  - Horizontal position is determined by target yaw.
  - 35% minimum opacity.
  - Opacity increases as user turns toward target.
  - Within ±5°:
      100% opacity
      clickable
  - Outside ±5°:
      not clickable
  - No pitch is used.
*/

const ARROW_BASE_OPACITY = 0.35;
const ARROW_ACTIVE_OPACITY = 1.0;

const ARROW_CLICK_RANGE = 5;

const ARROW_FADE_RANGE = 45;

function normalizeYaw(
  yaw
) {

  return (
    ((yaw + 180) % 360 + 360) %
    360
  ) - 180;

}


function shortestYawDifference(
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
    "floating-nav-arrow";


  arrow.setAttribute(
    "aria-label",
    `Go to ${hotspot.text}`
  );


  arrow.innerHTML = `
    <div class="floating-arrow-icon">
      ↑
    </div>

    <div class="floating-arrow-label">
      ${hotspot.text}
    </div>
  `;


  /*
    IMPORTANT:
    The arrow itself is initially
    not clickable.
  */

  arrow.disabled =
    true;


  arrow.style.position =
    "absolute";

  arrow.style.top =
    "72%";

  arrow.style.left =
    "50%";

  arrow.style.transform =
    "translate(-50%, -50%)";

  arrow.style.zIndex =
    "1000";

  arrow.style.opacity =
    ARROW_BASE_OPACITY;

  arrow.style.pointerEvents =
    "none";

  arrow.style.transition =
    "opacity 0.12s ease, left 0.08s linear";


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


function styleFloatingArrow(
  arrow
) {

  arrow.style.background =
    "transparent";

  arrow.style.border =
    "none";

  arrow.style.padding =
    "8px";

  arrow.style.margin =
    "0";

  arrow.style.color =
    "#ffffff";

  arrow.style.cursor =
    "pointer";

  arrow.style.textAlign =
    "center";

  arrow.style.userSelect =
    "none";

  arrow.style.webkitTapHighlightColor =
    "transparent";


  const icon =
    arrow.querySelector(
      ".floating-arrow-icon"
    );

  if (icon) {

    icon.style.width =
      "46px";

    icon.style.height =
      "46px";

    icon.style.borderRadius =
      "50%";

    icon.style.display =
      "flex";

    icon.style.alignItems =
      "center";

    icon.style.justifyContent =
      "center";

    icon.style.background =
      "rgba(0,0,0,0.45)";

    icon.style.border =
      "1px solid rgba(255,255,255,0.55)";

    icon.style.fontSize =
      "25px";

    icon.style.fontWeight =
      "600";

  }


  const label =
    arrow.querySelector(
      ".floating-arrow-label"
    );

  if (label) {

    label.style.marginTop =
      "5px";

    label.style.padding =
      "4px 8px";

    label.style.borderRadius =
      "4px";

    label.style.background =
      "rgba(0,0,0,0.55)";

    label.style.fontSize =
      "12px";

    label.style.whiteSpace =
      "nowrap";

  }

}


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


      styleFloatingArrow(
        arrow
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


  try {

    currentYaw =
      viewer.getYaw();

  } catch {}


  /*
    We use the viewer's horizontal
    field of view to determine where
    the arrow should appear.

    The centre of the screen represents
    the current yaw.

    The edges represent approximately
    half the horizontal field of view.
  */

  let hfov =
    100;


  try {

    hfov =
      viewer.getHfov();

  } catch {}


  const halfHfov =
    hfov / 2;


  arrowElements.forEach(
    ({
      arrow,
      hotspot
    }) => {

      const difference =
        shortestYawDifference(
          currentYaw,
          hotspot.yaw
        );


      const absoluteDifference =
        Math.abs(
          difference
        );


      /*
        Calculate horizontal screen
        position.

        Centre = 50%

        Negative difference =
        target is to the left.

        Positive difference =
        target is to the right.
      */

      let screenPosition =
        50;


      if (
        absoluteDifference <=
        halfHfov
      ) {

        screenPosition =
          50 +
          (
            difference /
            halfHfov
          ) *
          45;

      } else {

        /*
          Target is outside the
          current camera view.

          Keep the arrow at the
          corresponding edge.
        */

        screenPosition =
          difference > 0
            ? 94
            : 6;

      }


      screenPosition =
        Math.max(
          6,
          Math.min(
            94,
            screenPosition
          )
        );


      arrow.style.left =
        `${screenPosition}%`;


      /*
        Opacity behaviour:

        >= 45° away:
          35%

        45° → 5°:
          gradually increases

        <= 5°:
          100%
      */

      let opacity;


      if (
        absoluteDifference <=
        ARROW_CLICK_RANGE
      ) {

        opacity =
          ARROW_ACTIVE_OPACITY;

      } else if (
        absoluteDifference >=
        ARROW_FADE_RANGE
      ) {

        opacity =
          ARROW_BASE_OPACITY;

      } else {

        const progress =
          (
            ARROW_FADE_RANGE -
            absoluteDifference
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
        Clickable only within ±5°.
      */

      const active =
        absoluteDifference <=
        ARROW_CLICK_RANGE;


      arrow.disabled =
        !active;


      arrow.style.pointerEvents =
        active
          ? "auto"
          : "none";


      arrow.style.cursor =
        active
          ? "pointer"
          : "default";


      arrow.classList.toggle(
        "active",
        active
      );


      arrow.classList.toggle(
        "inactive",
        !active
      );

    }
  );


  arrowRafId =
    requestAnimationFrame(
      updateFloatingArrows
    );
}


/* =========================================================
   RESET VIEWER
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


  if (coordinateDisplayRaf) {

    cancelAnimationFrame(
      coordinateDisplayRaf
    );

    coordinateDisplayRaf =
      null;
  }


  const coordinateDisplay =
    document.getElementById(
      "coordinates-display"
    );


  if (coordinateDisplay) {
    coordinateDisplay.remove();
  }


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


  const arrowLayer =
    document.getElementById(
      "arrow-layer"
    );


  if (arrowLayer) {

    arrowLayer.innerHTML =
      "";

  }

}

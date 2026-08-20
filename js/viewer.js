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

/*
  This creates the coordinate display automatically.
  Therefore index.html does NOT need to be edited.
*/

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
   HOTSPOTS
========================================================= */

function buildHotspots(
  scene,
  navigate
) {

  return (
    scene.hotspots || []
  ).map(hotspot => ({

    type: "scene",

    pitch:
      hotspot.pitch,

    yaw:
      hotspot.yaw,

    text:
      hotspot.text,

    sceneId:
      hotspot.target,

    createTooltipFunc:
      hotspotDiv => {

        hotspotDiv.setAttribute(
          "data-scene-id",
          hotspot.target
        );

      },

    clickHandlerFunc:
      () => {

        navigate(
          hotspot.target
        );

      }

  }));

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

        navigate(
          sceneId
        );

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


  /*
    Mouse / touch / pointer interaction
    stops automatic rotation.
  */

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
   CROSSFADE BETWEEN QUALITY LEVELS
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
          buildHotspots(
            scene,
            navigate
          )

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

  /*
    Start coordinate display.
  */

  startCoordinateDisplay();


  /*
    Stop rotation from previous scene.
  */

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


  /*
    Destroy previous viewers.
  */

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


  /*
    Load LOW quality.
  */

  const viewer =
    makeViewer(
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


      /*
        MEDIUM quality.
      */

      loadQuality(
        scene,
        scene.images.medium,
        "50%",
        navigate,
        () => {

          /*
            HIGH quality.
          */

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
   QUALITY LOADING
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
   NAVIGATION ARROWS
========================================================= */

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
    (
      (to - from) %
      360 +
      540
    ) %
    360
  ) - 180;

}


function pitchToOpacity(
  pitch
) {

  if (
    pitch > 0
  ) {
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


      layer.appendChild(
        el
      );


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


  const layer =
    document.getElementById(
      "arrow-layer"
    );


  if (layer) {

    layer.style.opacity =
      pitchToOpacity(
        pitch
      );

  }


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


      if (label) {

        label.style.transform =
          `translateX(-50%) rotate(${-delta}deg)`;

      }


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

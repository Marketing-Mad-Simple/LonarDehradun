
import { loadScene, resetViewer } from "./viewer.js";

let activeProperty = null;

export function setActiveProperty(property) {
  activeProperty = property;
}

export function getActiveProperty() {
  return activeProperty;
}

export function buildSceneNav(property) {
  const nav = document.getElementById("scene-nav");
  nav.innerHTML = "";

  let lastGroup = null;

  property.scenes.forEach(scene => {
    if (scene.group !== lastGroup) {
      if (lastGroup !== null) {
        const separator = document.createElement("div");
        separator.style.cssText =
          "flex-shrink:0;width:1px;background:rgba(255,255,255,0.1);align-self:stretch;margin:6px 2px;";
        nav.appendChild(separator);
      }

      const label = document.createElement("div");
      label.className = "nav-group-label";
      label.textContent = scene.group;
      nav.appendChild(label);

      lastGroup = scene.group;
    }

    const button = document.createElement("button");
    button.className = "scene-pill-btn";
    button.dataset.id = scene.id;
    button.textContent = scene.name;
    button.setAttribute("role", "listitem");
    button.setAttribute("aria-label", scene.name);

    button.addEventListener("click", () => {
      goToScene(scene.id);
    });

    nav.appendChild(button);
  });
}

export function goToScene(sceneId) {
  if (!activeProperty) return;

  const scene = activeProperty.scenes.find(item => item.id === sceneId);
  if (!scene) return;

  loadScene(scene, goToScene);
}

export function startProperty(property, showViewer) {
  activeProperty = property;

  document.getElementById("property-title").textContent = property.size;
  document.getElementById("property-variant").textContent = property.variant;
  document.getElementById("load-wordmark").textContent = "Lonar Group";

  buildSceneNav(property);

  showViewer();

  if (property.scenes.length > 0) {
    goToScene(property.scenes[0].id);
  } else {
    showEmptyPropertyMessage(property);
  }
}

function showEmptyPropertyMessage(property) {
  const overlay = document.getElementById("load-overlay");
  document.getElementById("load-wordmark").textContent =
    `${property.size} · ${property.variant} — scenes coming soon`;
  overlay.classList.remove("hidden");
  document.getElementById("quality-badge").style.opacity = "0";
}

export function resetToPropertySelector(showPropertyScreen) {
  resetViewer();
  activeProperty = null;
  document.getElementById("scene-nav").innerHTML = "";
  showPropertyScreen();
}

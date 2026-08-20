
import { PROPERTIES, getProperty } from "./properties.js";
import {
  setActiveProperty,
  startProperty,
  resetToPropertySelector
} from "./navigation.js";

const propertyScreen = document.getElementById("property-screen");
const variantScreen = document.getElementById("variant-screen");
const viewerScreen = document.getElementById("viewer-screen");
const propertyGrid = document.getElementById("property-grid");
const variantGrid = document.getElementById("variant-grid");
const variantPropertyLabel = document.getElementById("variant-property-label");

let selectedSize = null;

function showOnly(screen) {
  [propertyScreen, variantScreen, viewerScreen].forEach(item => {
    item.classList.toggle("hidden", item !== screen);
  });
}

function buildPropertySelector() {
  propertyGrid.innerHTML = "";

  const sizes = [...new Set(PROPERTIES.map(property => property.size))];

  sizes.forEach(size => {
    const variants = PROPERTIES.filter(property => property.size === size);

    const button = document.createElement("button");
    button.className = "property-card";
    button.type = "button";
    button.innerHTML = `
      <div class="card-kicker">Property</div>
      <div class="card-title">${size}</div>
      <div class="card-subtitle">${variants.length} variants available</div>
    `;

    button.addEventListener("click", () => {
      selectedSize = size;
      buildVariantSelector(size);
      showOnly(variantScreen);
    });

    propertyGrid.appendChild(button);
  });
}

function buildVariantSelector(size) {
  variantPropertyLabel.textContent = size;
  variantGrid.innerHTML = "";

  PROPERTIES
    .filter(property => property.size === size)
    .forEach(property => {
      const button = document.createElement("button");
      button.className = "variant-card";
      button.type = "button";
      button.innerHTML = `
        <div class="card-kicker">${property.size}</div>
        <div class="card-title">${property.variant}</div>
        <div class="card-subtitle">
          ${property.scenes.length ? `${property.scenes.length} scenes` : "Scenes will be added"}
        </div>
      `;

      button.addEventListener("click", () => {
        setActiveProperty(property);
        startProperty(property, () => showOnly(viewerScreen));
      });

      variantGrid.appendChild(button);
    });
}

document.getElementById("back-to-properties").addEventListener("click", () => {
  selectedSize = null;
  showOnly(propertyScreen);
});

document.getElementById("change-property").addEventListener("click", () => {
  resetToPropertySelector(() => {
    selectedSize = null;
    showOnly(propertyScreen);
  });
});

buildPropertySelector();
showOnly(propertyScreen);

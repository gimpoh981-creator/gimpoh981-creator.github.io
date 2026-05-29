const form = document.querySelector("#weather-form");
const summaryLocation = document.querySelector("#summary-location");
const summaryWeather = document.querySelector("#summary-weather");
const colorSwatches = document.querySelector("#color-swatches");
const colors = document.querySelector("#colors");
const materials = document.querySelector("#materials");
const items = document.querySelector("#items");
const outfitNote = document.querySelector("#outfit-note");
const outfitPhoto = document.querySelector("#outfit-photo");
const outfitImage = document.querySelector("#outfit-image");
const outfitCaption = document.querySelector("#outfit-caption");

const labels = {
  work: "\ucd9c\uadfc",
  school: "\ub4f1\uad50",
  date: "\ub370\uc774\ud2b8",
  outing: "\uac00\ubcbc\uc6b4 \uc678\ucd9c",
  exercise: "\uc6b4\ub3d9",
  formal: "\uaca9\uc2dd \uc788\ub294 \uc790\ub9ac"
};

const adjustments = {
  work: {
    item: "\uc2ac\ub799\uc2a4 \ub610\ub294 \ub2e8\uc815\ud55c \ud32c\uce20",
    tone: "\uc2e4\ub8e8\uc5e3\uc740 \ub2e8\uc815\ud558\uac8c, \uc0c9\uac10\uc740 \ucc28\ubd84\ud558\uac8c \uc7a1\uc73c\uba74 \ucd9c\uadfc\uc5d0 \uc798 \uc5b4\uc6b8\ub9bd\ub2c8\ub2e4."
  },
  school: {
    item: "\ud3b8\ud55c \ub370\ub2d8 \ub610\ub294 \ucf54\ud2bc \ud32c\uce20",
    tone: "\uc6c0\uc9c1\uc784\uc774 \ub9ce\uc740 \ud558\ub8e8\ub97c \uc0dd\uac01\ud574 \ud3b8\uc548\ud568\uacfc \uad00\ub9ac\ud558\uae30 \uc26c\uc6b4 \uc18c\uc7ac\ub97c \uc6b0\uc120\ud558\uc138\uc694."
  },
  date: {
    item: "\uae54\ub054\ud55c \uc154\uce20\ub098 \ubd80\ub4dc\ub7ec\uc6b4 \ub2c8\ud2b8 \ud3ec\uc778\ud2b8",
    tone: "\ubd80\ub4dc\ub7ec\uc6b4 \uc0c9 \ud558\ub098\ub97c \ud3ec\uc778\ud2b8\ub85c \ub450\uba74 \ub0a0\uc528\uc5d0 \ub9de\uc73c\uba74\uc11c\ub3c4 \uc778\uc0c1\uc774 \uc120\uba85\ud574\uc9d1\ub2c8\ub2e4."
  },
  outing: {
    item: "\uac00\ubcbc\uc6b4 \uc154\uce20\uc640 \ud3b8\ud55c \ud558\uc758",
    tone: "\uc624\ub798 \uac77\uae30 \uc88b\uc740 \ud3b8\uc548\ud55c \uc870\ud569\uc5d0 \uc791\uc740 \uc0c9 \ud3ec\uc778\ud2b8\ub97c \ub354\ud574\ubcf4\uc138\uc694."
  },
  exercise: {
    item: "\uae30\ub2a5\uc131 \ud2f0\uc154\uce20\uc640 \uc870\uac70 \ud32c\uce20",
    tone: "\ud1b5\uae30\uc131\uacfc \ud761\uc2b5\uc131\uc774 \uc88b\uc740 \uc544\uc774\ud15c \uc704\uc8fc\ub85c \uac00\ubccd\uac8c \uc785\ub294 \ud3b8\uc774 \uc88b\uc2b5\ub2c8\ub2e4."
  },
  formal: {
    item: "\uc7ac\ud0b7, \uc154\uce20, \uae54\ub054\ud55c \uad6c\ub450",
    tone: "\uc18c\uc7ac\ub294 \ud3b8\ud558\uac8c \uac00\uc838\uac00\ub418 \ud615\ud0dc\ub294 \ub2e8\uc815\ud558\uac8c \uc7a1\uc544 \uaca9\uc2dd\uc744 \uc720\uc9c0\ud558\uc138\uc694."
  }
};

const palettes = {
  hot: {
    names: "\ud654\uc774\ud2b8, \ub77c\uc774\ud2b8 \ube14\ub8e8, \uc138\uc774\uc9c0 \uadf8\ub9b0",
    swatches: ["#ffffff", "#9ccfe7", "#a8c9a5"]
  },
  humid: {
    names: "\ucfe8 \uadf8\ub808\uc774, \ub354\uc2a4\ud2f0 \ube14\ub8e8, \uae68\ub057\ud55c \ud654\uc774\ud2b8",
    swatches: ["#cfd6dc", "#7fa6bd", "#ffffff"]
  },
  rainy: {
    names: "\ucc28\ucf5c, \ub124\uc774\ube44, \uc62c\ub9ac\ube0c",
    swatches: ["#3e454d", "#243b5a", "#6f7d52"]
  },
  cold: {
    names: "\ub2e4\ud06c \ube0c\ub77c\uc6b4, \ub525 \uadf8\ub9b0, \ud06c\ub9bc",
    swatches: ["#4d3328", "#294b3b", "#f0e8d8"]
  },
  mild: {
    names: "\ub77c\uc774\ud2b8 \uadf8\ub808\uc774, \uc18c\ud504\ud2b8 \ube14\ub8e8, \uc6dc \ubca0\uc774\uc9c0",
    swatches: ["#d9dde1", "#9ebbd0", "#d7bea2"]
  }
};

function readForm() {
  const data = new FormData(form);

  return {
    location: String(data.get("location") || "\ud604\uc7ac \uc704\uce58").trim() || "\ud604\uc7ac \uc704\uce58",
    temperature: Number(data.get("temperature")),
    humidity: Number(data.get("humidity")),
    rain: String(data.get("rain")),
    occasion: String(data.get("occasion"))
  };
}

function recommend({ temperature, humidity, rain, occasion }) {
  const adjustment = adjustments[occasion];
  const rainy = rain !== "no";
  const humid = humidity >= 70;

  if (rainy) {
    return {
      palette: palettes.rainy,
      material: rain === "heavy"
        ? "\ubc29\uc218 \ub098\uc77c\ub860, \ud3f4\ub9ac \ud63c\ubc29, \ube60\ub974\uac8c \ub9c8\ub974\ub294 \uae30\ub2a5\uc131 \uc18c\uc7ac"
        : "\uc0dd\ud65c \ubc29\uc218 \uc18c\uc7ac, \uc587\uc740 \ucf54\ud2bc \ud63c\ubc29, \uac00\ubcbc\uc6b4 \ud569\uc131\uc12c\uc720",
      item: rain === "heavy"
        ? `\ud6c4\ub4dc \uc544\uc6b0\ud130, \uc5b4\ub450\uc6b4 \ud558\uc758, ${adjustment.item}`
        : `\uac00\ubcbc\uc6b4 \ubc29\uc218 \uc7ac\ud0b7, \uc5b4\ub450\uc6b4 \ud558\uc758, ${adjustment.item}`,
      note: `\ube44\uac00 \uc624\ub294 \ub0a0\uc740 \ubb3c\uc774 \ud280\uc5b4\ub3c4 \ubd80\ub2f4\uc774 \uc801\uc740 \uc5b4\ub450\uc6b4 \ud558\uc758\uc640 \ube68\ub9ac \ub9c8\ub974\ub294 \uc18c\uc7ac\uac00 \uc88b\uc2b5\ub2c8\ub2e4. ${adjustment.tone}`,
      imageKey: "rainy"
    };
  }

  if (temperature >= 28) {
    return {
      palette: humid ? palettes.humid : palettes.hot,
      material: humid
        ? "\ub9ac\ub128, \uc2dc\uc5b4\uc11c\ucee4, \ud761\uc2b5\uc131\uc774 \uc88b\uc740 \uae30\ub2a5\uc131 \uba74"
        : "\uc587\uc740 \uba74, \ub9ac\ub128, \ud1b5\uae30\uc131 \uc88b\uc740 \ub2c8\ud2b8",
      item: `\ubc18\ud314 \uc154\uce20, \uc640\uc774\ub4dc \ud32c\uce20 \ub610\ub294 \uc1fc\uce20, ${adjustment.item}`,
      note: `\uae30\uc628\uc774 \ub192\uc544 \ub2f5\ub2f5\ud568\uc774 \uc27d\uac8c \ub290\uaef4\uc9c8 \uc218 \uc788\uc5b4 \ubc1d\uc740 \uc0c9\uacfc \uc5ec\uc720 \uc788\ub294 \ud54f\uc774 \uc798 \ub9de\uc2b5\ub2c8\ub2e4. ${adjustment.tone}`,
      imageKey: "hot"
    };
  }

  if (temperature <= 8) {
    return {
      palette: palettes.cold,
      material: "\uc6b8, \uae30\ubaa8 \ucf54\ud2bc, \ud50c\ub9ac\uc2a4, \ub450\uaed8\uac10 \uc788\ub294 \ub2c8\ud2b8",
      item: `\ub2c8\ud2b8, \ucf54\ud2b8 \ub610\ub294 \ud328\ub529, \ubcf4\uc628\uc131 \uc788\ub294 \ud558\uc758, ${adjustment.item}`,
      note: `\uccb4\uac10 \uc628\ub3c4\uac00 \ub0ae\uac8c \ub290\uaef4\uc9c8 \uc218 \uc788\uc73c\ub2c8 \ubcf4\uc628\uc131 \uc788\ub294 \uc18c\uc7ac\ub97c \uacb9\uccd0 \uc785\ub294 \ubc29\ud5a5\uc774 \uc88b\uc2b5\ub2c8\ub2e4. ${adjustment.tone}`,
      imageKey: "cold"
    };
  }

  if (temperature <= 17) {
    return {
      palette: palettes.mild,
      material: "\ud0c4\ud0c4\ud55c \ucf54\ud2bc, \uc587\uc740 \uc6b8 \ud63c\ubc29, \uac00\ubcbc\uc6b4 \ub370\ub2d8",
      item: `\uae34\ud314 \uc154\uce20, \uac00\ub514\uac74 \ub610\ub294 \uc7ac\ud0b7, ${adjustment.item}`,
      note: `\uc544\uce68\uc800\ub141 \uc628\ub3c4 \ucc28\ub97c \uace0\ub824\ud574 \ubc97\uae30 \uc26c\uc6b4 \uc587\uc740 \uac89\uc637\uc744 \ub354\ud574\ubcf4\uc138\uc694. ${adjustment.tone}`,
      imageKey: "mild"
    };
  }

  return {
    palette: humid ? palettes.humid : palettes.mild,
    material: humid
      ? "\uc587\uc740 \ucf54\ud2bc, \ub9ac\ub128 \ud63c\ubc29, \ud1b5\uae30\uc131 \uc88b\uc740 \uc18c\uc7ac"
      : "\uba74, \uc587\uc740 \ub2c8\ud2b8, \uac00\ubcbc\uc6b4 \ub370\ub2d8",
    item: `\uc587\uc740 \uc154\uce20, \ucf54\ud2bc \ud32c\uce20, \ud544\uc694\ud558\uba74 \uac00\ubcbc\uc6b4 \uc544\uc6b0\ud130, ${adjustment.item}`,
    note: `\ud65c\ub3d9\ud558\uae30 \uc88b\uc740 \ub0a0\uc528\ub77c \uc804\uccb4\uc801\uc73c\ub85c \uac00\ubccd\uac8c \uc785\ub418 \uc2e4\ub0b4 \ub0c9\ubc29\uc774\ub098 \uc800\ub141 \ubc14\ub78c\uc744 \ub300\ube44\ud558\uc138\uc694. ${adjustment.tone}`,
    imageKey: humid ? "humid" : "mild"
  };
}

function rainLabel(rain) {
  if (rain === "heavy") return "\ube44 \ub9ce\uc774 \uc634";
  if (rain === "light") return "\uac00\ubcbc\uc6b4 \ube44";
  return "\ube44 \uc5c6\uc74c";
}

const outfitImageKeywords = {
  hot: {
    photos: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80"
    ],
    caption: "\ub354\uc6b4 \ub0a0\uc5d0 \uc5b4\uc6b8\ub9ac\ub294 \ubc1d\uc740 \uc0c9\uac10\uacfc \ud1b5\uae30\uc131 \uc88b\uc740 \uc154\uce20 \uc870\ud569"
  },
  humid: {
    photos: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
    ],
    caption: "\uc2b5\ub3c4\uac00 \ub192\uc744 \ub54c \uc88b\uc740 \ud1b5\uae30\uc131 \uc911\uc2ec\uc758 \uac00\ubcbc\uc6b4 \uc2a4\ud0c0\uc77c"
  },
  rainy: {
    photos: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
    ],
    caption: "\ube44 \uc624\ub294 \ub0a0\uc5d0 \ud65c\uc6a9\ud558\uae30 \uc88b\uc740 \uc5b4\ub450\uc6b4 \uc0c9\uac10\uacfc \uc544\uc6b0\ud130 \uc870\ud569"
  },
  cold: {
    photos: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80"
    ],
    caption: "\ucd94\uc6b4 \ub0a0\uc5d0 \uc5b4\uc6b8\ub9ac\ub294 \ub808\uc774\uc5b4\ub4dc\uc640 \ub450\uaed8\uac10 \uc788\ub294 \uc544\uc6b0\ud130"
  },
  mild: {
    photos: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
    ],
    caption: "\uc120\uc120\ud55c \ub0a0\uc528\uc5d0 \uc27d\uac8c \uc785\uae30 \uc88b\uc740 \uc154\uce20\uc640 \uc790\uc5f0\uc2a4\ub7ec\uc6b4 \uc544\uc6b0\ud130"
  }
};

const occasionImageKeywords = {
  work: 0,
  school: 1,
  date: 2,
  outing: 1,
  exercise: 2,
  formal: 0
};

function buildOutfitImage(data, result) {
  const weatherSet = outfitImageKeywords[result.imageKey] || outfitImageKeywords.mild;
  const occasionIndex = occasionImageKeywords[data.occasion] || 0;
  const weatherIndex = Math.abs(Math.round(data.temperature) + Math.round(data.humidity / 10));
  const photoIndex = (occasionIndex + weatherIndex) % weatherSet.photos.length;

  return {
    src: weatherSet.photos[photoIndex],
    fallbackPhotos: weatherSet.photos.filter((_, index) => index !== photoIndex),
    caption: `${weatherSet.caption} \u00b7 ${labels[data.occasion]}`
  };
}

function buildFallbackImage(result) {
  const swatches = result.palette.swatches;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 560">
      <rect width="900" height="560" fill="#f4f7f8"/>
      <rect x="76" y="70" width="748" height="420" rx="28" fill="#ffffff"/>
      <circle cx="242" cy="190" r="64" fill="${swatches[1]}"/>
      <path d="M190 282 L294 282 L334 440 L150 440 Z" fill="${swatches[0]}"/>
      <path d="M366 146 H632 L684 440 H314 Z" fill="${swatches[1]}"/>
      <path d="M410 178 H588 L624 440 H374 Z" fill="${swatches[2]}"/>
      <path d="M378 146 L322 250 L366 278 L426 166 Z" fill="#202124" opacity=".16"/>
      <path d="M620 146 L678 250 L634 278 L574 166 Z" fill="#202124" opacity=".16"/>
      <rect x="404" y="440" width="52" height="72" rx="12" fill="#202124" opacity=".72"/>
      <rect x="544" y="440" width="52" height="72" rx="12" fill="#202124" opacity=".72"/>
      <text x="450" y="525" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#646a73">Weather Fit Guide</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function showOutfitImage(image, result) {
  const fallbacks = [...image.fallbackPhotos, buildFallbackImage(result)];

  outfitImage.onerror = () => {
    const next = fallbacks.shift();

    if (!next) return;
    outfitImage.src = next;
  };

  outfitImage.src = image.src;
  outfitImage.alt = image.caption;
  outfitCaption.textContent = image.caption;
  outfitPhoto.classList.remove("is-hidden");
}

function renderSwatches(swatchColors) {
  colorSwatches.innerHTML = "";

  swatchColors.forEach((color) => {
    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.style.backgroundColor = color;
    colorSwatches.append(swatch);
  });
}

function render() {
  const data = readForm();
  const result = recommend(data);

  summaryLocation.textContent = `${data.location} | ${labels[data.occasion]}`;
  summaryWeather.textContent = `${data.temperature}\u00b0C | \uc2b5\ub3c4 ${data.humidity}% | ${rainLabel(data.rain)}`;
  colors.textContent = result.palette.names;
  materials.textContent = result.material;
  items.textContent = result.item;
  outfitNote.textContent = result.note;
  renderSwatches(result.palette.swatches);

  return result;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = readForm();
  const result = render();
  const image = buildOutfitImage(data, result);

  showOutfitImage(image, result);
});

form.addEventListener("input", render);
form.addEventListener("change", render);

render();

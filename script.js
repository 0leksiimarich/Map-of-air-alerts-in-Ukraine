const themeToggle = document.getElementById("themeToggle");
const reloadBtn = document.getElementById("reloadMap");
const citySelect = document.getElementById("citySelect");
const alertCitiesDiv = document.getElementById("alertCities");
const droneCitiesDiv = document.getElementById("droneCities");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

setTheme(localStorage.getItem("theme") || "light");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

// --- Ініціалізація карти (чорно-біла)
const map = L.map("map").setView([49.0, 32.0], 6);
L.tileLayer("https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

let cityMarkers = {};
let droneMarkers = {};

// --- Міста і їхні координати
const cities = {
  kyiv: [50.45, 30.523],
  lviv: [49.8397, 24.0297],
  kharkiv: [49.9935, 36.2304],
  odesa: [46.4825, 30.7233],
  dnipro: [48.4647, 35.0462],
  zaporizhzhia: [47.8388, 35.1396],
  vinnytsia: [49.2331, 28.4682],
  ternopil: [49.5535, 25.5948],
  "ivano-frankivsk": [48.9226, 24.7111],
  rivne: [50.6199, 26.2516],
  zhytomyr: [50.2547, 28.6587],
  chernihiv: [51.5055, 31.2849],
  chernivtsi: [48.2915, 25.9403],
  sumy: [50.9077, 34.7981],
  kropyvnytskyi: [48.5184, 32.2597],
  mykolaiv: [46.9750, 31.9946],
  lutsk: [50.7472, 25.3254],
  kherson: [46.6354, 32.6169],
  poltava: [49.5883, 34.5514],
  khmelnytskyi: [49.4216, 26.9965],
  cherkasy: [49.4444, 32.0598]
};

// --- Ініціалізація маркерів
for (const [city, coords] of Object.entries(cities)) {
  const marker = L.circleMarker(coords, { radius: 10, color: "blue", fillColor: "blue", fillOpacity: 0.8 })
    .addTo(map)
    .bindPopup(city);
  cityMarkers[city] = marker;
}

// --- Дрони (приклад координат)
const drones = {
  kyiv: [50.46, 30.52],
  lviv: [49.84, 24.03]
};

// --- Маркери дронів
for (const [city, coords] of Object.entries(drones)) {
  const marker = L.circleMarker(coords, { radius: 6, color: "yellow", fillColor: "yellow", fillOpacity: 0.9 })
    .addTo(map)
    .bindPopup(`Дрон в ${city}`);
  droneMarkers[city] = marker;
}

// --- Статуси міст
let cityStatus = {};
for (const city in cities) cityStatus[city] = "off";

// --- Завантаження даних і оновлення маркерів
function updateMap() {
  alertCitiesDiv.innerHTML = "";
  droneCitiesDiv.innerHTML = "";

  // Приклад: тут ти підключаєш свій API або alerts.in.ua
  // Ми просто демонструємо логіку
  const alertsExample = ["kyiv", "lviv"]; // міста з повітряною
  const highExample = ["kharkiv"];         // підвищена небезпека
  const dronesExample = ["kyiv", "lviv"];  // де літають дрони

  for (const city in cityStatus) cityStatus[city] = "off";

  alertsExample.forEach(c => cityStatus[c] = "on");
  highExample.forEach(c => cityStatus[c] = "high");

  for (const [city, marker] of Object.entries(cityMarkers)) {
    const status = cityStatus[city];
    if (status === "on") marker.setStyle({ color: "red", fillColor: "red" });
    else if (status === "high") marker.setStyle({ color: "orange", fillColor: "orange" });
    else marker.setStyle({ color: "blue", fillColor: "blue" });
  }

  // Оновлюємо блок під картою
  alertCitiesDiv.innerHTML = `<b>Повітряна тривога:</b> ${alertsExample.join(", ") || "немає"}`;
  droneCitiesDiv.innerHTML = `<b>Дрони літають в:</b> ${dronesExample.join(", ") || "немає"}`;
}

// --- Кнопка оновлення
reloadBtn.addEventListener("click", updateMap);

// --- При старті
updateMap();

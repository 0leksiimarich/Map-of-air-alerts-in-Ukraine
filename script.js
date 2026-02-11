const themeToggle = document.getElementById("themeToggle");
const reloadBtn = document.getElementById("reloadMap");
const citySelect = document.getElementById("citySelect");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

// Ініціалізація карти
const map = L.map("map").setView([49.0, 32.0], 6);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

let markers = [];

// Функція завантаження тривог
function loadAlerts(city = "") {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  const url = "https://alerts.in.ua/data.json"; // приклад відкритого JSON

  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.forEach(alert => {
        if (!city || alert.city.toLowerCase() === city) {
          const marker = L.marker([alert.lat, alert.lon])
            .addTo(map)
            .bindPopup(`<b>${alert.city}</b><br>${alert.type}`);
          markers.push(marker);
        }
      });
    });
}

const savedCity = localStorage.getItem("city") || "";
if (savedCity) citySelect.value = savedCity;
loadAlerts(savedCity);

citySelect.addEventListener("change", () => {
  const city = citySelect.value.toLowerCase();
  localStorage.setItem("city", city);
  loadAlerts(city);
});

reloadBtn.addEventListener("click", () => {
  const city = citySelect.value.toLowerCase();
  loadAlerts(city);
});

const themeToggle = document.getElementById("themeToggle");
const reloadBtn = document.getElementById("reloadMap");
const iframe = document.getElementById("alertMap");
const loader = document.getElementById("loader");
const citySelect = document.getElementById("citySelect");

const cityLinks = {
  kyiv: "https://alerts.in.ua/kyiv",
  lviv: "https://alerts.in.ua/lviv",
  kharkiv: "https://alerts.in.ua/kharkiv",
  odesa: "https://alerts.in.ua/odesa",
  dnipro: "https://alerts.in.ua/dnipro"
};

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

reloadBtn.addEventListener("click", () => {
  loader.style.display = "flex";
  iframe.src = iframe.src;
});

iframe.addEventListener("load", () => {
  loader.style.display = "none";
});

const savedCity = localStorage.getItem("city");
if (savedCity && cityLinks[savedCity]) {
  citySelect.value = savedCity;
  iframe.src = cityLinks[savedCity];
}

citySelect.addEventListener("change", () => {
  const city = citySelect.value;
  if (cityLinks[city]) {
    loader.style.display = "flex";
    iframe.src = cityLinks[city];
    localStorage.setItem("city", city);
  }
});

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
  dnipro: "https://alerts.in.ua/dnipro",
  zaporizhzhia: "https://alerts.in.ua/zaporizhzhia",
  vinnytsia: "https://alerts.in.ua/vinnytsia",
  ternopil: "https://alerts.in.ua/ternopil",
  "ivano-frankivsk": "https://alerts.in.ua/ivano-frankivsk",
  rivne: "https://alerts.in.ua/rivne",
  zhytomyr: "https://alerts.in.ua/zhytomyr",
  chernihiv: "https://alerts.in.ua/chernihiv",
  chernivtsi: "https://alerts.in.ua/chernivtsi",
  sumy: "https://alerts.in.ua/sumy",
  kropyvnytskyi: "https://alerts.in.ua/kropyvnytskyi",
  mykolaiv: "https://alerts.in.ua/mykolaiv",
  lutsk: "https://alerts.in.ua/lutsk",
  kherson: "https://alerts.in.ua/kherson",
  poltava: "https://alerts.in.ua/poltava",
  khmelnytskyi: "https://alerts.in.ua/khmelnytskyi"
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

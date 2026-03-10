const APIKEY = "ec89b1a993a62995b523449911c2bdba";
const URL = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

async function checkWeather(city = "New York") {
  try {
    const q = encodeURIComponent(city.trim() || "New York");
    const res = await fetch(URL + q + "&appid=" + APIKEY + "&units=metric");
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();

    document.querySelector(".city").textContent = data.name || city;
    document.querySelector(".temp").textContent =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + " km/h";

    const iconCode = data.weather && data.weather[0] && data.weather[0].icon;
    const iconEl = document.querySelector(".weather-icon");
    if (iconCode && iconEl) {
      iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }
  } catch (err) {
    console.error("Weather fetch error:", err);
    document.querySelector(".city").textContent = "Location not found";
    document.querySelector(".temp").textContent = "--";
    document.querySelector(".humidity").textContent = "--";
    document.querySelector(".wind").textContent = "--";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") checkWeather(searchBox.value);
});

checkWeather();

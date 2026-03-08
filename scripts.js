const APIKEY = "ec89b1a993a62995b523449911c2bdba ",
    URL = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.getElementById("city");
const searchBtn = document.getElementById("Btn");

async function checWeather(city = 'new york') {
    const res = awaitfetch(URL + city + '&appid=' + APIKEY);
    let data = await res.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "*c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "+";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
}
searchBtn.addEventListener("click", (e) => {
    checWeather(searchBox.value)
})
searchBox.addEventListener("click", (e) => {
    if (e.key == "Enter") {
        checWeather(searchBox.value)
    }
})

checWeather()
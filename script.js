// Enhanced Weather App JavaScript
const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherBox = document.querySelector(".weather");
const errorBox = document.querySelector(".error");

async function checkWeather(city) {
  if (!city) return; // Prevent blank searches

  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

    const condition = data.weather[0].main;
    const iconMap = {
      Clouds: "clouds.png",
      Clear: "clear.png",
      Rain: "rain.png",
      Drizzle: "drizzle.png",
      Mist: "mist.png"
    };

    weatherIcon.src = `img/${iconMap[condition] || "clear.png"}`;

    weatherBox.style.display = "block";
    errorBox.style.display = "none";
  } catch (error) {
    errorBox.style.display = "block";
    weatherBox.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkWeather(searchBox.value.trim());
});

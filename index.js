console.log("Weather JS loaded");

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apiKey = "d804b6b029c8dc21f3e9b6e9691f96a2";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    displayError("Please enter a city name");
    return;
  }

  try {
    const weatherData = await getWeatherData(city);
    displayWeatherInfo(weatherData);
  } catch (error) {
    displayError("City not found");
  }
});

async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Weather data not found");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  card.style.display = "block"; // 👈 SHOW CARD

  const {
    name,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.innerHTML = `
    <h1 class="cityDisplay">${name}</h1>
    <p class="tempDisplay">${Math.round(temp)}°C</p>
    <p class="humidityDisplay">Humidity: ${humidity}%</p>
    <p class="descDescription">
      ${description[0].toUpperCase() + description.slice(1)}
    </p>
    <p class="weatherEmoji">${getWeatherEmoji(id)}</p>
  `;
}

function getWeatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return "⛈️";
  if (weatherId >= 300 && weatherId < 400) return "🌦️";
  if (weatherId >= 500 && weatherId < 600) return "🌧️";
  if (weatherId >= 600 && weatherId < 700) return "❄️";
  if (weatherId >= 700 && weatherId < 800) return "🌫️";
  if (weatherId === 800) return "☀️";
  if (weatherId > 800) return "☁️";
  return "❓";
}

function displayError(message) {
  card.innerHTML = `
    <p class="errorDisplay" style="display:block;">${message}</p>
  `;
}

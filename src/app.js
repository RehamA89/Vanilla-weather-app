let now = new Date();
let currentDate = document.getElementById("date-element");

let date = now.getDate();
let hours = now.getHours().toString().padStart(2, "0  ");

let minutes = now.getMinutes().toString().padStart(2, "0");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
currentDate.innerHTML = `${day}, ${month} ${date},  ${hours}:${minutes}`;

function glow() {
  let app = document.getElementById("weather-app");
  if (hours < 12) {
    app.classList.remove("pm");
    app.classList.add("am");
  } else {
    app.classList.remove("am");
    app.classList.add("pm");
  }
}

glow();

function search(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=1a87t400bcfaf6fof17c6a4b4b38d75a&units=metric`;
  axios.get(apiUrl).then(showWeatherVariables);
}

function showCity(event) {
  event.preventDefault();
  let searchFieldElement = document.getElementById("search-field");
  search(searchFieldElement.value);
}

function showWeatherVariables(response) {
  let cityNameElement = document.getElementById("city-name");
  let weatherIconElement = document.getElementById("weather-icon");
  let temperatureValueElement = document.getElementById(`temperature-value`);
  let windSpeedElement = document.getElementById(`wind-speed`);
  let humidityElement = document.getElementById(`humidity`);
  let weatherDescriptionElement =
    document.getElementById(`weather-description`);

  celsiusTemperatureValue = Math.round(response.data.temperature.current);

  cityNameElement.innerHTML = response.data.city;
  weatherIconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherIconElement.setAttribute("alt", `response.data.condition.description`);
  temperatureValueElement.innerHTML = Math.round(
    response.data.temperature.current
  );
  windSpeedElement.innerHTML = (response.data.wind.speed * 3.6).toFixed(1);
  humidityElement.innerHTML = response.data.temperature.humidity;
  weatherDescriptionElement.innerHTML = response.data.condition.description;
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureValueElement = document.getElementById("temperature-value");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureValueElement.innerHTML = Math.round((19 * 9) / 5 + 32);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureValueElement = document.getElementById("temperature-value");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureValueElement.innerHTML = celsiusTemperatureValue;
}

function displayForecast() {
  let forecastElement = document.getElementById("forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHtml = `<div class="row">`;
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

let celsiusTemperatureValue = null;

let formElement = document.getElementById("city-search-form");
formElement.addEventListener("submit", showCity);

let fahrenheitLink = document.getElementById("fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.getElementById("celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Guelph");

displayForecast();

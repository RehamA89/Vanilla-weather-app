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
  temperatureValueElement.innerHTML = Math.round((19 * 9) / 5 + 32);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureValueElement = document.getElementById("temperature-value");
  temperatureValueElement.innerHTML = celsiusTemperatureValue;
}

let celsiusTemperatureValue = null;

let formElement = document.getElementById("city-search-form");
formElement.addEventListener("submit", showCity);

let fahrenheitTemperature = document.getElementById("fahrenheit-temperature");
fahrenheitTemperature.addEventListener("click", displayFahrenheitTemperature);

let celsiusTemperature = document.getElementById("celsius-temperature");
celsiusTemperature.addEventListener("click", displayCelsiusTemperature);

search("Guelph");

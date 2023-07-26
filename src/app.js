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

function showGlow() {
  let app = document.getElementById("weather-app");
  if (hours < 18) {
    app.classList.remove("pm");
    app.classList.add("am");
  } else {
    app.classList.remove("am");
    app.classList.add("pm");
  }
}

showGlow();

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

  getForecast(response.data.coordinates);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureValueElement = document.getElementById("temperature-value");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureValueElement.innerHTML = celsiusTemperatureValue;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function getForecast(coordinates) {
  //console.log(coordinates);
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=1a87t400bcfaf6fof17c6a4b4b38d75a&units=metric`;
  axios.get(apiUrlForecast).then(displayForecastData);
}

function displayForecastData(response) {
  let forecastDays = response.data.daily;

  let forecastElement = document.getElementById("forecast");

  let forecastHtml = `<div class="row">`;

  forecastDays.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
            <div class="col-2 mx-1 my-4 justify-content-center text-center">
              <div id="forecast-day">
                ${formatForecastDay(forecastDay.time)}
                
                </div>
                <div id="forecast-icon">
                <img
                  src=http:shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    forecastDay.condition.icon
                  }.png
                  alt=""
                  width="42"
                />
                </div>
                <div id="forcast-temperatures">
                  <span id="forecast-temp-max">${Math.round(
                    forecastDay.temperature.maximum
                  )}°</span>
                  <span id="forecast-temp-min">${Math.round(
                    forecastDay.temperature.minimum
                  )}°</span>
                </div>

            </div>
         `;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

let celsiusTemperatureValue = null;

let formElement = document.getElementById("city-search-form");
formElement.addEventListener("submit", showCity);

search("Guelph");

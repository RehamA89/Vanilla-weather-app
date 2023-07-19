let now = new Date();
let currentDate = document.getElementById("date-element");

let date = now.getDate();
let hours = now.getHours();
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

let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=Guelph&key=1a87t400bcfaf6fof17c6a4b4b38d75a&units=metric";

function showWeatherDescription(response) {
  let weatherDescription = document.getElementById(`weather-description`);
  weatherDescription.innerHTML = response.data.condition.description;
}

axios.get(apiUrl).then(showWeatherDescription);

function showTemperature(response) {
  let temperatureValue = document.getElementById(`temperature-value`);
  temperatureValue.innerHTML = Math.round(response.data.temperature.current);
  console.log(response.data);
}

axios.get(apiUrl).then(showTemperature);

function showWindSpeed(response) {
  let windSpeed = document.getElementById(`wind-speed`);
  windSpeed.innerHTML = (response.data.wind.speed * 3.6).toFixed(1);
}

axios.get(apiUrl).then(showWindSpeed);

function showHumidity(response) {
  let humidity = document.getElementById(`humidity`);
  humidity.innerHTML = response.data.temperature.humidity;
}

axios.get(apiUrl).then(showHumidity);

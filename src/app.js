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
  "https://api.shecodes.io/weather/v1/current?query=Paris&key=1a87t400bcfaf6fof17c6a4b4b38d75a&units=metric";

function showTemperature(response) {
  let cityNameElement = document.getElementById("city-name");
  let temperatureValueElement = document.getElementById(`temperature-value`);
  let windSpeedElement = document.getElementById(`wind-speed`);
  let humidityElement = document.getElementById(`humidity`);
  let weatherDescriptionElement =
    document.getElementById(`weather-description`);
  cityNameElement.innerHTML = response.data.city;
  temperatureValueElement.innerHTML = Math.round(
    response.data.temperature.current
  );
  windSpeedElement.innerHTML = (response.data.wind.speed * 3.6).toFixed(1);
  humidityElement.innerHTML = response.data.temperature.humidity;
  weatherDescriptionElement.innerHTML = response.data.condition.description;
  console.log(response.data);
}

axios.get(apiUrl).then(showTemperature);

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

currentDate.innerHTML = `${month} ${day}, ${hours}:${minutes}`;

let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=Guelph&key=1a87t400bcfaf6fof17c6a4b4b38d75a&units=metric";

function showTemperature(response) {
  let temperatureValue = document.getElementById(`temperature-value`);
  temperatureValue.innerHTML = Math.round(response.data.temperature.current);
}

axios.get(apiUrl).then(showTemperature);

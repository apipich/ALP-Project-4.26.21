let now = new Date();
let p = document.querySelector("p");

function formatDate(date) {
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
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  p.innerHTML = `${day} ${hours}:${minutes}`;
}

formatDate();

// changing city, then change temperature
// add humidity of weather, add windspeed

function showWeather(response) {
  let cityElement = document.querySelector("h1");
  let temperatureElement = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let weatherConditionElement = document.querySelector("#weatherCondition");
  let weatherCondition = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");

  fahrenheitTemp = response.data.main.temp;
  cityElement.innerHTML = city;
  temperatureElement.innerHTML = temperature;
  weatherConditionElement.innerHTML = weatherCondition;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function findCity(city) {
  let units = "imperial";
  let apiKey = "044e518b60304de98c4849e683a28d22";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

// show current position using latitude and longitude

function currentPosition(position) {
  let units = "imperial";
  let apiKey = "044e518b60304de98c4849e683a28d22";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

// show current location when you click "current location" button

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let button = document.querySelector("#here");
button.addEventListener("click", showPosition);

// show a default city here

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  findCity(city);
}

let weatherForm = document.querySelector("#weather-form");
weatherForm.addEventListener("submit", handleSubmit);

findCity("Hoboken");

// part 3 - convert to celsius

function getCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("h2");
  let celsiusElement = ((fahrenheitTemp - 32) * 5) / 9;
  celsius.innerHTML = Math.round(`${celsiusElement}`);
}

let cLink = document.querySelector("#celsius");
cLink.addEventListener("click", getCelsius);

let fahrenheitTemp = null;

// convert back to fahrenheit

function getFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("h2");
  let fahrenheitDegrees = fahrenheitTemp;
  fahrenheit.innerHTML = Math.round(`${fahrenheitDegrees}`);
}

let fLink = document.querySelector("#fahrenheit");
fLink.addEventListener("click", getFahrenheit);

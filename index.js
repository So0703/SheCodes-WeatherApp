let now = new Date();
let day = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let week = weeks[now.getDay()];

let timezone = document.querySelector("#local-time");
timezone.innerHTML = `São Paulo, ${week} ${month} ${day}, ${hour}:${minute}`;

function searchCityTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let tempValue = document.querySelector("#temperature-value");
  tempValue.innerHTML = `${temp}°`;
}

function locationChange(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name-input");
  let changeCity = document.querySelector("#local-time");
  changeCity.innerHTML = `${cityName.value}, ${week} ${month} ${day}, ${hour}:${minute}`;
  let apiKey = `8be41953f4397437428711de5898be13`;
  let city = `${cityName.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(searchCityTemp);
}

let cityForm = document.querySelector("#search-bar");
cityForm = cityForm.addEventListener("submit", locationChange);

let cButton = document.querySelector("#button-c");
let fButton = document.querySelector("#button-f");
let currentLocation = document.querySelector("#current-location-button");

function currentBottonTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let tempValue = document.querySelector("#temperature-value");
  tempValue.innerHTML = `${temp}°`;
}

function tempCurrentPosition(position) {
  let changeCurrentCity = document.querySelector("#local-time");
  changeCurrentCity.innerHTML = `Your position, ${week} ${month} ${day}, ${hour}:${minute}`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  let apiKey = `8be41953f4397437428711de5898be13`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(currentBottonTemp);
}

function changeCurrentType() {
  navigator.geolocation.getCurrentPosition(tempCurrentPosition);
}

currentLocation = currentLocation.addEventListener("click", changeCurrentType);

//fButton = fButton.addEventListener("click", changeToF);

function currentTempC(response) {
  let temp = Math.round(response.data.main.temp);
  let tempValue = document.querySelector("#temperature-value");
  tempValue.innerHTML = `${temp}°`;
}

function tempPositionC(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  let apiKey = `8be41953f4397437428711de5898be13`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(currentTempC);
}

function changeTypeC() {
  navigator.geolocation.getCurrentPosition(tempPositionC);
}

cButton = cButton.addEventListener("click", changeTypeC);

function displayDateTime(timestamp) {
  let now = new Date(timestamp);
  let day = now.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

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
  return `${week}, ${month} ${day}, ${hour}:${minute}`;
}

function displayCorrectWeekTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let now = date.getDay();
  let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[date.getMonth()];

  return `${day}/${month}, ${week[now]}`;
}

function displayCorrectHour(timestamp) {
  let now = new Date(timestamp * 1000);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

function displayTemp(response) {
  cTempValue = response.data.main.temp;

  let temp = Math.round(cTempValue);
  let describe = response.data.weather[0].description;
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let localName = response.data.name;
  let datastamp = response.data.dt;
  let minTemp = Math.round(response.data.main.temp_min);
  let maxtemp = Math.round(response.data.main.temp_max);
  let icon = response.data.weather[0].icon;

  let tempValue = document.querySelector("#temperature");
  let weatherDescription = document.querySelector("#description");
  let windSpeed = document.querySelector("#wind");
  let humidityLevel = document.querySelector("#humidity");
  let cityName = document.querySelector("#local");
  let dateTime = document.querySelector("#date");
  let tempMinMax = document.querySelector("#min-max");
  let iconImage = document.querySelector("#weather-icon");

  tempValue.innerHTML = `${temp}°C`;
  weatherDescription.innerHTML = `${describe}`;
  windSpeed.innerHTML = `${wind}`;
  humidityLevel.innerHTML = `${humidity}`;
  cityName.innerHTML = `${localName}`;
  dateTime.innerHTML = displayDateTime(datastamp * 1000);
  tempMinMax.innerHTML = `${minTemp}°/${maxtemp}`;
  iconImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  getForecastByHour(localName);
  getForecastCoords(response.data.coord);
}

function getForecastCoords(coordinates) {
  let apiKey = `8be41953f4397437428711de5898be13`;
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecastWeek);
}

function getForecastByHour(city) {
  let apiKey = `8be41953f4397437428711de5898be13`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=3&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecastHour);
}

function displayForecastHour(response) {
  console.log(response);

  let hourlyForecast = document.querySelector("#hourly-forecast");
  let hourForecast = "";
  let forecastByHour = response.data.list;
  forecastByHour.forEach(function (forecastHourInfo) {
    hourForecast =
      hourForecast +
      `
   <div class="col">
     <div>${displayCorrectHour(forecastHourInfo.dt)}</div>
     <div>${Math.round(forecastHourInfo.main.temp)}°C</div>
    </div>
  `;
  });
  hourlyForecast.innerHTML = hourForecast;
}
function displayForecastWeek(response) {
  //console.log(response);
  let forecastByWeek = response.data.daily;
  let weeklyForecast = document.querySelector("#weekly-forecast");
  let weekForecast = "";
  forecastByWeek.forEach(function (forecastWeekInfo, index) {
    if (index < 5) {
      weekForecast =
        weekForecast +
        `
   <div class="col">${displayCorrectWeekTime(forecastWeekInfo.dt)}</div>
      <div class="col">
      <img
      src="http://openweathermap.org/img/wn/${
        forecastWeekInfo.weather[0].icon
      }@2x.png"
      class="col forecast-icon"
      />
      </div>
      <div class="col">${Math.round(forecastWeekInfo.temp.max)}°/${Math.round(
          forecastWeekInfo.temp.min
        )}°</div>
  `;
    }
  });

  weeklyForecast.innerHTML = weekForecast;
}

function defineTempData(city) {
  let apiKey = `8be41953f4397437428711de5898be13`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-name-input");
  defineTempData(cityInput.value);
  defineWeekForecast(cityInput.value);
}

function tempCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `8be41953f4397437428711de5898be13`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function changeToCurrentTemp() {
  navigator.geolocation.getCurrentPosition(tempCurrentPosition);
}

let cTempValue = null;

let form = document.querySelector("#search-bar");
form.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", changeToCurrentTemp);

defineTempData("São Paulo");

//modify background color by time

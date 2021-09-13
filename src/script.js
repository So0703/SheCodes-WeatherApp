function displayDateTime(timestamp) {
  let now = new Date(timestamp);
  let day = now.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let hour = now.getHours();
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

function displayTemp(response) {
  let temp = Math.round(response.data.main.temp);
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

  tempValue.innerHTML = `${temp}°`;
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
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", searchCity);

defineTempData("São Paulo");

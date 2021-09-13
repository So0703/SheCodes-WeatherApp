function displayDateTime(timestamp) {
  let now = new Date(timestamp);
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
  console.log(now);
  //return `, ${week} ${month} ${day} ${hour}:${minute}`;
}

function displayTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let describe = response.data.weather[0].description;
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let localName = response.data.name;

  let tempValue = document.querySelector("#temperature");
  let weatherDescription = document.querySelector("#description");
  let windSpeed = document.querySelector("#wind");
  let humidityLevel = document.querySelector("#humidity");
  let cityName = document.querySelector("#local");
  let dateTime = document.querySelector("#date");

  tempValue.innerHTML = `${temp}°`;
  weatherDescription.innerHTML = `${describe}`;
  windSpeed.innerHTML = `${wind}`;
  humidityLevel.innerHTML = `${humidity}`;
  cityName.innerHTML = `${localName}`;
  dateTime.innerHTML = displayDateTime(response.date.dt * 1000);
}

let apiKey = `8be41953f4397437428711de5898be13`;
let city = `São Paulo`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);

let apiKey = "c0e8f5ffdd7879b2071010bce0af1505";
let userInput = document.querySelector("#user-input")
let date = document.querySelector("#date")
let cityName = document.querySelector("#city-name")
let weatherIcon = document.querySelector("#icon")
let temp = document.querySelector("#temp")
let temp1 = document.querySelector("#temp1")
let temp2 = document.querySelector("#temp2")
let temp3 = document.querySelector("#temp3")
let temp4 = document.querySelector("#temp4")
let temp5 = document.querySelector("#temp5")
let humidity = document.querySelector("#humidity")
let humidity1 = document.querySelector("#humidity1")
let humidity2 = document.querySelector("#humidity2")
let humidity3 = document.querySelector("#humidity3")
let humidity4 = document.querySelector("#humidity4")
let humidity5 = document.querySelector("#humidity5")
let windSpeed = document.querySelector("#wind-speed")
let windSpeed1 = document.querySelector("#wind-speed1")
let windSpeed2 = document.querySelector("#wind-speed2")
let windSpeed3 = document.querySelector("#wind-speed3")
let windSpeed4 = document.querySelector("#wind-speed4")
let windSpeed5 = document.querySelector("#wind-speed5")
let submitButton = document.querySelector("#submit-button")


function currentWeather() {
  const userInputValue = userInput.value;
  const geoCodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${userInputValue}&appid=${apiKey}`;
  
  fetch(geoCodeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      //define variables for latitude and longitude to be used for fetching the weather values
      const geoCodeLat = data[0].lat
      const geoCodeLon = data[0].lon
      const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${geoCodeLat}&lon=${geoCodeLon}&appid=${apiKey}`;

      fetch(weatherUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (weatherData) {
          console.log(weatherData);

          const weatherHeading = document.querySelector("#weather-heading")
          weatherHeading.innerHTML = "Current Weather"
          date.innerText = dayjs().format("MMM D, YYYY")
          let iconCode = weatherData.list[0].weather[0].icon
          weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

          //current weather: display city name, temp(convert to fahrenheit), humidity, and wind speed for current forecast
          cityName.innerText = data[0].name

          humidity.innerText = weatherData.list[1].main.humidity + "%"
          humidity1.innerText = weatherData.list[1].main.humidity + "%"
          humidity2.innerText = weatherData.list[8].main.humidity + "%"
          humidity3.innerText = weatherData.list[16].main.humidity + "%"
          humidity4.innerText = weatherData.list[24].main.humidity + "%"
          humidity5.innerText = weatherData.list[32].main.humidity + "%"

          windSpeed.innerText = weatherData.list[1].wind.speed + "mph"
          windSpeed1.innerText = weatherData.list[1].wind.speed + "mph"
          windSpeed2.innerText = weatherData.list[8].wind.speed + "mph"
          windSpeed3.innerText = weatherData.list[16].wind.speed + "mph"
          windSpeed4.innerText = weatherData.list[24].wind.speed + "mph"
          windSpeed5.innerText = weatherData.list[32].wind.speed + "mph"

          let tempfh = (((weatherData.list[1].main.temp) - 273.15) * 1.8) + 32;
          let temp1fh = (((weatherData.list[1].main.temp) - 273.15) * 1.8) + 32;
          let temp2fh = (((weatherData.list[8].main.temp) - 273.15) * 1.8) + 32;
          let temp3fh = (((weatherData.list[16].main.temp) - 273.15) * 1.8) + 32;
          let temp4fh = (((weatherData.list[24].main.temp) - 273.15) * 1.8) + 32;
          let temp5fh = (((weatherData.list[32].main.temp) - 273.15) * 1.8) + 32;

          temp.innerText = tempfh.toFixed(0) + "°F";
          temp1.innerText = temp1fh.toFixed(0) + "°F";
          temp2.innerText = temp2fh.toFixed(0) + "°F";
          temp3.innerText = temp3fh.toFixed(0) + "°F";
          temp4.innerText = temp4fh.toFixed(0) + "°F";
          temp5.innerText = temp5fh.toFixed(0) + "°F";
 
        })
    })
  
}

submitButton.addEventListener("click", currentWeather);

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
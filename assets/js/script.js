let apiKey = "c0e8f5ffdd7879b2071010bce0af1505";
let userInput = document.querySelector("#user-input")
let date = document.querySelector("#date")
let cityName = document.querySelector("#city-name")
let weatherIcon = document.querySelector("#icon")
let temp = document.querySelector("#temp")
let humidity = document.querySelector("#humidity")
let windSpeed = document.querySelector("#wind-speed")
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

          cityName.innerText = data[0].name
          temp.innerText = weatherData.list[1].main.temp
          //change to F
          humidity.innerText = weatherData.list[1].main.humidity
          windSpeed.innerText = weatherData.list[1].wind.speed + "mph"
        })
    })
  
}

submitButton.addEventListener("click", currentWeather);

// function fiveDayForecast() {
//   currentWeather()
//   console.log(data.city.coord.lat)



// }




// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
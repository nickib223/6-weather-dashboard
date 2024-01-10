//variable for api key
const apiKey = "c0e8f5ffdd7879b2071010bce0af1505";
//variables for information to be pulled fromt he api
let userInput = document.querySelector("#user-input")


let weatherIcon = document.querySelector("#weather-icon")
let currentTemp = document.querySelector("#current-temp")
let currentHumidity = document.querySelector("#current-humidity")
let windSpeed = document.querySelector("#wind-speed")
//variable for submit button to be used later in the code
let submitButton = document.querySelector("#submit-button")

//event listener for submit button to run the searchWeather function and search for the city from the user's input
submitButton.addEventListener("click", searchWeather);

//function for querying the weather of a city provided by the user
function searchWeather() {
  //Get the city input value
  const city = document.getElementById('cityInput').value;
  // Display current weather information
  const userInputValue = city
  const geoCodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${userInputValue}&appid=${apiKey}`;

  //fetch location based on user input
  fetch(geoCodeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

      //define variables for latitude and longitude to be used for fetching the weather values
      const geoCodeLat = data[0].lat
      const geoCodeLon = data[0].lon

      //now fetch the weather data using lon and lat
      const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${geoCodeLat}&lon=${geoCodeLon}&appid=${apiKey}`;

      fetch(weatherUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (weatherData) {
          console.log(weatherData);
          displayCurrentWeather(weatherData);
        });

      //update UI elements
      const weatherHeading = document.querySelector("#weather-heading")
      weatherHeading.innerHTML = "Current Weather"

      const todaysDate = document.querySelector("#todays-date")
      todaysDate.innerText = dayjs().format("MMM D, YYYY")

    });

}

function displayCurrentWeather(weatherData) {
  console.log(weatherData);

  // Update UI elements with weather information
  const cityName = document.querySelector("#city-name");
  cityName.innerHTML = weatherData.city.name;

  const iconCode = weatherData.list[0].weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const currentTemperature = (((weatherData.list[0].main.temp) - 273.15) * 1.8) + 32;
  currentTemp.innerHTML = `Temperature: ${currentTemperature.toFixed(0)} °F`;

  const wind = weatherData.list[0].wind.speed;
  windSpeed.innerHTML = `Wind Speed: ${wind.toFixed(2)} m/s`;

  const humidity = weatherData.list[0].main.humidity;
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;



  displayForecast(weatherData);
}

// function to display 5-day forecast
function displayForecast(weatherData) {
  //variable to link to HTML tag
  const forecastContainer = document.querySelector("#forecast-container");

  // Clears existing content in the forecast container
  forecastContainer.innerHTML = "";

  //Variable to identify which array items are to be pulled from
  const forecastIndices = [8, 16, 24, 30, 38];
  //Pulls data for each of the array items identified in the array above
  forecastIndices.forEach(index => {
    const dayData = weatherData.list[index];

    // Creates HTML elements for each day
    const dayContainer = document.createElement("div");
    dayContainer.classList.add("forecast-day");

    // Displays date for each day and appends to the <p> tag that was created
    const dateElement = document.createElement("h5");
    dateElement.innerText = dayjs(dayData.dt_txt).format("MMM D, YYYY");
    dayContainer.appendChild(dateElement);

    // Displays weather icons and appends to the <img> tag that was created
    const iconElement = document.createElement("img");
    const iconCode = dayData.weather[0].icon;
    iconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    //Adds an alt for accessibility
    iconElement.alt = "Weather Icon";
    dayContainer.appendChild(iconElement);

    // Displays temperature and appends to the <p> tag that was created
    const tempElement = document.createElement("p");
    const tempElementFh = (((dayData.main.temp) - 273.15) * 1.8) + 32;
    tempElement.innerText = `Temperature: ${tempElementFh.toFixed(0)} °F`;
    dayContainer.appendChild(tempElement);

    // Displaya wind speed and appends to the <p> tag that was created
    const windElement = document.createElement("p");
    windElement.innerText = `Wind Speed: ${dayData.wind.speed} m/s`;
    dayContainer.appendChild(windElement);

    // Displays humidity and appends to the <p> tag that was created
    const humidityElement = document.createElement("p");
    humidityElement.innerText = `Humidity: ${dayData.main.humidity}%`;
    dayContainer.appendChild(humidityElement);

    // Appends the day container to the forecast container
    forecastContainer.appendChild(dayContainer);
  });
}

function displaySearchHistory(history) {
  // Display search history
}



// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
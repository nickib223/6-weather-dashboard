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
//variable to store search history, parse, and create an array
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

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
          updateSearchHistory(userInputValue);
          localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

          //Runs displayCurrentWeather function with weatherData passed through the function
          displayCurrentWeather(weatherData);
        });

      //adds heading and date to query
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

// function to display the 5-day forecast
function displayForecast(weatherData) {
  //variable to link to HTML tag
  const forecastContainer = document.querySelector("#forecast-container");

  // Clears existing content in the forecast container
  forecastContainer.innerHTML = "";

  //Variable to identify which array items are to be pulled from
  const forecastIndices = [1, 8, 16, 24, 32];
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

function updateSearchHistory(city) {
  // Add the city to the beginning of the searchHistory array
  searchHistory.unshift(city);
  // Keeps only the last 5 searches and removes any others
  if (searchHistory.length > 5) {
    searchHistory.pop();
  }
  //runs the displaySearchHistory function with searchHistory data passed through
  displaySearchHistory(searchHistory);
}

// Displays search history so the user can go back to a previously queried city
function displaySearchHistory() {
  const searchHistoryContainer = document.querySelector("#search-history-container");
  searchHistoryContainer.innerHTML = ""; // Clears existing content
  //Creates a heading for previous searches
  const citySearchHeading = document.createElement("h5");
  citySearchHeading.innerText = "Previously Searched";
  searchHistoryContainer.appendChild(citySearchHeading);
  // Creates an unordered list for the search history
  const historyList = document.createElement("ul");

  // Creates a list item for each search history item
  searchHistory.forEach((city) => {
    const listItem = document.createElement("li");

    // Hyperlink for each city that was previously searched
    const link = document.createElement("a");
    link.href = `#?city=${encodeURIComponent(city)}`; //per MDN, "...used to encode a URL as a whole, assuming it is already well-formed to avoid URL syntax characters in unwanted places"
    link.innerText = `${city}`;

    // Event listener for the hyperlink
    link.addEventListener("click", function (event) {
      event.preventDefault();
      // call searchWeatherForCity on click of hyperlink
      searchWeatherForCity(city);
    });

    // Appends hyperlinks and cities to the list
    listItem.appendChild(link);
    historyList.appendChild(listItem);
  });

  // Append the unordered list to the search history container
  searchHistoryContainer.appendChild(historyList);
}

function searchWeatherForCity(city) {
  const apiKey = "c0e8f5ffdd7879b2071010bce0af1505";
  const geoCodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
  
  const currentWeatherContent = document.querySelector("#current-weather-content");
  const currentForecastContent = document.querySelector("#current-forecast-content");
  //hides existing content so a new city's information can be displayed
  currentWeatherContent.style.display = "none";
  currentForecastContent.style.display = "none";

  fetch(geoCodeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const geoCodeLat = data[0].lat;
      const geoCodeLon = data[0].lon;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${geoCodeLat}&lon=${geoCodeLon}&appid=${apiKey}`;

      fetch(weatherUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (weatherData) {
          // weather data for the specified city
          console.log(weatherData);
          //run current weather and forecast functions for the clicked city
          clickedCurrentWeather(city, weatherData);
          clickedForecastWeather(weatherData);
        })
        .catch(function (error) {
          console.error("Error fetching weather data:", error);
        });
    })
    .catch(function (error) {
      console.error("Error fetching location data:", error);
    });

    
}

//function to display the current weather for the clicked city
function clickedCurrentWeather(city, weatherData) {
  const cityNameElement = document.querySelector("#clicked-city-name");
  const currentTempElement = document.querySelector("#clicked-current-temp");
  const currentHumidityElement = document.querySelector("#clicked-current-humidity");
  const windSpeedElement = document.querySelector("#clicked-wind-speed");

  cityNameElement.innerText = city;
  const iconCode = weatherData.list[0].weather[0].icon;
  const weatherIconElement = document.querySelector("#clicked-weather-icon");
  weatherIconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const currentTemperature = (((weatherData.list[0].main.temp) - 273.15) * 1.8) + 32;
  currentTempElement.innerHTML = `Temperature: ${currentTemperature.toFixed(0)} °F`;

  const wind = weatherData.list[0].wind.speed;
  windSpeedElement.innerHTML = `Wind Speed: ${wind.toFixed(2)} m/s`;

  const humidity = weatherData.list[0].main.humidity;
  currentHumidityElement.innerHTML = `Humidity: ${humidity}%`;
}

//function to display the forecast for the clicked city
function clickedForecastWeather(weatherData) {
  const clickedForecastContainer = document.querySelector("#clicked-forecast-container");
  clickedForecastContainer.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const clickedDayData = weatherData.list[i * 8]; // variable for data every 8 entries

    const clickedDayContainer = document.createElement("div");
    clickedDayContainer.classList.add("clicked-forecast-day");

    const dateElement = document.createElement("h5");
    dateElement.innerText = dayjs(clickedDayData.dt_txt).format("MMM D, YYYY");
    clickedDayContainer.appendChild(dateElement);

    const iconElement = document.createElement("img");
    const iconCode = clickedDayData.weather[0].icon;
    iconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconElement.alt = "Weather Icon";
    clickedDayContainer.appendChild(iconElement);

    const tempElement = document.createElement("p");
    const tempElementFh = (((clickedDayData.main.temp) - 273.15) * 1.8) + 32;
    tempElement.innerText = `Temperature: ${tempElementFh.toFixed(0)} °F`;
    clickedDayContainer.appendChild(tempElement);

    const windElement = document.createElement("p");
    windElement.innerText = `Wind Speed: ${clickedDayData.wind.speed} m/s`;
    clickedDayContainer.appendChild(windElement);

    const humidityElement = document.createElement("p");
    humidityElement.innerText = `Humidity: ${clickedDayData.main.humidity}%`;
    clickedDayContainer.appendChild(humidityElement);

    clickedForecastContainer.appendChild(clickedDayContainer);
  }
}

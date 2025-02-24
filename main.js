const button = document.getElementById("search-button");
const locationButton = document.getElementById("current-location");
const input = document.getElementById("input");
const cityName = document.getElementById("city-name");
const cityTemp = document.getElementById("city-temp");
const cityTime = document.getElementById("city-time");
const conditionText = document.getElementById("condition-text");
const weatherIcon = document.getElementById("weather-icon");

const API_KEY = "ccde178083b5499da22125019252402";

// Function to fetch weather data
async function getData(city) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`);
        
        return await response.json();
    } 
    catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

// Function to update the UI with weather data
function updateWeatherUI(result) {
    if (!result) {
        cityName.innerText = "Error fetching data";
        cityTemp.innerText = "";
        cityTime.innerText = "";
        conditionText.innerText = "";
        weatherIcon.src = "weatherr.jpg"; // Default icon if fetch fails
        return;
    }

    cityName.innerText = `${result.location.region}, ${result.location.name}`;
    cityTemp.innerText = `${result.current.temp_c} °C`;
    cityTime.innerText = result.location.localtime;
    conditionText.innerText = result.current.condition.text;
    weatherIcon.src = "https:" + result.current.condition.icon; // Set weather icon dynamically
}

// Event listener for search button
button.addEventListener("click", async () => {
    const value = input.value;
    if (value.trim() === "") {
        alert("Please enter a city name.");
        return;
    }
    const result = await getData(value);
    updateWeatherUI(result);
});

// Event listener for current location button
locationButton.addEventListener("click", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const result = await getData(`${latitude},${longitude}`);
            updateWeatherUI(result);
        }, (error) => {
            console.error("Error getting location:", error);
            alert("Unable to fetch location. Please enable location services.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

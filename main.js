const button = document.getElementById("search-button");
const input = document.getElementById("input");
const cityName = document.getElementById("city-name");
const cityTemp = document.getElementById("city-temp");
const cityTime = document.getElementById("city-time");
const condn= document.getElementById("condition-text");

async function getData(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=ccde178083b5499da22125019252402&q=${city}&aqi=yes`);
    // if (!response.ok) {
    //     throw new Error("Network response was not ok");
    // }
    return await response.json();
}

button.addEventListener("click", async () => {
    const value = input.value.trim();
  
    try {
        const result = await getData(value);
        // Update UI with the fetched data using innerText
        cityName.innerText = result.location.name + ", " + result.location.region + " (" + result.location.country + ")";

        cityTemp.innerText = result.current.temp_c + " °C";
        cityTime.innerText = result.location.localtime;
        condn.innerText = result.current.condition.text;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        cityName.innerText = "Error fetching data";
        cityTemp.innerText = "";
        cityTime.innerText = "";
    }
});

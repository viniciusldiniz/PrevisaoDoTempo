const form = document.getElementById('searchForm');
const input = document.getElementById('city');
const weatherDiv = document.getElementById('weather');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = input.value;
    getWeather(city);
});

async function getWeather(city) {
    const url = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${city}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        const woeid = data[0].woeid;
        getWeatherDetails(woeid);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDiv.innerHTML = 'Error fetching weather data. Please try again later.';
    }
}

async function getWeatherDetails(woeid) {
    const url = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather details:', error);
        weatherDiv.innerHTML = 'Error fetching weather details. Please try again later.';
    }
}

function displayWeather(data) {
    const weatherData = data.consolidated_weather[0];
    const cityName = data.title;
    const temperature = weatherData.the_temp.toFixed(1);
    const description = weatherData.weather_state_name;
    
    const weatherHTML = `
        <h2>${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
    `;
    weatherDiv.innerHTML = weatherHTML;
}

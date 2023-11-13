// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = '8571047c3f0cca547b6bafcdb9effffc';

function getWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const weatherResult = document.getElementById('weatherResult');

    // Check if the cityInput is not empty
    if (cityInput.trim() === '') {
        alert('Please enter a city name.');
        return;
    }

    // Construct the API URL with the city name and API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;

    // Make a request to the OpenWeatherMap API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if the API request was successful
            if (data.cod === '404') {
                weatherResult.innerHTML = `<p>City not found. Please enter a valid city name.</p>`;
            } else {
                const temperatureKelvin = data.main.temp;
                const temperatureCelsius = temperatureKelvin - 273.15; // Conversion to Celsius

                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;

                const description = data.weather[0].description;
                const weatherIcon = data.weather[0].icon;

                let rainInfo = '';
                if (data.rain && data.rain['1h']) {
                    rainInfo = `Rain (last 1h): ${data.rain['1h']} mm`;
                }

                // Display the weather data with additional information
                weatherResult.innerHTML = `<p>Temperature: ${temperatureCelsius.toFixed(2)} °C</p>
                                           <p>Humidity: ${humidity}%</p>
                                           <p>Wind Speed: ${windSpeed} m/s</p>
                                           <p>Description: ${description}</p>
                                           <p>${rainInfo}</p>
                                           <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherResult.innerHTML = `<p>Failed to fetch weather data. Please try again later.</p>`;
        });
}

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
                const cityName = data.name;
                const temperatureKelvin = data.main.temp;
                const temperatureCelsius = temperatureKelvin - 273.15; // Conversion to Celsius

                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const windDirection = data.wind.deg;

                const description = data.weather[0].description;

                let precipitation = '';
                if (data.rain) {
                    precipitation = `Rain: ${data.rain['1h']} mm`;
                } else if (data.snow) {
                    precipitation = `Snow: ${data.snow['1h']} mm`;
                }

                const pressure = data.main.pressure;
                const visibility = data.visibility;

                const sunriseTimestamp = data.sys.sunrise * 1000; // Convert to milliseconds
                const sunsetTimestamp = data.sys.sunset * 1000; // Convert to milliseconds

                const sunrise = new Date(sunriseTimestamp);
                const sunset = new Date(sunsetTimestamp);

                const uvIndex = data.uvi;

                let airQuality = '';
                if (data.main.aqi) {
                    airQuality = `Air Quality Index: ${data.main.aqi}`;
                }

                const moonPhase = ''; // Moon phase data may not be available in the current weather API response

                // Display the weather data with additional information
                weatherResult.innerHTML = `<p>Weather in ${cityName}</p>
                                           <p>Temperature: ${temperatureCelsius.toFixed(2)} °C</p>
                                           <p>Humidity: ${humidity}%</p>
                                           <p>Wind Speed: ${windSpeed} m/s</p>
                                           <p>Wind Direction: ${windDirection}°</p>
                                           <p>Description: ${description}</p>
                                           ${precipitation ? `<p>${precipitation}</p>` : ''}
                                           <p>Pressure: ${pressure} hPa</p>
                                           <p>Visibility: ${visibility} meters</p>
                                           <p>Sunrise: ${sunrise.toLocaleTimeString()}</p>
                                           <p>Sunset: ${sunset.toLocaleTimeString()}</p>
                                           ${uvIndex ? `<p>UV Index: ${uvIndex}</p>` : ''}
                                           ${airQuality ? `<p>${airQuality}</p>` : ''}
                                           ${moonPhase ? `<p>Moon Phase: ${moonPhase}</p>` : ''}`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherResult.innerHTML = `<p>Failed to fetch weather data. Please try again later.</p>`;
        });
}

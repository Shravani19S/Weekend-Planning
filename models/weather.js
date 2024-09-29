document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const weatherDiv = document.getElementById('weather');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the form from reloading the page

        const city = document.getElementById('city').value;
        if (city) {
            // Fetch weather data (replace 'your_api_key' with your actual OpenWeather API key)
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fb006febe0914f5d466c6534bfb66033&units=metric`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.list) {
                        // Display a 5-day forecast
                        weatherDiv.innerHTML = `
                            <h3>Weather Forecast for ${data.city.name}</h3>
                            ${data.list.slice(0, 5).map(day => `
                                <div class="card">
                                    <p><strong>${new Date(day.dt_txt).toDateString()}</strong></p>
                                    <p>${day.weather[0].description}, ${day.main.temp}°C</p>
                                </div>
                            `).join('')}
                        `;
                    } else {
                        weatherDiv.innerHTML = `<p>No weather data available for ${city}.</p>`;
                    }
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    weatherDiv.innerHTML = '<p>Failed to load weather data. Please try again later.</p>';
                });
        } else {
            weatherDiv.innerHTML = '<p>Please enter a city.</p>';
        }
    });
});


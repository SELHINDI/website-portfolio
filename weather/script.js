// Define a function to fetch weather data
function fetchWeather(location, apiKey) {
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${encodeURIComponent(location)}&apikey=${apiKey}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            throw error; // Rethrow the error to be caught by the caller
        });
}


// Function to handle the weather data and update the UI
function displayWeather(data) {
    console.log(data); // Log the data object to the console for inspection

    // Construct weather information string from the available data
    var weatherInfo = 'Location: ' + data.location.name + '\n';
    weatherInfo += 'Latitude: ' + data.location.lat + '\n';
    weatherInfo += 'Longitude: ' + data.location.lon + '\n';
    weatherInfo += 'Temperature: ' + data.timelines.hourly[0].values.temperature + '°C\n';
    weatherInfo += 'Humidity: ' + data.timelines.hourly[0].values.humidity + '%\n';
    weatherInfo += 'Wind Speed: ' + data.timelines.hourly[0].values.windSpeed + ' m/s\n';

    // Update UI with weather information
    document.getElementById('weather').innerText = weatherInfo;
}



// Function to handle errors
function handleError(error) {
    console.error('Error:', error); // Log the error to the console
    // Update the UI to display an error message
    document.getElementById('weather').innerText = 'Error fetching weather data. Please try again later.';
}

// Define getWeather function directly in the HTML button's onclick attribute
function getWeather() {
    var city = document.getElementById('cityInput').value;
    var apiKey = 'S1GhXzwtGrS280neWEHIOsf26BTv7aVp'; // Replace with your actual API key
    fetchWeather(city, apiKey)
        .then(data => {
            // Call the displayWeather function to handle the weather data
            displayWeather(data);
        })
        .catch(error => {
            // Call the handleError function to handle errors
            handleError(error);
        });
}

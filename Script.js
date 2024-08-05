document.getElementById('fetchWeather').addEventListener('click', function() {
    const location = document.getElementById('location').value;
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a location.');
    }
});

function fetchWeather(location) {
    const apiKey = 'c5c862a140abbb6aa97bd910b3d985fe'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text || 'Network response was not ok');
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.cod !== 200) {
                alert(`Error: ${data.message}`);
                return;
            }

            const locationName = data.name;
            const temperature = `${Math.round(data.main.temp)}°C`;
            const description = data.weather[0].description;
            const humidity = `Humidity: ${data.main.humidity}%`;

            document.getElementById('locationName').textContent = locationName;
            document.getElementById('temperature').textContent = temperature;
            document.getElementById('description').textContent = description.charAt(0).toUpperCase() + description.slice(1);
            document.getElementById('humidity').textContent = humidity;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

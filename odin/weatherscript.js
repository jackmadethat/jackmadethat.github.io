const container = document.getElementById("container");

const getWeather = () => {
  let location = document.getElementById("enter_location").value;
  container.innerHTML = "<h2>Loading...</h2>";
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=DD7JTQ8XYFT57SH333Q6H4AM6&contentType=json`, {mode: 'cors'})
  .then(function(response) {
    if (response.status == 400) {
      container.innerHTML = "<h2>Invalid City!</h2>";
    }
    return response.json();
  })
  .then(function(response) {
    displayWeather(response);
  })
}

const displayWeather = (response) => {
  container.innerHTML = `
    <h2>Weather in ${response.address}</h2>
    <h3>Overview</h3>
    <ul>
      <li>Time: ${response.currentConditions.datetime}</li>
      <li>Today's Date: ${new Date().toDateString()}</li>
      <li>Temperature: ${response.currentConditions.temp}F</li>
      <li>Humidity: ${response.currentConditions.humidity}F</li>
      <li>Current Conditions: ${response.currentConditions.conditions}</li>
    </ul>
    <p>${response.description}</p>
    <h3>Astronomy</h3>
    <ul>
      <li>Sunrise: ${response.currentConditions.sunrise}</li>
      <li>Sunset: ${response.currentConditions.sunset}</li>
      <li>Moonphase: ${response.currentConditions.moonphase}</li>
    </ul>
    <ul>
      <li>Latitude: ${response.latitude}</li>
      <li>Longitude: ${response.longitude}</li>
    </ul>
  `;
}
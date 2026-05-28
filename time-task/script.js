const apiKey = 'c2197ec1ac8b95b71417cad665456b27';
const city = 'London'; // change City Here!

let useWeatherMode = true;  // default to weather mode

async function getData() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);

    const weather = json.weather[0].main;
    const temperature = json.main.temp;

    updateCharacter(weather, temperature);
  } catch (error) {
    console.error(error.message);
  }
}

function updateCharacter(weather, temperature) {
  const weatherIcon = document.getElementById('weather-icon');
  const currentHour = new Date().getHours();

  if (useWeatherMode) {
    if (weather.includes('Rain')) {
      weatherIcon.src = 'Rain.gif';
      weatherIcon.alt = 'Character with raincoat';
    } else if (weather.includes('Clear')) {
      weatherIcon.src = 'Clear.gif';
      weatherIcon.alt = 'Character in clear sky';
    } else if (weather.includes('Sunny')) {
      weatherIcon.src = 'Sunny.gif';
      weatherIcon.alt = 'Character in sunny outfit';
    } else if (temperature < 10) {
      weatherIcon.src = 'Cold.gif';
      weatherIcon.alt = 'Character in warm jacket';
    } else {
      weatherIcon.src = 'Default_.gif';
      weatherIcon.alt = 'Default character';
    }
  } else {
    let timeOfDayImage = '';
    if (currentHour >= 6 && currentHour < 12) {
      timeOfDayImage = 'Morning.gif';
    } else if (currentHour >= 12 && currentHour < 18) {
      timeOfDayImage = 'Default_.gif';
    } else {
      timeOfDayImage = 'Night.gif';
    }
    weatherIcon.src = timeOfDayImage;
    weatherIcon.alt = 'Character in time-of-day outfit';
  }

  document.getElementById('temperature').innerText = `${temperature}°C`;
}

document.getElementById('mode-toggle').addEventListener('change', (event) => {
  useWeatherMode = event.target.checked;
  document.getElementById('mode-label').innerText = useWeatherMode ? 'Weather Mode' : 'Time Mode';
  getData();
});

document.addEventListener('DOMContentLoaded', () => {
  getData();
});

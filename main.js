const apiKey = "cdf1bd73a062caed520049b6103ed3af";
const form = document.querySelector(".container__inputs");
const typedCity = document.getElementById("typedCityInput");
const cityName = document.querySelector(".city__name");
const containerTemp = document.querySelector(".container__temp");
const ulAdditionalInfos = document.querySelector(".additional__infos");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  showWeatherData();
});

async function getWeatherData(city) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
    const res = await fetch(apiUrl).then((res) => res.json());
    console.log(res);
    return res;
  } catch (error) {
    console.error(`Foi obtido o seguinte erro: ${error}`);
  }
}

async function getWeatherIcons(id) {
  const data = await getWeatherData(typedCity.value);
}

async function showWeatherData() {
  const data = await getWeatherData(typedCity.value);
  // const weatherIcon = getWeatherIcons(weather.icon);
  const temp = document.querySelector(".temp");
  const tempDescription = document.querySelector(".temp__description");
  const tempDescriptionText = data.weather[0].description;
  const tempMax = document.querySelector(".tempMax");
  const tempMin = document.querySelector(".tempMin");
  const humidity = document.querySelector(".humidity");
  const wind = document.querySelector(".wind");
  cityName.classList.remove("hidden");
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  containerTemp.classList.remove("hidden");
  temp.textContent = `${Math.round(data.main.temp)}ºC`;
  tempDescription.textContent = `${tempDescriptionText[0].toUpperCase()}${tempDescriptionText.slice(
    1
  )}`;
  ulAdditionalInfos.classList.remove("hidden");
  tempMax.textContent = `${Math.round(data.main.temp_max)}ºC`;
  tempMin.textContent = `${Math.round(data.main.temp_min)}ºC`;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed}km/h`;
  typedCity.value = "";
}

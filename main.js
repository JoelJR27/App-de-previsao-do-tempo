const apiKey = "cdf1bd73a062caed520049b6103ed3af";
const form = document.querySelector(".container__inputs");
const typedCity = document.getElementById("typedCityInput");
const paragraphError = document.querySelector(".city__error");
const cityName = document.querySelector(".city__name");
const containerTemp = document.querySelector(".container__temp");
const ulAdditionalInfos = document.querySelector(".additional__infos");
const body = document.querySelector("body");

async function getWeatherData(city) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
    const res = await fetch(apiUrl).then((res) => res.json());
    if (typedCity.value == "") {
      paragraphError.textContent = `Por favor digite o nome de uma cidade!`;
      paragraphError.classList.remove("hidden");
    } else if (res.cod != 200) {
      paragraphError.textContent = `A cidade não foi encontrada!`;
      paragraphError.classList.remove("hidden");
    } else {
      paragraphError.classList.add("hidden");
    }
    return res;
  } catch (error) {
    console.error(`Foi obtido o seguinte erro: ${error}`);
  }
}

function setWeatherIcons(id) {
  const iconImage = document.querySelector(".descriptionImage");
  iconImage.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${id}@2x.png`
  );
}

async function showWeatherData() {
  const data = await getWeatherData(typedCity.value);
  setWeatherIcons(data.weather[0].icon);
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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  showWeatherData();
});

body.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target == body) {
    cityName.classList.toggle("hidden");
    containerTemp.classList.toggle("hidden");
    ulAdditionalInfos.classList.toggle("hidden");
  }
});
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
    if (typedCity.value.trim() == "") {
      paragraphError.textContent = `Por favor digite o nome de uma cidade!`;
      paragraphError.classList.remove("hidden");
      typedCity.value = "";
    } else if (res.cod != 200) {
      paragraphError.textContent = `A cidade não foi encontrada!`;
      paragraphError.classList.remove("hidden");
      typedCity.value = "";
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

function getDocumentElement(selector){
  return document.querySelector(selector)
}



async function showWeatherData() {
  const data = await getWeatherData(typedCity.value.trim());
  setWeatherIcons(data.weather[0].icon);
  const temp = getDocumentElement(".temp");
  const tempDescription = getDocumentElement(".temp__description");
  const tempDescriptionText = data.weather[0].description;
  const tempMax = getDocumentElement(".tempMax");
  const tempMin = getDocumentElement(".tempMin");
  const humidity = getDocumentElement(".humidity");
  const wind = getDocumentElement(".wind");
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temp.textContent = `${Math.round(data.main.temp)}ºC`;
  showHiddenElements(cityName, containerTemp);
  tempDescription.textContent = `${tempDescriptionText[0].toUpperCase()}${tempDescriptionText.slice(
    1
  )}`;
  ulAdditionalInfos.classList.remove("hidden");
  tempMax.textContent = `${Math.round(data.main.temp_max)}ºC`;
  tempMin.textContent = `${Math.round(data.main.temp_min)}ºC`;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed}km/h`;
  resetValue(typedCity);
}

function resetValue(element) {
  element.value = "";
}

function showHiddenElements(...element) {
  element.forEach((elem) => {
    elem.classList.remove("hidden");
  });
}

function toggleClass(className, ...element) {
  element.forEach((e) => e.classList.toggle(className));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  showWeatherData();
});

body.addEventListener("click", (e) => {
  if (e.target == body) {
    toggleClass("hidden", cityName, containerTemp, ulAdditionalInfos);
  }
});

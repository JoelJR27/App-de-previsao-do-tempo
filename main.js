const apiKey = "cdf1bd73a062caed520049b6103ed3af";
const form = getDocumentElement("#form");
const cityInput = getDocumentElement("#typedCityInput");
const paragraphError = getDocumentElement(".city__error");
const cityName = getDocumentElement(".city__name");
const containerTemp = getDocumentElement(".container__temp");
const ulAdditionalInfos = getDocumentElement(".additional__infos");

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
  const typedCityValue = cityInput.value.trim();
  if (!typedCityValue) return;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    setTextContent(paragraphError, "Cidade não encontrada!");
    paragraphError.classList.remove("hidden");
    resetValue(cityInput);
    return;
  }
  paragraphError.classList.add("hidden");
  return await response.json();
}

function setWeatherIcons(id) {
  const iconImage = document.querySelector(".descriptionImage");
  iconImage.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${id}@2x.png`
  );
}

function getDocumentElement(selector) {
  return document.querySelector(selector);
}

function setTextContent(element, text) {
  element.textContent = text;
}

async function showWeatherData() {
  const typedCityValue = cityInput.value.trim();
  if (!typedCityValue) return;
  const data = await getWeatherData(typedCityValue);
  const weather = data.weather[0];
  const sunrise = new Date(data.sys.sunrise * 1000);
  const sunset = new Date(data.sys.sunset * 1000);
  setWeatherIcons(weather.icon);
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  showHiddenElements(cityName, containerTemp);
  setTextContent(
    getDocumentElement(".temp"),
    `${Math.round(data.main.temp)}ºC`
  );
  setTextContent(getDocumentElement(".temp__description"), weather.description);
  setTextContent(
    getDocumentElement(".tempMax"),
    `${Math.round(data.main.temp_max)}ºC`
  );
  setTextContent(
    getDocumentElement(".tempMin"),
    `${Math.round(data.main.temp_min)}ºC`
  );
  setTextContent(getDocumentElement(".humidity"), `${data.main.humidity}%`);
  setTextContent(
    getDocumentElement(".wind"),
    `${Math.round(data.wind.speed)}km/h`
  );
  setTextContent(getDocumentElement(".sunrise"), sunrise.toLocaleTimeString());
  setTextContent(getDocumentElement(".sunset"), sunset.toLocaleTimeString());
  ulAdditionalInfos.classList.remove("hidden");
  resetValue(cityInput);
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

document.body.addEventListener("click", (e) => {
  if (e.target == document.body) {
    toggleClass("hidden", cityName, containerTemp, ulAdditionalInfos);
  }
});

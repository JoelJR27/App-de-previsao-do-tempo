const apiKey = "cdf1bd73a062caed520049b6103ed3af";
const form = document.getElementById("form");
const city = document.getElementById("inputCityName");
const cityName = document.querySelector('.city__name')
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(city.value);
  cityName.classList.toggle('hidden')
});

async function getWeatherData(city) {
  const weatherData = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=standard&appid=${apiKey}&lang=pt_br`;
  try {
    const json = await fetch(weatherData).then((res) => res.json());
    console.log(json);
  } catch {
    console.error("Algo deu errado!");
  }
}

getWeatherData("Rio de janeiro");

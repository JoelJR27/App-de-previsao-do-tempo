const apiKey = "cdf1bd73a062caed520049b6103ed3af";

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

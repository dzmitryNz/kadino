import setShedules from "./setShedules.js";

const teperatureUrl = "https://rbstr.tk:3000/home";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Mogilev&lang=ru&appid=351bef36095247499eb96265dfb607d2&units=metric";
const temperatureKadino = document.getElementById("temperatureKadino");
const temperatureMogilev = document.getElementById("temperatureMogilev");
const weatherIcon = document.getElementById("weatherIcon");
const weatherDescription = document.getElementById("weatherDescription");
const wind = document.getElementById("wind");
const timeNowHours = document.getElementById("timeNowHours");
const timeNowMins = document.getElementById("timeNowMins");
const collapseKirova = document.getElementById("collapseKirova");
const collapseKadino = document.getElementById("collapseKadino");
const collapseVokzal = document.getElementById("collapseVokzal");
const collapseRomanovichi = document.getElementById("collapseRomanovichi");
const urlParams = new URLSearchParams(window.location.search);

const from = urlParams.get("from");

// console.log("from:", from);
if (from && from.toLowerCase() !== "kirova") { 
  collapseKirova.classList.remove("show");
  if (from.toLowerCase().match("kadino" || "кадино")) collapseKadino.classList.add("show");
  if (from.toLowerCase().match("vokzal" || "вокзал")) collapseVokzal.classList.add("show");
  if (from.toLowerCase().match("romanovichi" || "романовичи")) collapseRomanovichi.classList.add("show");
} 

let date, hours, mins, day;

async function getTemperature () {
  temperatureKadino.innerText = "";
  temperatureMogilev.innerText = "";
  const req = await fetch(teperatureUrl);
  const res = await req.json();
  if (res[0].blOut) temperatureKadino.innerText = res[0].blOut + "°С";
  
  setTimeout(() => setShedule(), 800000);
};

async function getWeather() {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    if (data.code !== 200) {
        weatherIcon.textContent = "";
        temperatureMogilev.textContent = "";
        weatherDescription.textContent = "";
        wind.textContent = "";
        console.log(data)
        return
    }
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperatureMogilev.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `ветер: ${Math.round(data.wind.speed)}м/с`;

    setTimeout(getWeather, 1000000);
}

const timeUpdate = () => {
  
  const addZero = (digit) => { return digit < 10 ? `0${digit}` : digit };

  date = new Date();
  day = date.getDay();
  hours = date.getHours();
  mins = date.getMinutes();
  
  //  hours = 12; mins = 22;

  timeNowHours.innerText = addZero(hours);
  timeNowMins.innerText = addZero(mins);

  setTimeout(() => timeUpdate(), 5000);
};

timeUpdate();
setShedules(day, hours, mins);
getTemperature();
getWeather();

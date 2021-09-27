import shedule from "./shedule.js";

const teperatureUrl = "https://rbstr.tk:3000/home";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Mogilev&lang=ru&appid=351bef36095247499eb96265dfb607d2&units=metric";
const temperatureKadino = document.getElementById("temperatureKadino");
const temperatureMogilev = document.getElementById("temperatureMogilev");
const weatherIcon = document.getElementById("weatherIcon");
const weatherDescription = document.getElementById("weatherDescription");
const wind = document.getElementById("wind");
const timeNowHours = document.getElementById("timeNowHours");
const timeNowMins = document.getElementById("timeNowMins");
const timeNext = document.getElementById("timeNext");
const timeNextKadino = document.getElementById("timeNextKadino");
const timeNextKirova = document.getElementById("timeNextKirova");
const timeNextRomanovichi = document.getElementById("timeNextRomanovichi");
const timeNextVokzal = document.getElementById("timeNextVokzal");
const sheduleKadino = document.getElementById("sheduleKadino");
const sheduleKirova = document.getElementById("sheduleKirova");
const sheduleRomanovichi = document.getElementById("sheduleRomanovichi");
const sheduleVokzal = document.getElementById("sheduleVokzal");
const collapseKirova = document.getElementById("collapseKirova");
const collapseKadino = document.getElementById("collapseKadino");
const collapseVokzal = document.getElementById("collapseVokzal");
const collapseRomanovichi = document.getElementById("collapseRomanovichi");
const urlParams = new URLSearchParams(window.location.search);

const from = urlParams.get("from");

// console.log("from:", from);
if (from && from.toLowerCase() !== "kirova") { 
  collapseKirova.classList.remove("show");
  if (from.toLowerCase().match("kadino" || "%D0%BA%D0%B0%D0%B4%D0%B8%D0%BD%D0%BE")) collapseKadino.classList.add("show");
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
    if (data.cod !== 200) {
        alert(`Ошибка ${data.cod} \n ${data.message}!`);
        weatherIcon.textContent = '';
        temperature.textContent = 'No Data';
        weatherDescription.textContent = '';
        humidity.textContent = 'No Data';
        wind.textContent = '';
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

  setTimeout(() => timeUpdate(), 2000);
};

const setShedule = () => {
  let kirova, elNow, kadino, romanovichi, vokzal;
  if(day < 6) {
    kirova = shedule.kirova;
    kadino = shedule.kadino;
    romanovichi = shedule.romanovichi;
    vokzal = shedule.vokzal;
  } else {
    if(day === 6) {
    kirova = shedule.kirova6;
    kadino = shedule.kadino6;
    romanovichi = shedule.romanovichi6;
    vokzal = shedule.vokzal6;
    }
    if(day === 7) {
      kirova = shedule.kirova7;
      kadino = shedule.kadino7;
      romanovichi = shedule.romanovichi7;
      vokzal = shedule.vokzal7;
    }
  };

  elNow = []; sheduleKirova.innerText = ""; timeNextKirova.innerText = "";
  
  kirova.forEach(el => {
    const arrEl = el.split(":"); 
    const newEl = document.createElement("span");
    if(Number(arrEl[0]) >= hours) {
      newEl.classList.add("shedule");
      if(Number(arrEl[0]) === hours && Number(arrEl[1]) < mins) newEl.classList.add("oldshedule")
      if(Number(arrEl[0]) === hours && Number(arrEl[1]) >= mins) {
        newEl.classList.add("shedulenow");
        elNow.push(el);
      }
      if((Number(arrEl[0]) - hours) > 1) newEl.classList.add("shedulelong");
    } else {
      newEl.classList.add("shedule")
      newEl.classList.add("oldshedule")
    }
    timeNextKirova.innerText = elNow.join(",  ");
    newEl.innerText = el;
    sheduleKirova.appendChild(newEl);
  });

  elNow = []; sheduleKadino.innerText = ""; timeNextKadino.innerText = "";
  
  kadino.map(el => {
    const arrEl = el.split(":"); 
    const newEl = document.createElement("span");
    if(Number(arrEl[0]) >= hours) {
      newEl.classList.add("shedule");
      if(Number(arrEl[0]) === hours && Number(arrEl[1]) < mins) newEl.classList.add("oldshedule")
      if(Number(arrEl[0]) === hours && Number(arrEl[1]) >= mins) {
        newEl.classList.add("shedulenow");
        elNow.push(el);
      }
      if((Number(arrEl[0]) - hours) > 1) newEl.classList.add("shedulelong");
    } else {
      newEl.classList.add("shedule")
      newEl.classList.add("oldshedule")
    }
    timeNextKadino.innerText = elNow.join(",  ");
    newEl.innerText = el;
    sheduleKadino.appendChild(newEl);
  });

  elNow = []; sheduleRomanovichi.innerText = ""; timeNextRomanovichi.innerText = "";

  romanovichi.map(el => {
    const arrEl = el.split(":"); 
    const newEl = document.createElement("span");
    if(Number(arrEl[0]) >= hours) {
      newEl.classList.add("shedule");
      if(Number(arrEl[0]) === hours && Number(arrEl[1]) < mins) newEl.classList.add("oldshedule")
      if(Number(arrEl[0]) === hours && Number(arrEl[1]) >= mins) {
        newEl.classList.add("shedulenow");
        elNow.push(el);
      }
      if((Number(arrEl[0]) - hours) > 1) newEl.classList.add("shedulelong");
    } else {
      newEl.classList.add("shedule")
      newEl.classList.add("oldshedule")
    }
    timeNextRomanovichi.innerText = elNow.join(",  ");
    newEl.innerText = el;
    sheduleRomanovichi.appendChild(newEl);
  });

  elNow = [];
  sheduleVokzal.innerText = "";
  timeNextVokzal.innerText = "";
  vokzal.map(el => {
    const arrEl = el.split(":"); 
    const newEl = document.createElement("span");
    if(Number(arrEl[0]) >= hours) {
      newEl.classList.add("shedule");
      if(Number(arrEl[0]) === hours && Number(arrEl[1]) < mins) newEl.classList.add("oldshedule")
      if(Number(arrEl[0]) === hours && Number(arrEl[1]) >= mins) {
        newEl.classList.add("shedulenow");
        elNow.push(el);
      }
      if((Number(arrEl[0]) - hours) > 1) newEl.classList.add("shedulelong");
    } else {
      newEl.classList.add("shedule")
      newEl.classList.add("oldshedule")
    }
    timeNextVokzal.innerText = elNow.join(",  ");
    newEl.innerText = el;
    sheduleVokzal.appendChild(newEl);
  });

  setTimeout(() => setShedule(), 30000);
};

timeUpdate();
setShedule();
getTemperature();
getWeather();

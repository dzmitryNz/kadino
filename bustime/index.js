import shedule from "./shedule.js";

const timeNowHours = document.getElementById("timeNowHours");
const timeNowMins = document.getElementById("timeNowMins");
const timeNext = document.getElementById("timeNext");
const timeNextKadino = document.getElementById("timeNextKadino");
const timeNextKirova = document.getElementById("timeNextKirova");
const timeNextRomanovichi = document.getElementById("timeNextRomanovichi");
const sheduleKadino = document.getElementById("sheduleKadino");
const sheduleKirova = document.getElementById("sheduleKirova");
const sheduleRomanovichi = document.getElementById("sheduleRomanovichi");

console.log(shedule)

let date, hours, mins, day;

const timeUpdate = () => {
  
  const addZero = (digit) => { return digit < 10 ? `0${digit}` : digit };

  date = new Date();
  day = date.getDay();
  // hours = date.getHours();
  // mins = date.getMinutes();
  hours = 12;
  mins = 22;

  timeNowHours.innerText = addZero(hours);
  timeNowMins.innerText = addZero(mins);

  setTimeout(() => timeUpdate(), 2000);
};

const setShedule = () => {
  let kirovaBus, kirovaMbus, kirova, elArr, elNow;
  if(day < 6) {
    kirovaMbus = shedule.kirovaMbus;
    kirovaBus = shedule.kirovaBus;
  } else {
    if(day === 6) console.log(day);
    if(day === 7) console.log(day);
  };
  kirova = kirovaBus.concat(kirovaMbus);
  console.log(kirova)
  kirova = kirova.sort()
    elNow = [];
    elArr = [];
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
};

timeUpdate();
setShedule();

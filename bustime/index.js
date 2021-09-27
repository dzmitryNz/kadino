import shedule from "./shedule.js";

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

const from = urlParams.get("from").toLowerCase();

console.log("from:", from);
if (from && from !== "kirova") { 
  collapseKirova.classList.remove("show");
  if (from === "kadino") collapseKadino.classList.add("show");
  if (from === "vokzal") collapseVokzal.classList.add("show");
  if (from === "romanovichi") collapseRomanovichi.classList.add("show");
} 

let date, hours, mins, day;

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

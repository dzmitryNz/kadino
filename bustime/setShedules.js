import shedule from "./shedule.js";

const timeNextKadino = document.getElementById("timeNextKadino");
const timeNextKirova = document.getElementById("timeNextKirova");
const timeNextRomanovichi = document.getElementById("timeNextRomanovichi");
const timeNextVokzal = document.getElementById("timeNextVokzal");
const sheduleKadino = document.getElementById("sheduleKadino");
const sheduleKirova = document.getElementById("sheduleKirova");
const sheduleRomanovichi = document.getElementById("sheduleRomanovichi");
const sheduleVokzal = document.getElementById("sheduleVokzal");

export default function setShedules(day, hours, mins) {
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

  function sheduling(sheduleArr, nextEl, sheduleEl) {
    sheduleEl.innerText = ""; nextEl.innerText = "";
    elNow = [];
    sheduleArr.forEach(el => {
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
      nextEl.innerText = elNow.join(",  ");
      newEl.innerText = el;
      sheduleEl.appendChild(newEl);
    });
  }

  
  sheduling(kirova, timeNextKirova, sheduleKirova)
  sheduling(kadino, timeNextKadino, sheduleKadino)
  sheduling(romanovichi, timeNextRomanovichi, sheduleRomanovichi)
  sheduling(vokzal, timeNextVokzal, sheduleVokzal)
  
  setTimeout(() => setShedule(), 30000);
};

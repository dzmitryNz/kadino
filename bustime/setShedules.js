import shedule from "./shedule.js";

const timeNextKadino = document.getElementById("timeNextKadino");
const timeNextKirova = document.getElementById("timeNextKirova");
const timeNextRomanovichi = document.getElementById("timeNextRomanovichi");
const timeNextVokzal = document.getElementById("timeNextVokzal");
const sheduleKadino = document.getElementById("sheduleKadino");
const sheduleKirova = document.getElementById("sheduleKirova");
const sheduleRomanovichi = document.getElementById("sheduleRomanovichi");
const sheduleVokzal = document.getElementById("sheduleVokzal");

export default function setShedules() {
  const date = new Date();
  const day = date.getDay();
  const hours = date.getHours();
  const mins = date.getMinutes();
  let kirova, elNow, elBack, kadino, romanovichi, vokzal;
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
    elNow = []; elBack = [];
    sheduleArr.forEach(el => {
      const arrEl = el.split(":"); 
      // const newDate = new Date();
      // newDate.setHours(Number(arrEl[0]), Number(arrEl[1]), 0);
      // const deltaMinutes = (newDate - date) / 60000;
      // console.log(el, newDate, deltaMinutes );

      const newEl = document.createElement("span");
      if(Number(arrEl[0]) >= hours) {
        newEl.classList.add("shedule");
        if(Number(arrEl[0]) === hours && Number(arrEl[1]) < mins) newEl.classList.add("oldshedule")
        if(Number(arrEl[0]) === hours && Number(arrEl[1]) >= mins) {
          newEl.classList.add("shedulenow");
          elNow.push(el);
        }
        if((Number(arrEl[0]) - hours) === 1) elNow.push(el);
        if((Number(arrEl[0]) - hours) > 1) {
          newEl.classList.add("shedulelong");
          elBack.push(el);
        };
      } else {
        newEl.classList.add("shedule")
        newEl.classList.add("oldshedule")
      }
      nextEl.innerText = elNow.join(", ");
      newEl.innerText = el;
      sheduleEl.appendChild(newEl);
    });
    if(elBack && elNow.length < 1) nextEl.innerText = elBack.join(", ");
  }
  
  sheduling(kirova, timeNextKirova, sheduleKirova);
  sheduling(kadino, timeNextKadino, sheduleKadino);
  sheduling(romanovichi, timeNextRomanovichi, sheduleRomanovichi);
  sheduling(vokzal, timeNextVokzal, sheduleVokzal);
  
  setTimeout(() => setShedules(), 30000);
};

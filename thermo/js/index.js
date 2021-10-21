import chart from './chart.js';
import api from './api.js';
import create from './create.js';

const url = 'https://rbstr.tk:3000/home/datas/params/504';

const blkOut = document.getElementById('blkOut');
const blkIn = document.getElementById('blkIn');
const bkIn = document.getElementById('bkIn');
const bkP = document.getElementById('bkP');
const dateTime = document.getElementById('dateTime');
const prevdDateTime = document.getElementById('prevdDateTime');
const dirUp = create('span', 'dir-up', '↗', null);
const dirDown = create('span', 'dir-up', '↘', null);

const datas = await api(url);
  console.log(datas)
  const lastData = datas[0];
  const prevData = datas[4];
  const options = {weekday: 'short', year: '2-digit', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'}
  dateTime.innerText = new Date (lastData.datetime).toLocaleString('Ru', options);
  prevdDateTime.innerText = new Date (prevData.datetime).toLocaleString('Ru', options);
  let blOutDir, blInDir, bkInDir, bkPDir;
  console.log(Object.entries(lastData))
  blInDir = prevData.blIn > lastData.blIn ? dirDown : dirUp;
  bkInDir = prevData.bkIn > lastData.bkIn ? dirDown : dirUp;
  bkPDir = prevData.bkP > lastData.bkP ? dirDown : dirUp;
  blOutDir = prevData.blOut > lastData.blOut ? dirDown : dirUp;
  function tempStyle(temp) {
    if (temp > 750) return 'pressure high';
    if (temp > 740) return 'pressure normal';
    if (temp > 700) return 'pressure low';
    if (temp > 27) return 'temp hot';
    if (temp < 15) return 'temp cold';
    return 'temp normal'
  }

  if (lastData.blOut) {
    create('span', tempStyle(lastData.blOut), lastData.blOut.toString(), blkOut);
    blkOut.appendChild(blOutDir);
  }
  if (lastData.blIn) {
    create('span', tempStyle(lastData.blIn), lastData.blIn.toString(), blkIn);
    blkIn.appendChild(blInDir);
  }
  if (lastData.bkIn) {
    create('span', tempStyle(lastData.bkIn), lastData.bkIn.toString(), bkIn);
    bkIn.appendChild(bkInDir);
  }
  if (lastData.bkP) {
    create('span', tempStyle(lastData.bkP), lastData.bkP.toString(), bkP);
    bkP.appendChild(bkPDir);
  }

  const labels = [];
  const dataBlIn = [];
  const dataBlOut = [];
  const dataBkIn = [];
  const dataBkP = [];
  datas.map((el) => {
    labels.push(new Date(el.datetime).toLocaleString('ru', options));
    if (el.blIn) dataBlIn.push(el.blIn);
     else dataBlIn.push(null);
    if (el.blOut) dataBlOut.push(el.blOut);
      else dataBlOut.push(null);
    if (el.bkIn) dataBkIn.push(el.bkIn);
      else dataBkIn.push(null);
    if (el.bkP) dataBkP.push(el.bkP);
      else dataBkP.push(null);
  });

  const datasets = [
    {
      label: 'Балкон',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: dataBlIn,
    },
    {
      label: 'Улица',
      backgroundColor: 'rgb(99, 155, 99)',
      borderColor: 'rgb(99, 155, 99)',
      data: dataBlOut,
    },
    {
      label: 'БК',
      backgroundColor: 'rgb(99, 99, 155)',
      borderColor: 'rgb(99, 99, 155)',
      data: dataBkIn,
    }
    ]
  
  const pDataset = [
    {
      label: 'Атмосферное давление, мм.рт.ст.',
      backgroundColor: 'rgb(99, 155, 99)',
      borderColor: 'rgb(99, 155, 99)',
      data: dataBkP,
    }
  ]

chart('myChart', labels, datasets);
chart('pChart', labels, pDataset);
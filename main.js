'use strict';

let state = [];
let maxRounds = 25;

let trackerEl = document.getElementById('votingTracker');
let imgEls = document.querySelectorAll('#productImages .container img');
let pEls = document.querySelectorAll('#productImages .container p');

let showResultsBtn = document.getElementById('showResultBtn');
showResultsBtn.style.display='none';

let canvas = document.getElementById('canvas');

function CreateProduct(name, source, alt){
  this.timesShown = 0 ;
  this.timesClicked = 0;
  this.name = name;
  this.source = source;
  this.altTxt = alt;
  state.push(this);
}

new CreateProduct('Bag', 'img/bag.jpg');
new CreateProduct('Banana', 'img/banana.jpg');
new CreateProduct('Bathroom', 'img/bathroom.jpg');
new CreateProduct('Boots', 'img/boots.jpg');
new CreateProduct('Breakfast', 'img/breakfast.jpg');
new CreateProduct('Bubblegum', 'img/bubblegum.jpg');
new CreateProduct('Chair', 'img/chair.jpg');
new CreateProduct('Cthulhu', 'img/cthulhu.jpg');
new CreateProduct('Dog-Duck', 'img/dog-duck.jpg');
new CreateProduct('Dragon', 'img/dragon.jpg');
new CreateProduct('Pen', 'img/pen.jpg');
new CreateProduct('Pet-Sweep', 'img/pet-sweep.jpg');
new CreateProduct('Scissors', 'img/scissors.jpg');
new CreateProduct('Shark', 'img/shark.jpg');
new CreateProduct('Sweep', 'img/sweep.png');
new CreateProduct('Tauntaun', 'img/tauntaun.jpg');
new CreateProduct('Unicorn', 'img/unicorn.jpg');
new CreateProduct('Water-Can', 'img/water-can.jpg');
new CreateProduct('Wine-Glass', 'img/wine-glass.jpg');

renderImages();
function randomNum(){
  return Math.floor(Math.random() * state.length);
}

function renderImages(){
  canvas.style.display='none';
  let prevImgs = [];

  for (let i = 0; i < 3; i++) {
    let product = state[randomNum()];

    // Check for duplicate product names
    while (product.name === imgEls[0].id || product.name === imgEls[1].id || product.name === imgEls[2].id || prevImgs.includes(product.name) ) {
      product = state[randomNum()];
    }

    prevImgs.push(product.name);

    imgEls[i].src = product.source;
    imgEls[i].id = product.name;
    imgEls[i].alt = product.altTxt;
    product.timesShown += 1;
    product.productClicked +=1;

    pEls[i].textContent = `${product.name} had ${product.productClicked} votes, and was seen ${product.timesShown} times.`;
  }


}

function handleClick(event){
  let productClicked = event.target.id;

  state.forEach(img => {
    if (img.name === productClicked){
      img.timesClicked += 1;
    }
  });

  if (maxRounds -1){
    renderImages();
    maxRounds--;
  } else {
    trackerEl.removeEventListener('click',handleClick);
    // trackerEl.style.display = 'none';
    showResultsBtn.style.display='block';


  }

  storeData();
}

function drawChart(){
  let labels = [];
  let timesShownVal =[];
  let timesClickedVal =[];

  state.forEach(item => {
    labels.push(item.name);
    timesClickedVal.push(item.timesClicked);
    timesShownVal.push(item.timesShown);

  });

  canvas.style.display='block';


  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Times Clicked',
        data: timesClickedVal,
        borderWidth: 1
      }, {
        label: 'Times Shown',
        data: timesShownVal,
        borderWidth: 1
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function displayResults(){
  drawChart();
}

function storeData(){
  let data = JSON.stringify(state);
  localStorage.setItem('productData', data);
}

function readData(){
  let data = localStorage.getItem('productData');

  if (data){
    state = JSON.parse(data);
  } else {
    storeData();
  }
}

readData();

trackerEl.addEventListener('click', handleClick);
showResultsBtn.addEventListener('click', displayResults);
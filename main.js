'use strict';
const products = [];
let roundsOfVoting = 25;
let results = document.getElementById('results');
let chart = null;
function photos(name, source) {
  this.name = name;
  this.timesClicked = 0;
  this.timesShown = 0;
  this.source = source;
}

products.push(new photos('Bag', 'img/bag.jpg'));
products.push(new photos('Banana', 'img/banana.jpg'));
products.push(new photos('Bathroom', 'img/bathroom.jpg'));
products.push(new photos('Boots', 'img/boots.jpg'));
products.push(new photos('Breakfast', 'img/breakfast.jpg'));
products.push(new photos('Bubblegum', 'img/bubblegum.jpg'));
products.push(new photos('Chair', 'img/chair.jpg'));
products.push(new photos('Cthulhu', 'img/cthulhu.jpg'));
products.push(new photos('Dog-duck', 'img/dog-duck.jpg'));
products.push(new photos('Dragon', 'img/dragon.jpg'));
products.push(new photos('Pen', 'img/pen.jpg'));
products.push(new photos('Pet-sweep', 'img/pet-sweep.jpg'));
products.push(new photos('Scissors', 'img/scissors.jpg'));
products.push(new photos('Shark', 'img/shark.jpg'));
products.push(new photos('Sweep', 'img/sweep.png'));
products.push(new photos('Tauntaun', 'img/tauntaun.jpg'));
products.push(new photos('Unicorn', 'img/unicorn.jpg'));
products.push(new photos('Water-can', 'img/water-can.jpg'));
products.push(new photos('Wine-glass', 'img/wine-glass.jpg'));

let imgElp = document.querySelectorAll('img');
let voteTrackerEl = document.getElementById('vote-tracker');
let buttonEl = document.getElementById('button');
const canvasEl = document.getElementById('chart');
imgElp[0].src = products[0].source;
imgElp[0].id = products[0].name;
imgElp[1].src = products[1].source;
imgElp[1].id = products[1].name;
imgElp[2].src = products[2].source;
imgElp[2].id = products[2].name;
function generateRandomimgs() {
  const index = new Set();
  while (index.size < 3) {
    const randomIndex = Math.floor(Math.random() * products.length);
    if (!index.has(randomIndex)) {
      index.add(randomIndex);
    }
  }
  const uniqueIndex = Array.from(index);
  return uniqueIndex;
}
function renderimgs() {
  let indexes = generateRandomimgs();
  let photos = products[generateRandomimgs()];
  imgElp[0].src = products[indexes[0]].source;
  imgElp[0].id = products[indexes[0]].name;
  products[indexes[0]].timesShown++;
  imgElp[1].src = products[indexes[1]].source;
  imgElp[1].id = products[indexes[1]].name;
  products[indexes[1]].timesShown++;
  imgElp[2].src = products[indexes[2]].source;
  imgElp[2].id = products[indexes[2]].name;
  products[indexes[2]].timesShown++;
}
renderimgs();
function handleClick(event) {
  let productThatWasClicked = event.target.value;
  console.log(productThatWasClicked);
}
function handleProductClick(event) {
  let productThatWasClicked = event.target.id;
  console.log(productThatWasClicked);
  products.forEach(image => {
    if (image.name === productThatWasClicked) {
      image.timesClicked += 1;
    }
  });
  if (roundsOfVoting) {
    renderimgs();
    roundsOfVoting--;
  } else {
    voteTrackerEl.removeEventListener('click', handleProductClick);
    buttonEl.addEventListener('click', renderData);
    drawChart();
    console.log('chart drawn');
  }
}
voteTrackerEl.addEventListener('click', handleProductClick);
function renderData(event) {
  let buttonClicked = event.target.id;
  products.forEach(products => {
    let listItemEl = document.createElement('li');
    let parentContainerEl = document.getElementById('results');
    parentContainerEl.appendChild(listItemEl);
    listItemEl.textContent = `${products.name} had ${products.timesClicked} votes, and was shown ${products.timesShown} times.`;
    products.timesClicked;
    products.timesShown;
  });
}
let chartObj = document.getElementById('chart').getContext('2d');
function drawChart() {
  let labels = [];
  let timesShownValues = [];
  let timesClickedValues = [];
  products.forEach(products => {
    labels.push(products.name);
    timesShownValues.push(products.timesShown);
    timesClickedValues.push(products.timesClicked);
  });
  chart = new Chart(chartObj, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Times Shown',
        data: timesShownValues,
        borderWidth: 1
      }, {
        label: 'Times Clicked',
        data: timesClickedValues,
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
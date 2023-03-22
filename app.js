'use strict';

const state = [];
let roundsOfVoting = 25;
let finalResult = document.getElementById('ul');
let trueResults = document.getElementById('trueResults');
console.log(finalResult);



function Image(name, source) {
  this.name = name;
  this.timesClicked = 0;
  this.timesShown = 0;
  this.source = source;
  state.push(this);
}


function results() {
  let renderResults = document.createElement('ul');
  for (let i = 0; i < state.length; i++) {
    let item = document.createElement('li');
    item.textContent = `${state[i].name}: ${state[i].timesClicked}`;
    renderResults.appendChild(item);
  }
  console.log(renderResults);
  trueResults.appendChild(renderResults);
}

state.push(new Image('bag', 'img/bag.jpg'));
state.push(new Image('banana', 'img/banana.jpg'));
state.push(new Image('bathroom', 'img/bathroom.jpg'));
state.push(new Image('boots', 'img/boots.jpg'));
state.push(new Image('breakfast', 'img/breakfast.jpg'));
state.push(new Image('bubblegum', 'img/bubblegum.jpg'));
state.push(new Image('chair', 'img/chair.jpg'));
state.push(new Image('cthulhu', 'img/cthulhu.jpg'));
state.push(new Image('dog-duck', 'img/dog-duck.jpg'));
state.push(new Image('dragon', 'img/dragon.jpg'));
state.push(new Image('pen', 'img/pen.jpg'));
state.push(new Image('pet-sweep', 'img/pet-sweep.jpg'));
state.push(new Image('scissors', 'img/scissors.jpg'));
state.push(new Image('shark', 'img/shark.jpg'));
state.push(new Image('sweep', 'img/sweep.png'));
state.push(new Image('tauntaun', 'img/tauntaun.jpg'));
state.push(new Image('unicorn', 'img/unicorn.jpg'));
state.push(new Image('water-can', 'img/water-can.jpg'));
state.push(new Image('wine-glass', 'img/wine-glass.jpg'));


let imgEls = document.querySelectorAll('img'); //array like thing filled with all the img elements in my html
let imageOne = document.getElementById('image-1');
let imageTwo = document.getElementById('image-2');
let imageThree = document.getElementById('image-3');
let voteTrackerEl = document.getElementById('images');

console.log('CURRENTLY RENDERED IMAGES', imgEls);

console.log('CURRENT STATE', state);

// render our first duck images
imageOne.src = state[0].source;
// imgEls[0].id = state[0].name;
imageTwo.src = state[1].source;
// imgEls[1].id = state[1].name;
imageThree.src = state[2].source;
// imgEls[2].id = state[2].name;
renderducks();

function generateRandomduck() {
  return Math.floor(Math.random() * state.length);
}

function renderducks() {
  // find some ducks from state
  let duck1 = state[generateRandomduck()];
  let duck2 = state[generateRandomduck()];
  let duck3 = state[generateRandomduck()];
  console.log('DUCKS to re-render', imgEls, duck1, duck2, duck3);
  while (duck1.name === duck2.name) {
    duck2 = state[generateRandomduck()];
  }
  // this should garuantee fresh ducks
  imgEls[0].src = duck1.source; // this makes things render
  imgEls[0].id = duck1.name;
  duck1.timesShown += 1;
  imgEls[1].src = duck2.source;
  imgEls[1].id = duck2.name;
  duck2.timesShown += 1;
  imgEls[2].src = duck3.source;
  imgEls[2].id = duck3.name;
  duck3.timesShown += 1;
}

function handleduckClick(event) {
  console.log(event.target); // event.target always represents the exact element where an event occurred.

  // identify which image was clicked on??
  let duckThatWasClicked = event.target.id;
  state.forEach(image => {
    if (image.name === duckThatWasClicked) {
      image.timesClicked += 1; // mutation of an object
      console.log(image.timesClicked);
    }
  });
  console.log('UPDATED STATE', state);

  // re-render new duck images -> random duck image from state
  if (roundsOfVoting) {
    renderducks();
    roundsOfVoting--;
  } else {
    voteTrackerEl.removeEventListener('click', handleduckClick);
  }
}

voteTrackerEl.addEventListener('click', handleduckClick);

let eventId = voteTrackerEl.addEventListener('click', function (event) {
  console.log(event.target); // event.target always represents the exact element where an event occurred.

  // identify which image was clicked on??
  let duckThatWasClicked = event.target.id;
  state.forEach(image => {
    if (image.name === duckThatWasClicked) {
      image.timesClicked += 1; // mutation of an object
    }
  });
  console.log('UPDATED STATE', state);

  // re-render new duck images -> random duck image from state
  if (roundsOfVoting) {
    renderducks();
    roundsOfVoting--;
  } else {
    voteTrackerEl.removeEventListener('click', eventId);
  }
});
finalResult.addEventListener('click', results);

'use strict'

function whackAMoleView(container, model) {
  // let grid = container.querySelector('.grid-container');
  let grid = document.createElement('div');
  grid.className = 'grid-container';

  let start = document.createElement('button');
  start.className = 'start';
  start.innerHTML = 'start';

  let scoreDiv = document.createElement('div');
  scoreDiv.className = 'row';
  let scoreBoard = document.createElement('h3');
  scoreBoard.innerHTML = "Total score:&nbsp"
  let scores = document.createElement('h3');
  scoreDiv.append(scoreBoard, scores);

  let moveDiv = document.createElement('div');
  moveDiv.className = 'row';
  let moveBoard = document.createElement('h3');
  moveBoard.innerHTML = "Moves left:&nbsp"
  let moves = document.createElement('h3');
  moveDiv.append(moveBoard, moves);

  container.appendChild(start);
  container.appendChild(grid);
  container.appendChild(scoreDiv);
  container.appendChild(moveDiv);

  grid.addEventListener('click', function(event) {
    let {score, counter, hit} = model.updateScoreAndStep(event);
    changeRender(event, hit);

    if (model.checkGameEnd()) {
      grid.style.display = 'none';
      start.disabled = false;
    }

    numberRender(score, counter);
  });

  start.addEventListener('click', function() {
    start.disabled = true;
    firstRender(true);
    model.startGame()
    numberRender();
  })

  function firstRender(start) {
    if (start) {
      gridInitiate(grid);
    }
  }

  function render(data = []) {
    let gridItems = Array.from(grid.children);
    for (let i = 0; i < 9; i++) {
      gridItems[i].innerHTML = data[i] ? 'M' : '';
    }
  }

  function numberRender(points = 0, move = 9) {
    scores.innerHTML = points;
    moves.innerHTML = move;
  }

  function changeRender(event, hit) {
    event.target.innerHTML = hit ? 'BAM' : 'MISS';
  }

  model.subscribe(render);

  firstRender(false);
}

function whackAMoleModel() {
  let data;
  let subscriber;
  let score, counter;
  let interval;

  function updateGrid() {
    data = new Array(9);
    for (let i = 0; i < data.length; i++) {
      data[i] = false;
    }

    randomHelper(3).forEach(idx => data[idx] = true);
    if (counter < 1) {
      grid.style.display = 'none';
      subscriber([])
      clearInterval(interval);
      return;
    } else {
      subscriber(data);
    }
  }

  function updateScoreAndStep(event) {
    let hit;
    if (event.target.innerHTML === 'M') {
      score++;
      hit = true;
    } else {
      hit = false;
    }
    counter--;
    return {score, counter, hit};
  }

  function startGame() {
    counter = 9;
    score = 0;
    interval = setInterval(updateGrid, 1000);
    updateGrid();
  }

  function checkGameEnd() {
    if (counter < 1) {
      return true;
    } else {
      return false;
    }
  }

  return {
    subscribe: function (fn) {
      if (!subscriber) subscriber = fn;
    },
    updateScoreAndStep,
    startGame,
    checkGameEnd,
  };
}

function gridInitiate(container) {
  container.style.display = '';
  if (container.children.length === 9) {
    for (let item of container.children) {
      item.innerHTML = '';
    }
  } else {
    for (let i = 0; i < 9; i++) {
      let box = document.createElement('div');
      box.className = "grid-item"
      container.appendChild(box);
    }
  }
}

function randomHelper(num) {
  let result = new Set();
  do {
    let random = Math.floor(Math.random() * 9);
    result.add(random);
  } while (result.size < num)
  return [...result];
}

let container = document.querySelector('.container');
let model = whackAMoleModel();
let view = whackAMoleView(container, model);
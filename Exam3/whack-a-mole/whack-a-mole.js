'use strict'

function whackAMoleView(container, model) {
  let grid = document.createElement('div');
  grid.className = "grid";
  grid.style.gridTemplateColumns = 'auto auto auto';
  container.appendChild(grid);

  function render(data = []) {
    for (let i = 0; i < 9; i++) {
      let box = document.createElement('div');
      box.className = "grid-box"
      box.innerHTML = data[i] ? 'M' : '';
      grid.appendChild(box);
    }
  }

  model.subscribe(render);

  render();
}

function whackAMoleModel() {
  let data, count, subscriber;

  function updateGrid() {
    data = new Array(9);
    count = 0;
    for (let i = 0; i < data.length; i++) {
      if (count < 3) {
        if (i + 1 === data.length) {
          data[i] = true;
        } else {
          let r = randomHelper();
          if (r) {
            data[i] = true;
            count++;
          } else {
            data[i] = false;
          }
        }
      } else {
        data[i] = false;
      }
    }

    subscriber(data);
  }

  let grid = document.querySelector('.grid');
  grid.addEventListener('click', function() {
    alert(event.target);
  })

  return {
    subscribe: function (fn) {
      if (!subscriber) subscriber = fn;
    }
  };
}

function randomHelper() {
  let random = Math.random();
  if (random < (1 / 3)) {
    return true;
  } else {
    return false;
  }
}

let container = document.querySelector('.container');
// alert(container);
let model = whackAMoleModel();
let view = whackAMoleView(container, model);
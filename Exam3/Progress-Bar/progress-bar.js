// function progress() {
//   let width = 0;
//   let progress = document.querySelector(".progress-bar");
//   progress.style.background = "green";
//   let interval = setInterval(move, 50);
//   function move() {
//     if (width >= 100) {
//       clearInterval(interval);
//     } else {
//       width++;
//       progress.innerHTML = `${width}%`;
//       progress.style.width = `${width}%`;
//     }
//   }
// }

// addEventListener('load', progress);

function view(container, model) {
  function render(data) {
    let progressBar = container.querySelector('.progress-bar');
    progressBar.style.width = data + '%';
  }
  model.subscribe(render);
  render();
}

function model() {
  let subscriber;
  let data = 0;
  let gap = 100;
  let interval;

  function update() {
    if (data >= 100) {
      clearInterval(interval);
    }
    data++;
    subscriber(data);
  }

  interval = setInterval(update, gap);

  return {
    subscribe: function(updateView) {
      if (!subscriber) subscriber = updateView;
    } 
  }
}

let c = document.querySelector('.bar-container');
let m = model();
let v = view(c, m);
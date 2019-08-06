'use strict'
const arr = ['darth', 'jar jar bink', 'yoda', 'Anakin SkyWalker', 'Luke SkyWalker', 'princess leia']

function removeDropdown(container) {
  container.removeChild(container.lastChild);
}

function typeAheadView(container, model) {
  function render(data = document.createElement('ul'), state) {
    let dropdownMenu = container.querySelector('.dropdown-container');
    removeDropdown(dropdownMenu);
    dropdownMenu.appendChild(data);
    // console.log(state)
    if (!state) return;
    else {
      let choseState = document.querySelector('.character');
      choseState.innerHTML = state;
    }
  }

  model.subscribe(render);

  render();
}

function typeAheadModel() {
  let data, state;
  let form = document.querySelector('form');
  let input = form.querySelector('input[type="textarea"]')
  let subscriber;

  function updateDropdown() {
    data = document.createElement('ul');
    data.className = "dropdown";
    let cur = input.value;
    state = '';
    if (!!cur) {
      let regex = new RegExp(`(.)*${cur}(.)*`, "gi")
      for (let item of arr) {
        if (!item.match(regex)) {
          continue;
        }
        let option = document.createElement('li');
        option.innerHTML = item;
        data.appendChild(option);
      }

      if (data.children.length === 1) {
        state = data.firstChild.innerHTML;
      }

      data.addEventListener('click', function () {
        if (event.target.closest('li')) {
          input.value = event.target.textContent;
          data.innerHTML = '';
          state = input.value;
          input.focus();
        }
      });
    }
    subscriber(data);
  }

  input.addEventListener('input', updateDropdown);

  form.onsubmit = function () {
    data.innerHTML = input.value = '';
    console.log(state)
    subscriber(data, state);
    return false;
  }

  return {
    subscribe: function (fn) {
      if (!subscriber) subscriber = fn;
    }
  }
}

let container = document.querySelector('.typeahead-container');
let model = typeAheadModel();
let view = typeAheadView(container, model);
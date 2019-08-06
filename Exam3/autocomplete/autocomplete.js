'use strict'
const arr = ['CA',
  'AZ',
  'WA',
  'NY',
  'OR',
  'TX',
  'TS',
  'ML',
  'MX'
];

function removeDropdown(container) {
  container.removeChild(container.lastChild);
}

function autocompleteView(container, model) {
  function render(data = document.createElement('ul'), state) {
    let dropdownMenu = container.querySelector('.dropdown-container');
    removeDropdown(dropdownMenu);
    dropdownMenu.appendChild(data);
    if (!state) return;
    else {
      let choseState = document.querySelector('.state');
      choseState.innerHTML = state;
    }
  }
  model.subscribe(render);

  render();
}

function autocompleteModel() {
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

  form.onsubmit = function() {
    data.innerHTML = input.value = '';
    subscriber(data, state);
    return false;
  }

  return {
    subscribe: function (fn) {
      if (!subscriber) subscriber = fn;
    }
  }
}

let container = document.querySelector('.autocomplete-container');
let model = autocompleteModel();
let view = autocompleteView(container, model);
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

function typeAheadView(container, model) {
  function render(data = document.createElement('ul')) {
    let dropdownMenu = container.querySelector('.dropdown-container');
    removeDropdown(dropdownMenu);
    dropdownMenu.appendChild(data);
  }
  model.subscribe(render);

  render();
}

function typeAheadModel() {
  let data;
  let input = document.querySelector('input[type="textarea"]')
  let subscriber;

  function updateDropdown() {
    data = document.createElement('ul');
    data.className = "dropdown";
    let cur = input.value;
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
      data.addEventListener('click', function () {
        if (event.target.closest('li')) {
          input.value = event.target.textContent;
          data.innerHTML = '';
        }
      });
    }
    subscriber(data);
  }
  input.addEventListener('keyup', updateDropdown)

  return {
    subscribe: function (fn) {
      if (!subscriber) subscriber = fn;
    },
    updateDropdown: updateDropdown,
  }
}

let container = document.querySelector('.typeahead-container');
let model = typeAheadModel();
let view = typeAheadView(container, model);
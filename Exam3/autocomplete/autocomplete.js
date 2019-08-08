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
  let form = document.createElement('form');

  let dropdownContainer = document.createElement('div');
  dropdownContainer.className = 'dropdown-container';
  let dropdownMenu = document.createElement('ul');
  dropdownMenu.className = 'dropdown';

  let inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';
  let input = document.createElement('input');
  input.type = 'textarea';
  let submit = document.createElement('input');
  submit.type = 'submit';

  container.appendChild(form);
  form.appendChild(dropdownContainer);
  dropdownContainer.appendChild(inputContainer);
  dropdownContainer.appendChild(dropdownMenu);
  inputContainer.appendChild(input);
  inputContainer.appendChild(submit);

  let choseState = document.querySelector('.state');

  function render(data = [], state) {
    dropdownMenu.innerHTML = '';
    for (let item in data) {
      dropdownMenu.appendChild(data[item]);
    }
    if (!state) return;
    else {
      choseState.innerHTML = state;
    }
  }

  input.addEventListener('input', function () {
    model.updateDropdown(input.value);
  });

  dropdownMenu.addEventListener('click', function (event) {
      input.value = event.target.textContent;
      dropdownMenu.innerHTML = '';
      model.setState(input.value);
      input.focus();
  });

  form.onsubmit = function () {
    dropdownMenu.innerHTML = input.value = '';
    render([], model.getState());
    return false;
  }

  model.subscribe(render);

  render();
}

function autocompleteModel() {
  let data, state;
  let form = document.querySelector('form');
  let subscriber;

  function updateDropdown(value) {
    data = []
    if (!!value) {
      let regex = new RegExp(`(.)*${value}(.)*`, "gi")
      for (let item of arr) {
        if (!item.match(regex)) {
          continue;
        }
        let option = document.createElement('li');
        option.innerHTML = item;
        data.push(option);
      }

      if (data.length === 1) {
        state = data[0].innerHTML;
      }
    }

    subscriber(data);
  }

  function setState(s) {
    state = s;
  }

  function getState() {
    return state;
  }

  return {
    subscribe: function (fn) {
      if (!subscriber) subscriber = fn;
    },
    updateDropdown,
    setState,
    getState,
  }
}

let container = document.querySelector('.autocomplete-container');
let model = autocompleteModel();
let view = autocompleteView(container, model);
'use strict'

function removeDropdown(container) {
  container.removeChild(container.lastChild);
}

function typeAheadView(container, model) {
  let form = document.createElement('form');
  let info = document.createElement('div');

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
  container.append(info);
  form.appendChild(dropdownContainer);
  dropdownContainer.appendChild(inputContainer);
  dropdownContainer.appendChild(dropdownMenu);
  inputContainer.appendChild(input);
  inputContainer.appendChild(submit);

  function render(data = [], character = null) {
    dropdownMenu.innerHTML = '';
    for (let item in data) {
      dropdownMenu.appendChild(data[item]);
    }
    if (!!character) {
      info.innerHTML = '';
      for (let prop in character) {
        let div = document.createElement('div');
        div.innerHTML = `${prop}: ${character[prop]}`;
        info.appendChild(div);
      }
    }
  }

  input.addEventListener('input', function() {
    model.updateDropdown(input.value);
  });

  dropdownMenu.addEventListener('click', function () {
    input.value = event.target.textContent;
    dropdownMenu.innerHTML = '';
    model.setCharacter(input.value);
    input.focus();
  });

  form.onsubmit = function () {
    dropdownMenu.innerHTML = input.value = '';
    fetch(`https://swapi.co/api/people/?search=${model.getCharacter()}`)
      .then(response => response.json())
      .then(json => {
        render([], json.results[0]);
      })
    return false;
  }

  model.subscribe(render);

  render();
}

function typeAheadModel() {
  let data;
  let character;
  let subscriber;

  function updateDropdown(value) {
    if (value !== "") {
      let regex = new RegExp(`(.)*${value}(.)*`, "gi")
      fetch('https://swapi.co/api/people/')
        .then(response => response.json())
        .then(json => {
          data = [];
          json.results.forEach(result => {
            if (result['name'].match(regex)) {
              let option = document.createElement('li');
              option.innerHTML = result['name'];
              data.push(option);
            }
          })
          if (data.length === 1) {
            setCharacter(data[0].innerHTML);
          }

          subscriber(data);
        });
    }
  }

  function setCharacter(c) {
    character = c;
  }

  function getCharacter() {
    return character;
  }

  return {
    subscribe: function (fn) {
      if (!subscriber) subscriber = fn;
    },
    updateDropdown,
    setCharacter,
    getCharacter,
  }
}

let container = document.querySelector('.typeahead-container');
let model = typeAheadModel();
let view = typeAheadView(container, model);
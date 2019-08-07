'use strict'

function removeDropdown(container) {
  container.removeChild(container.lastChild);
}

function typeAheadView(container, model) {
  function render(data = document.createElement('ul'), character = null) {
    let dropdownMenu = container.querySelector('.dropdown-container');
    removeDropdown(dropdownMenu);
    dropdownMenu.appendChild(data);

    let info = container.querySelector('.character');
    if (!!character) {
      info.innerHTML = '';
      for (let prop in character) {
        let div = document.createElement('div');
        div.className = 'character-prop'
        div.innerHTML = `${prop}: ${character[prop]}`;
        info.appendChild(div);
      }
    }
  }

  model.subscribe(render);

  render();
}

function typeAheadModel() {
  let data = document.createElement('ul');
  data.className = "dropdown";

  let character;
  let form = document.querySelector('form');
  let input = form.querySelector('input[type="textarea"]')
  let subscriber;

  function updateDropdown() {
    let cur = input.value;
    character = '';
    if (cur !== "") {
      let regex = new RegExp(`(.)*${cur}(.)*`, "gi")
      fetch('https://swapi.co/api/people/')
        .then(response => response.json())
        .then(json => {
          data.innerHTML = '';
          json.results.forEach(result => {
            if (result['name'].match(regex)) {
              let option = document.createElement('li');
              option.innerHTML = result['name'];
              data.appendChild(option);
            }
          })
        });
    }

    if (data.children.length === 1) {
      character = data.firstChild.innerHTML;
    }

    data.addEventListener('click', function () {
      input.value = event.target.textContent;
      data.innerHTML = '';
      character = input.value;
      console.log("click: " + character);
      input.focus();
    });

    subscriber(data);
  }

  input.addEventListener('input', () => {
    updateDropdown();
  });

  form.onsubmit = function () {
    data.innerHTML = input.value = '';
    fetch(`https://swapi.co/api/people/?search=${character}`)
      .then(response => response.json())
      .then(json => {
        // console.log(json)
        subscriber(data, json.results[0]);
      })
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
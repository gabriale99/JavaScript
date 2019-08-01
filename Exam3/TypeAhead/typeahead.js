'use strict'

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

    let arr = ['darth', 'jar jar bink', 'yoda', 'Anakin SkyWalker','Luke SkyWalker', 'princess leia']
    
    function updateDropdown() {
        data = document.createElement('ul');
        data.className = "dropdown";
        for (let item of arr) {
            let option = document.createElement('li');
            option.innerHTML = item;
            data.appendChild(option);
        }
        data.addEventListener('click', function() {
            // console.log(event.target);
            if (event.target.tagName === "LI") {
                input.value = event.target.innerHTML;
            }
        });
        subscriber(data);
    }
    input.addEventListener('keydown', updateDropdown)

    return {
        subscribe: function(fn) {
            if (!subscriber) subscriber = fn;
        },
        updateDropdown: updateDropdown,
    }
}

let container = document.querySelector('.typeahead-container');
let model = typeAheadModel();
let view = typeAheadView(container, model);
model.updateDropdown();
// console.log(model.updateDropdown);
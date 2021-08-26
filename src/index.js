const gun = Gun();

let pollName = document.getElementById('pollname'); // <input>
let buttonName = document.getElementById('poll-name-button'); // <button>

let poll = document.getElementById('poll');
let options = document.getElementById('new-options');
let namepoll = document.getElementById('name');
let createOptions = document.getElementById('new-options-button');

function submit() {
    if(pollName.value.length > 2) {
        pollName.hidden = true
        buttonName.hidden = true
        
        poll.hidden = false
        namepoll.hidden = false
        options.hidden = false
    } else {
        alert('The name of the poll is to short !')
    }
}

buttonName.onclick = submit
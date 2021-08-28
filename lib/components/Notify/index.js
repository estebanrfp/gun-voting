const msgAlert = document.getElementById('msgAlert')

const alertCustom = document.getElementById('alert');
const box = document.getElementById('box');

function Notify(msg) {
    
    alertCustom.hidden = false;
    box.hidden = false;

    msgAlert.innerText = msg
} 

export default Notify;
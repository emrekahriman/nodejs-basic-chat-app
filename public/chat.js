const socket = io();


const sender = document.getElementById('sender');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');


submitBtn.addEventListener('click', (e) =>{
    e.preventDefault();

    if (sender.value.length > 0 && message.value.length > 0) {
        socket.emit('chat', {
            sender: sender.value,
            message: message.value
        });
    }else{
        alert("Adınız veya mesaj boş olamaz!");
    }
});

message.addEventListener('keyup', () =>{
    if (message === document.activeElement && message.value.length > 0){
        socket.emit('typing', sender.value);
    }else{
        socket.emit('typing', false);
    }
});

socket.on('chat', data => {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.sender}: </strong>${data.message}</p>`;
    message.value = '';
});

socket.on('typing', sender => {
    if (sender) {
        feedback.innerHTML = `<p>${sender} yazıyor...</p>`;
    }else{
        feedback.innerHTML = '';
    }
});
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
let messageContentInput = document.getElementById('message-content');

const socket = io();

socket.on('message', ({ name, message }) => addMessage(name, message));

let userName;


const login = (e) => {
    e.preventDefault();

    if (userNameInput.value == '') {
        window.alert('Please write your login');
    } else {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
    socket.emit('user', userName);
};

const addMessage = (name, message) => {
    const listElem = document.createElement('li')//
    listElem.classList.add('message', 'message--received', `${name === userName && `message--self`}`, `${name === 'Chat Bot' && `message--bot`}`);
    console.log(listElem);
    listElem.innerHTML = `
    <h3 class='message__author'>${name === userName ? 'You' : name}</h3>
    <div class='message__content'>${message}</div>
  `;

    messagesList.appendChild(listElem);
};

const sendMessage = (e) => {
    e.preventDefault();

    let messageContent = messageContentInput.value;

    if (messageContent == '') {
        window.alert('Add your message')
    } else {
        addMessage(userName, messageContent);
        socket.emit('message', { name: userName, message: messageContent });
        messageContentInput.value = '';
    }
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
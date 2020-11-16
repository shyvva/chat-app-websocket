const loginForm = document.getElementById('#welcome-form');
const messagesSection = document.getElementById('#message-section');
const messageList = document.getElementById('#message-list');
const addMessageForm = document.getElementById('#add-messages-form');
const userNameInput = document.getElementById('#username');
const messageContentInput = document.getElementById('#message-content');

let userName;

const login = (e) => {
    e.preventDefault();

    if (userNameInput.value == '') {
        window.alert('Please write your login')
    } else {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
};

loginForm.addEventListener('submit', login)
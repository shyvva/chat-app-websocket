const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users = [];

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);

    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });

    socket.on('user', (name) => {
        console.log(`${name} joined the chat`);
        const userData = { name: name, id: socket.id };
        users.push(userData);
    });

    socket.on('disconnect', () => {
        console.log('Oh, socket ' + socket.id + ' has left');
        const getUser = users.find(name => name.id === socket.id);
        const userIndex = users.indexOf(getUser);
        users.splice(userIndex, 1);
        console.log(users);
    });

    console.log('I\'ve added a listener on message and disconnect events \n');
});
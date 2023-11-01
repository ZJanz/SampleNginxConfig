// server/server.js

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost', // Replace with your React app's domain
    methods: ['GET', 'POST']
    // Additional CORS configurations can be added as needed
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    console.log('Message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

http.listen(3001, () => {
  console.log('Socket.io server is running on port 3001');
});
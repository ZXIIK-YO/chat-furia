const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let onlineUsers = 0;

app.use(express.static('public'));

io.on('connection', (socket) => {
  onlineUsers++;
  io.emit('users online', onlineUsers);

  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    onlineUsers--;
    io.emit('users online', onlineUsers);
  });
});

http.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

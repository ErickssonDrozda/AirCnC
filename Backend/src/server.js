const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const app = express();

const server = http.Server(app);
const io = socketio(server);

require('dotenv').config()

const connectedUsers = {};

mongoose.connect(process.env.DATABASE,
{
  useNewUrlParser: true,
  useUnifiedTopology: true  
});

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;
  
  connectedUsers[user_id] = socket.id;
  
  //setTimeout(() => {
  //  socket.emit('Hello', 'World');
  //}, 4000)
  //socket.on('omni', data => {
  //  console.log('OII', data);
  //});
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  
  return next();
});

//req.query = Acessar query params(para filtros).
//req.params = Acessar route params(para editar, deletar).
//req.body = Acessar corpo da requisicao(para criação e edição)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(process.env.PORT);
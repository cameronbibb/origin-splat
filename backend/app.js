const path = require('path');

require('dotenv').config({
  override: true,
  path: path.join(__dirname, '../.env'),
});

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const binRoutes = require('./routes/bins');
const endpointRoutes = require('./routes/endpoints');

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  socket.on('joinBinRoom', (binPath) => {
    socket.join(binPath);
  });
});

app.set('socketio', io);

app.use('/api/bins', binRoutes);
app.use('/api/endpoints', endpointRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code);
  return res.json({ message: error.message, code: error.code });
});

module.exports = httpServer;

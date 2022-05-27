const http = require('http');
const app = require('./index');
const socketIO=require('socket.io');


const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3600');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

const io=socketIO(server,{cors : {origin :"*"}});


// make connection with user from server side

io.on('connection', (socket)=>{
  console.log('New user connected');

  socket.emit("test","data");
  socket.on('message',(data) => {
    console.log("eeeeee",data);
  })
});



const sendNotifications = function(eventName,data)  {
  // server-side
  io.on("connection", (socket) => {
  socket.emit(eventName,data);
});
}



server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);


const http = require('http');
const WebSocket = require('ws');
const User = require('./user');
const RoomManager = require('./roomManager');
const ParseUserName = require('./parseName');
const command = require('./commands');

const server = http.createServer();
const wss = new WebSocket.Server({ noServer: true, clientTracking: true });

let allUsers = new RoomManager();

wss.on('connection', function connection(ws, request) {
  let chatUser = new User(ws, 'noroom')
  let userName = '';
  let nameFlag = false;

  ws.send('please enter a username: (3-8 characters)'); 

  ws.on('message', (message)=>{
    const textMessage = message.toString('utf-8');

    if(textMessage[0] == '\\') { 
      console.log(allUsers.allRooms);
      let isCommand = command.validateCommand(textMessage);
      if(isCommand && textMessage[1] == 'r') {
        allUsers.remove(chatUser);
        chatUser.setRoom(textMessage);
        allUsers.insert(chatUser);
        ws.send('room updated');
      } else if(isCommand && textMessage[1] == 'l') {
        ws.send('rooms: \n'); 
        allUsers.list(chatUser);
      } else if(isCommand && textMessage[1] == 'q') {
        chatUser.setRoom('');
        allUsers.remove(chatUser);
        ws.send(userName + ' left room');
      }
      return;
    }

    if(nameFlag) {
      allUsers.broadcast(textMessage, chatUser.getRoom(), userName);
      console.log(allUsers.allRooms);
    } else {
      // set username with the first message
      let tempName = textMessage;
      userName = ParseUserName(tempName); 
      nameFlag = true;
    } 
  });
  
  ws.on('close', ()=> {
    allUsers.remove(chatUser);
  })

});

// handle upgrade to websocket
server.on('upgrade', async function upgrade(request, socket, head) {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});

server.listen(8080);
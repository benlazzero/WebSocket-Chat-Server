const http = require('http');
const WebSocket = require('ws');
const User = require('./user');
const ParseUserName = require('./parseName');
const BroadCaster = require('./roomBroadcaster');
const RemoveFromAllUsers = require('./helpers');
const command = require('./commands');

const server = http.createServer();
const wss = new WebSocket.Server({ noServer: true, clientTracking: true });

let allUsers = [];

wss.on('connection', function connection(ws, request) {
  let chatUser = new User(ws, wss.clients.size, 'null')
  let userName = '';
  let nameFlag = false;

  allUsers.push(chatUser);
  
  ws.send('please enter a username: (3-8 characters)'); 

  ws.on('message', (message)=>{
    const textMessage = message.toString('utf-8');

    if(textMessage[0] == '\\') { 
      let isCommand = command.validateCommand(textMessage);
      if(isCommand && textMessage[1] == 'r') {
        let updatedUsersArray = command.updateUserRoom(textMessage, allUsers, ws);
        allUsers = updatedUsersArray;
        ws.send('room updated');
      } else if(isCommand && textMessage[1] == 'l') {
        const allRooms = command.makeRoomList(allUsers); 
        ws.send(allRooms); 
      } else if(isCommand && textMessage[1] == 'q') {
        let updatedUsersArray = command.updateUserRoom('\\r null', allUsers, ws);
        allUsers = updatedUsersArray;
        ws.send('left room');
      }
      return;
    }

    if(nameFlag) {
      let currentRoom = BroadCaster.FindUsersRoom(allUsers, ws)  
      let othersInRoom = BroadCaster.FindOthersInRoom(allUsers, currentRoom) 
      let parsedMessage = userName + ': ' + textMessage;
      BroadCaster.BroadcastMsgInRoom(othersInRoom, parsedMessage)
    } else {
      // set username with the first message
      let tempName = textMessage;
      userName = ParseUserName(tempName); 
      nameFlag = true;
    } 
  });
  
  ws.on('close', ()=> {
    allUsers = RemoveFromAllUsers(allUsers, ws);
  })

});

// handle upgrade to websocket
server.on('upgrade', async function upgrade(request, socket, head) {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});

server.listen(8080);
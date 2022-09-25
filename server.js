const http = require('http');
const WebSocket = require('ws');
const User = require('./user');
const ParseUserName = require('./parseName');
const BroadCaster = require('./roomBroadcaster');
const RemoveFromAllUsers = require('./helpers');


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
    if(nameFlag) {
      let currentRoom = BroadCaster.FindUsersRoom(allUsers, ws)  
      let othersInRoom = BroadCaster.FindOthersInRoom(allUsers, currentRoom) 
      console.log(othersInRoom);
      let parsedMessage = userName + ': ' + message.toString('utf-8');
      BroadCaster.BroadcastMsgInRoom(othersInRoom, parsedMessage)
      console.log(allUsers.length);
    } else {
      // set username with the first message
      let tempName = message.toString('utf-8');
      userName = ParseUserName(tempName); 
      nameFlag = true;
    } 
  });
  
  ws.on('close', ()=> {
    allUsers = [RemoveFromAllUsers(allUsers, ws)];
    console.log(allUsers);
  })

});

// handle upgrade to websocket
server.on('upgrade', async function upgrade(request, socket, head) {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});

server.listen(8080);
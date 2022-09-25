const FindUsersRoom = (allusers, currentSocket) => {
  for(let i = 0; i < allusers.length; i++){
    if(allusers[i].socket == currentSocket){
      return allusers[i].room;
    } 
  }
};

const FindOthersInRoom = (allusers, room) => {
  let othersInRoom = []
  for(let i = 0; i < allusers.length; i++){
    if(allusers[i].room == room){
      othersInRoom.push(allusers[i]); 
    }
  }
  return othersInRoom;
};

const BroadcastMsgInRoom = (othersInRoom, parsedMessage) => {
  for(let i = 0; i < othersInRoom.length; i++) {
    othersInRoom[i].socket.send(parsedMessage) 
  } 
};

module.exports = {FindUsersRoom, FindOthersInRoom, BroadcastMsgInRoom};
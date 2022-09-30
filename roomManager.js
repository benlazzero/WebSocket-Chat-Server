class RoomManager {
  allRooms = [];
  
  insert(user) {
    let pushFlag = false;
    this.allRooms.map((roomRow, i)=> {
      if(roomRow.length > 0) {
        if(roomRow[0].getRoom() == user.getRoom()) {
          roomRow.push(user)
          pushFlag = true;
          return;
        } 
      }
    })
    
    if(pushFlag){return};
    this.allRooms.push([user]); 
  }
  
  broadcast(message, room, userName) {
    this.allRooms.map((roomRow, i)=> {
      if(roomRow.length > 0) {
        if(roomRow[0].getRoom() == room) {
          roomRow.map((room)=>{
            room.socket.send(userName + ': ' + message);
          })
          return;
        }
      }
    })
  }
  
  remove(user) {
    this.allRooms.map((roomRow, i)=>{
      roomRow.map((room, j)=>{
        let currentSocket = this.allRooms[i][j].socket
        if(user.socket == currentSocket) {
          this.allRooms[i].splice(j, 1);
          if(this.allRooms[i].length == 0) {
            this.allRooms.splice(i, 1);
          }
          return;
        }
      })
    })
  }
  
  list(user) {
    let currentRoom = '';
    this.allRooms.map((roomRow, i)=>{
      roomRow.map((room, j)=>{
        if(room.getRoom() == currentRoom) {
          return;
        }
        user.socket.send(room.getRoom() + '(' + roomRow.length + ')');
        currentRoom = room.getRoom();
      })
    })
  }
}

module.exports = RoomManager;
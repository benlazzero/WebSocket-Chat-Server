class User {
  constructor(socket, id, room) {
    this.socket = socket;
    this.id = id;
    this.room = room;
  } 
  
  setRoom(message) {
    const roomName = message.slice(4);
    this.room = roomName;
  }
  
  getRoom() {
    return this.room;
  }
}

module.exports = User;
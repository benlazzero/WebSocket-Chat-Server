class User {
  constructor(socket, id, room) {
    this.socket = socket;
    this.id = id;
    this.room = room;
  } 
}

module.exports = User;
const validateCommand = (message) => {
  if(message.length > 13) {
    return false
  }
  if(message[1] == 'l' && message.length == 2) {
    return true;
  }
  if(message[1] == 'r' && message[2] == ' ' && message.length > 3) {
    return true;
  }
  if(message[1] == 'q' && message.length == 2) {
    return true;
  }
  return false;
}
  
const updateUserRoom = (message, allUsers, ws) => {
  let newUsersArray = allUsers;
  for(let i = 0; i < newUsersArray.length; i++) {
    if(newUsersArray[i].socket == ws) {
      newUsersArray[i].setRoom(message);
    } 
  } 
  return newUsersArray;
}

const makeRoomList = (allUsers) => {
  let allRooms = 'Rooms:';
  for(let i = 0; i < allUsers.length; i++) {
    if(allUsers[i].getRoom() !== 'null') {
      allRooms = allRooms + '\n'+ allUsers[i].getRoom(); 
    }
  }
  
  if(allRooms == 'Rooms:') {
    return 'No Rooms Found...'; 
  }
  return allRooms;
}

module.exports = { validateCommand, updateUserRoom, makeRoomList };
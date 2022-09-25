const RemoveFromAllUsers = (allUsers, socket) => {
  let newUsers = allUsers;
  for(let i = 0; i < allUsers.length; i++) {
    if(newUsers[i].socket == socket) {
      newUsers.splice(i, 1);
      return newUsers;
    }
  } 
}

module.exports = RemoveFromAllUsers; 
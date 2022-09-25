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
  return false;
}
  
module.exports = validateCommand;
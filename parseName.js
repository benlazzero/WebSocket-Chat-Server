
const RemoveWhiteSpace = (string) => {
  let userName = string;
  userName = userName.replace(/\s+/g, '');
  return userName;
}

const ReduceNameLength = (string) => {
  let userName = string;
  userName = userName.substring(0, 8);
  return userName;
}

const IncreaseNameLength = (string) => {
  let userName = string;
  userName = userName + '1029';
  return userName;
}

const ParseUserName = (string) => {
  let userName = RemoveWhiteSpace(string);

  if(userName.length > 8){
    userName = ReduceNameLength(userName);    
    return userName;
  }
  
  if(userName.length < 3){
    userName = IncreaseNameLength(userName)
    return userName;
  }
  
  return userName;
} 

module.exports = ParseUserName;
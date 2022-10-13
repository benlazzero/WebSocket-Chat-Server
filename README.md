# Nodejs WebSocket chatrooms server using 'ws'

## 'Not so simple' handshake and everyone get's upgraded!

The server is using a 2d matrix to handle rooms and the users in each. This can be seen as a class variable in roomManager.js.
I had seen other implementations for rooms such as adding the room to the user object, but this created headaches for handling 
simple methods like broadcast or leave-room. All client-server interaction is handled by parsing client messages over the connection. 

Server features:
1. username created upon connection (bounds enforced: no whitespace, > 3 chars, < 8 chars)
2. create/join rooms
3. list current rooms and the number of users in rooms
4. chat broadcasted to users in the same room e.g 'tom35: hello'

### Commands 

To join a room or create if does not exist.
```bash 
\r (room name)
```

To leave the current room.
```bash
/q
```

To list all rooms and the number of users in each room.
```bash
\l
```

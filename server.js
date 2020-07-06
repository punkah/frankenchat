const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 5000;

const messages = [];

io.on("connection", (socket) => {
  io.emit("reconnect", messages);
  socket.on("chat-message", ({ message, username }) => {
    const newMessage = {
      username,
      message,
      timestamp: Date.now(),
    };
    io.emit("chat-message", newMessage);
    messages.push(newMessage);
  });
});

http.listen(port, () => console.log(`Listening on port ${port}`));

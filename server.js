const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 5000;

const RETAIN_MESSAGE_COUNT = 100;

const messages = [];

io.on("connection", (socket) => {
  socket.emit("reconnect", messages);
  socket.on("chat-message", ({ message, username }) => {
    const newMessage = {
      username,
      message,
      timestamp: Date.now(),
    };
    io.emit("chat-message", newMessage);
    messages.push(newMessage);
    if (messages.length > RETAIN_MESSAGE_COUNT) {
      messages.shift();
    }
  });
});

http.listen(port, () => console.log(`Listening on port ${port}`));

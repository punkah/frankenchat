const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("chat-message", (msg) => {
    console.log(`message received from ${socket.id}`, msg);
    io.emit("chat-message", { user: socket.id, msg });
  });
});

http.listen(port, () => console.log(`Listening on port ${port}`));

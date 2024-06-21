const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("typing", () => {
    socket.broadcast.emit("show_typing_status");
  });
  socket.on("stop_typing", () => {
    socket.broadcast.emit("clear_typing_status");
  });
  socket.on('disconnect',()=>{
    console.log("left the chat with socket id"+socket.id);
  })
});

server.listen(3000, () => {
  console.log("listing on port http://localhost:3000");
});

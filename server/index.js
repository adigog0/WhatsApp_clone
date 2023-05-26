const express = require("express");
const app = express();
const http = require("http"); /// http server
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log("Sending message:", data.message);
    socket.broadcast.emit("receive_message", data); 
  });
});

app.get("/health", (req, res) => {
  res.json({ message: "Server running" });
});

server.listen(3001, () => {
  console.log("Server is running");
});

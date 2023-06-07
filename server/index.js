const express = require("express");
const app = express();
const http = require("http"); /// http server
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

app.use(cors());
app.use(express.json()); //middleware for parsing

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5173",
        methods: ["GET", "POST"],
    },
});


// Create a users map to keep track of users
const users = new Map();

io.on("connection", (socket) => {
    console.log(`me: ${socket.id}`);

    users.set(socket.id, socket.id);

    socket.on('user',{
        
    })

    socket.emit('connection-success',{
        status:'connection-success',
        socketId:socket.id
    })

    socket.on('sdp',data =>{
        console.log(sdp);
        socket.broadcast.emit('sdp',data); //sending sdp to peer 
    })

    socket.on('candidate',data =>{
        socket.broadcast.emit('candidate',data);
    })

    // // emit that a new user has joined as soon as someone joins
    // socket.emit('user:joined', socket.id);

    // //requesting a call 
    // socket.on('outgoing:call', data => {
    //     const { fromOffer, to } = data;
    //     socket.to(to).emit('incomming:call', {signal:data.signalData, from: socket.id, offer: fromOffer });
    // });

    // //to accept the acknowledgement
    // socket.on('call:accepted', data => {
    //     const { answer, to } = data;
    //     socket.to(to).emit('incomming:call', { from: socket.id, offer: answer })
    // });



    //for chatting 
    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data);
    });

    //disconnect the connected users
    socket.on('disconnect', () => {
        console.log(`user disconnected: ${socket.id}`);
        socket.broadcast.emit("callEnded");
    });

});

app.post("/googlelogin",async (req, res) => {
    const { token } = req.body;
    try{
        const ticket = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`);
        const {name, email, picture} = ticket.data;
        const resObj = {name, email, picture}
        console.log("response",resObj);
        res.status(201).json(resObj)
    }
    catch(e){
        console.log("error in google login be ",e)
    }

    
});

app.get("/health", (req, res, next) => {
    console.log("health route hit");
    res.status(200).json({ message: "server is running" });
});

server.listen(3001, () => {
    console.log("Server is running");
});

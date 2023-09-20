import * as dotenv from 'dotenv'
dotenv.config() 
import { ISenderData } from "./modals/interfaces";
import express from "express";
import * as http from "http"; 
import { Server } from "socket.io";
import cors from "cors";
import pool from "./db";
import { Auth } from "./middleware/Auth";
import { decryptUserInfo, getAllUsers, getUserChats, getUserMessages, sendMessage } from "./services/user.service";
import { getContactList, getUserAllChats, getUserMessageById, googleSignIn, googleSignUp, updateStatusByMessageId } from './controller/controller';


const app = express();
app.use(cors());
app.use(express.json()); //middleware for parsing

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5175",
        methods: ["GET", "POST"],
    },
});

// users map to keep track of users
const users = new Map<number|string, string>();

io.on("connection", (socket) => {
    socket.on("connected-user", (userId: number | string) => {
        console.log("user connected",userId,socket.id)
        users.set(userId, socket.id);
    });

    socket.on("join_room", (data) => {
        socket.join(data);
    });

    //for chatting
    socket.on("send_message", async(data: ISenderData) => {
        const response = await sendMessage(data);
        console.log("response from bk after insert",response)
        const receipent = users.get(response.receipentid);
        console.log("receipent",receipent);

        socket.broadcast.to(receipent ?? "").emit("receive_message", {
            date: response.date,
            status_type: "Sent",
            message: response.message,
            senderid: response.senderid,
            receipentid: response.receipentid,
            messageid:response.messageid
        });
    });

    //disconnect the connected users
    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
    }); 
});

app.post("/google-sign-up",googleSignUp);

app.post("/google/sign-in", googleSignIn);

app.get("/chats", Auth,getUserAllChats);

app.get("/user-messages/:id", Auth,getUserMessageById );

app.get("/user-list",Auth,getContactList)

app.patch("/update-message-status/:messageId",Auth,updateStatusByMessageId);

app.get("/health", (req, res) => {
    res.status(200).json({ message: "server is running" });
})

app.get("/env", (req, res) => {
    const env = process.env.DATABASE_URL
    res.status(200).json({ env });
})

server.listen(3001, () => {
    console.log("Server is running");
});


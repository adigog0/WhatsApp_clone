import * as dotenv from 'dotenv'
dotenv.config() 
import { ISenderData } from "./modals/interfaces";
import express from "express";
import * as http from "http"; 
import { Server } from "socket.io";
import cors from "cors";
import pool from "./db";
import { Auth } from "./middleware/Auth";
import { decryptUserInfo, getUserChats, getUserMessages, sendMessage } from "./services/user.service";


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
const users = new Map<number, string>();

io.on("connection", (socket) => {
    socket.on("connected-user", (userId: number) => {
        users.set(userId, socket.id);
    });

    socket.on("join_room", (data) => {
        socket.join(data);
    });

    //for chatting
    socket.on("send_message", (data: ISenderData) => {
        sendMessage(data);
        console.log("sender message", data);
        const receipent = users.get(data.receipentid);

        socket.broadcast.to(receipent ?? "").emit("receive_message", {
            date: data.date,
            status_type: "Send",
            message: data.message,
            senderid: data.senderid,
            receipentid: data.receipentid,
        });
    });

    //disconnect the connected users
    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
    });
});

app.post("/google-sign-up", async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await decryptUserInfo(token);
        if (ticket) {
            const { name, email, picture } = ticket;
            const setuser = await pool.query(`INSERT INTO public."User"
            (username, user_email, user_picture)
            VALUES('${name}', '${email}', '${picture}') RETURNING *`);

            res.status(201).json(setuser.rows);
        }
    } catch (err: any) {
        console.log("error in google Signup ", err);
    }
});

app.post("/google/sign-in", async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await decryptUserInfo(token);
        if (ticket) {
            const { email } = ticket;
            const emailCheckQuery = await pool.query(
                ` select * from public.
              "User" where user_email = $1 `,
                [email]
            );

            if (emailCheckQuery.rowCount === 0) {
                res.status(404).json({ message: "Please Sign Up!" });
            } else {
                res.status(201).json(emailCheckQuery.rows);
            }
        }
    } catch (err) {
        console.log("error in google signin", err);
    }
});

app.get("/chats", Auth, async (req, res) => {
    console.log("GET ALL CHATS FOR",req.user);
    const userChats = await getUserChats(req.user.userId);
    res.status(200).json(userChats.rows);
});

app.get("/user-messages/:id", Auth, async(req, res) => {
    const userMessage = await getUserMessages(req.user.userId ,req.params.id );
    res.status(200).json(userMessage.rows);
});

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


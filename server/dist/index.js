"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const Auth_1 = require("./middleware/Auth");
const user_service_1 = require("./services/user.service");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); //middleware for parsing
const server = http.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://127.0.0.1:5175",
        methods: ["GET", "POST"],
    },
});
// users map to keep track of users
const users = new Map();
io.on("connection", (socket) => {
    socket.on("connected-user", (userId) => {
        users.set(userId, socket.id);
    });
    socket.on("join_room", (data) => {
        socket.join(data);
    });
    //for chatting
    socket.on("send_message", (data) => {
        (0, user_service_1.sendMessage)(data);
        console.log("sender message", data);
        const receipent = users.get(data.receipentid);
        socket.broadcast.to(receipent !== null && receipent !== void 0 ? receipent : "").emit("receive_message", {
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
app.post("/google-sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const ticket = yield (0, user_service_1.decryptUserInfo)(token);
        if (ticket) {
            const { name, email, picture } = ticket;
            const setuser = yield db_1.default.query(`INSERT INTO public."User"
            (username, user_email, user_picture)
            VALUES('${name}', '${email}', '${picture}') RETURNING *`);
            res.status(201).json(setuser.rows);
        }
    }
    catch (err) {
        console.log("error in google Signup ", err);
    }
}));
app.post("/google/sign-in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const ticket = yield (0, user_service_1.decryptUserInfo)(token);
        if (ticket) {
            const { email } = ticket;
            const emailCheckQuery = yield db_1.default.query(` select * from public.
              "User" where user_email = $1 `, [email]);
            if (emailCheckQuery.rowCount === 0) {
                res.status(404).json({ message: "Please Sign Up!" });
            }
            else {
                res.status(201).json(emailCheckQuery.rows);
            }
        }
    }
    catch (err) {
        console.log("error in google signin", err);
    }
}));
app.get("/chats", Auth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("GET ALL CHATS FOR", req.user);
    const userChats = yield (0, user_service_1.getUserChats)(req.user.userId);
    res.status(200).json(userChats.rows);
}));
app.get("/user-messages/:id", Auth_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userMessage = yield (0, user_service_1.getUserMessages)(req.user.userId, req.params.id);
    res.status(200).json(userMessage.rows);
}));
app.get("/health", (req, res) => {
    res.status(200).json({ message: "server is running" });
});
app.get("/env", (req, res) => {
    const env = process.env.DATABASE_URL;
    res.status(200).json({ env });
});
server.listen(3001, () => {
    console.log("Server is running");
});

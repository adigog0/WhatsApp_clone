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
const Auth_1 = require("./middleware/Auth");
const user_service_1 = require("./services/user.service");
const controller_1 = require("./controller/controller");
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
        console.log("user connected", userId, socket.id);
        users.set(userId, socket.id);
    });
    socket.on("join_room", (data) => {
        socket.join(data);
    });
    //for chatting
    socket.on("send_message", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, user_service_1.sendMessage)(data);
        console.log("response from bk after insert", response);
        const receipent = users.get(response.receipentid);
        console.log("receipent", receipent);
        socket.broadcast.to(receipent !== null && receipent !== void 0 ? receipent : "").emit("receive_message", {
            date: response.date,
            status_type: "Sent",
            message: response.message,
            senderid: response.senderid,
            receipentid: response.receipentid,
            messageid: response.messageid
        });
    }));
    //disconnect the connected users
    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
    });
});
app.post("/google-sign-up", controller_1.googleSignUp);
app.post("/google/sign-in", controller_1.googleSignIn);
app.get("/chats", Auth_1.Auth, controller_1.getUserAllChats);
app.get("/user-messages/:id", Auth_1.Auth, controller_1.getUserMessageById);
app.get("/user-list", Auth_1.Auth, controller_1.getContactList);
app.patch("/update-message-status/:messageId", Auth_1.Auth, controller_1.updateStatusByMessageId);
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

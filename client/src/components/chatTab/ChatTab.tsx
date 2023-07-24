import { useEffect, useState } from "react";
import ChatRoom from "../chatRoom/ChatRoom";
import NavBar from "../navBar/NavBar";
import UserInput from "../userInput/UserInput";
import { IUsers, IChats } from "../../Interface/Interface";
import ChatIcon from "../../assets/icons/chatsicon.svg";
import io from "socket.io-client";
import { useSnackbar } from "notistack";

const socket = io("http://localhost:3001");

interface Iprops {
    chatUser: IUsers;
}

const ChatTab = ({ chatUser }: Iprops) => {
    const [openOptions, setOpenOptions] = useState<boolean>(false);
    const [chats, setChats] = useState<IChats[]>([]);
    const { id } = JSON.parse(localStorage.getItem("loginUserInfo") ?? "null");
    socket.emit("connected-user", id);

    const sendMessageHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let inputText = e.currentTarget.value;

        const userMessage: IChats = {
            date: new Date(),
            status_type: "Pending",
            message: inputText,
            receipentid: chatUser.display_id,
            senderid: id,
        };

        if (e.key === "Enter") {
            console.log("Entered message:", inputText);
            socket.emit("send_message", userMessage);
            setChats((prev) => [...prev, userMessage]);
            e.currentTarget.value = "";
        }
    };

    useEffect(() => {
        // Event listener for receiving messages
        socket.on("receive_message", (data: IChats) => {
            const receiveMessage: IChats = {
                date: new Date(),
                status_type: "Delivered",
                message: data.message,
                receipentid: data.receipentid,
                senderid: data.senderid,
            };

            setChats((prev) => [...prev, receiveMessage]);
        });

        // Cleanup the event listener on component unmount
        return () => {
            socket.off("receive_message");
        };
    }, []);

    return (
        <div className="flex-1 flex flex-col bg-gray-800 rounded-xl">
            {chatUser.display_id === "" ? (
                <div className=" flex justify-center m-auto text-slate-200 gap-4">
                    <img src={ChatIcon} alt="chaticon" />
                    <span className="">welcome</span>
                </div>
            ) : (
                <>
                    <NavBar
                        chatUsers={chatUser}
                        openOptions={openOptions}
                        setOpenOptions={setOpenOptions}
                    />
                    <ChatRoom chats={chats}/>
                    <UserInput sendMessageHandler={sendMessageHandler} />
                </>
            )}
        </div>
    );
};

export default ChatTab;

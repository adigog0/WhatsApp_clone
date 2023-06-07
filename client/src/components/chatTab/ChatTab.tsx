import { useEffect, useState } from "react";
import ChatRoom from "../chatRoom/ChatRoom";
import NavBar from "../navBar/NavBar";
import UserInput from "../userInput/UserInput";
import { IMessageObj, IReceiverObj } from "../../Interface/Interface";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

interface Iprops{
  receiver:IReceiverObj
}

const ChatTab = ({receiver}:Iprops) => {
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessageObj[]>([]);

  useEffect(() => {
    // Event listener for receiving messages
    socket.on("receive_message", (data) => {
      console.log("Received data:", data.message);
      const receiveMessage: IMessageObj = {
        date: new Date(),
        delivered: false,
        message: data.message,
        sender: "other",
        receiver: "me",
      };
      setMessages((prev) => [...prev, receiveMessage]);
    });

    // Cleanup the event listener on component unmount
    return () => {
      socket.off("receive_message");
    };
  }, []); // Run this effect only once on component mount

  const sendMessageHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let inputText = e.currentTarget.value;
    const userMessage: IMessageObj = {
      date: new Date(),
      delivered: false,
      message: inputText,
      sender: "me",
      receiver: "others",
    };

    if (e.key === "Enter") {
      console.log("Entered message:", inputText);
      socket.emit("send_message", { message: inputText });
      setMessages((prev) => [...prev, userMessage]);
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-800 rounded-xl">
      <NavBar receiver={receiver} openOptions={openOptions} setOpenOptions={setOpenOptions} />
      <ChatRoom receiver={receiver} messages={messages} />
      <UserInput sendMessageHandler={sendMessageHandler} />
    </div>
  );
};

export default ChatTab;

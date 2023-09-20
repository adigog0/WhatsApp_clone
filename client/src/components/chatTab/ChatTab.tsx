import { useEffect, useState } from "react";
import ChatRoom from "../chatRoom/ChatRoom";
import NavBar from "../navBar/NavBar";
import UserInput from "../userInput/UserInput";
import { IChats } from "../../Interface/Interface";
import ChatIcon from "../../assets/icons/chatsicon.svg";
import io from "socket.io-client";
import { useRecoilValue } from "recoil";
import { selectedChatUser } from "../../recoil/selectedChatUser";
import { useQuery, useQueryClient,useMutation } from "react-query";
import { useAuth } from "../../context/AuthContext";
import { getUserMessages, updateMessageStatus } from "../../apis/userdata";
import { enqueueSnackbar } from "notistack";

const socket = io("http://localhost:3001"); // socket server ,convert t to env with typestrict

const ChatTab = () => {
  //hooks
  const { requestWrapper } = useAuth();

  //states
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [chats, setChats] = useState<IChats[]>([]); // chats of the selected user
  const selectedUser = useRecoilValue(selectedChatUser);
  const queryClient = useQueryClient();

  console.log("selected user value from chat tab",selectedUser);

  const {isLoading} = useQuery({       // get selected user messages
    queryKey: ["user_chat", selectedUser],
    queryFn: async () => {
      const [result, err] = await requestWrapper(() =>
        getUserMessages(selectedUser.user_id ?? "")
      );
      {
        err !== null &&
          enqueueSnackbar(`Error in fetching chats of selected user`, {
            variant: "error",
          });
      }
      return result;
    },
    onSuccess: (response) => {
      let data = response?.data?.data;
      console.log("data from chattab",data)
      setChats(data);
    },
    
    refetchInterval: 1000,
    
  });

  const { mutate } = useMutation({
    mutationFn:updateMessageStatus,
    onError(error, variables, context) {
      enqueueSnackbar(`Error in mutating the status`, {
        variant: "error",
      });
    },
  });


  //data from web storage
  const { id } = JSON.parse(localStorage.getItem("loginUserInfo") ?? "null");

  //socket
  socket.emit("connected-user", id);

  const sendMessageHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let inputText = e.currentTarget.value;

    const userMessage: IChats = {
      date: new Date(),
      status_type: "Pending",
      message: inputText,
      receipentid: selectedUser.user_id,
      senderid: id,
    };

    if (e.key === "Enter") {
      socket.emit("send_message", userMessage);
      setChats((prev) => [...prev, userMessage]);
      e.currentTarget.value = "";
    }
  };

  useEffect(() => {
    // Event listener for receiving messages
    socket.on("receive_message", (data: IChats) => {
      console.log("receive message from bk",data);
      const receiveMessage: IChats = {
        date: new Date(),
        status_type: "Delivered",
        message: data.message,
        receipentid: data.receipentid,
        senderid: data.senderid,
        messageid:data.messageid
      };
      mutate(receiveMessage);
      setChats((prev) => [...prev, receiveMessage]);
      
    });

    // Cleanup the event listener on component unmount
    return () => {
      socket.off("receive_message");
    };
  }, []);



  console.log("chats",chats);
  return (
    <div className="flex-1 flex flex-col bg-gray-800 rounded-xl">
      {selectedUser.user_id === "" ? (
        <div className=" flex justify-center m-auto text-slate-200 gap-4">
          <img src={ChatIcon} alt="chaticon" />
          <span className="">welcome</span>
        </div>
      ) : (
        <>
          <NavBar openOptions={openOptions} setOpenOptions={setOpenOptions} />
          <ChatRoom chats={chats} />
          <UserInput sendMessageHandler={sendMessageHandler} />
        </>
      )}
    </div>
  );
};

export default ChatTab;

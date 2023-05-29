import { IReceiverObj } from "../../Interface/Interface";
import Mask from "../../assets/images/Mask.svg";

interface Iprops{
    userName:string;
    sendTime:string;
    date:Date;
    lastChat:string;
    setReceiver:React.Dispatch<React.SetStateAction<IReceiverObj>>;
}

const ChatUsersCard = ({userName,date,lastChat,sendTime,setReceiver}:Iprops) => {

    const selectChatUserHandler =()=>{
        console.log("clicked")
        let receiverObj ={
            receiverName:userName,
            receiverDp:undefined
        }
        setReceiver(receiverObj);
    }
    return (
        <div onClick={selectChatUserHandler} className="max-h-16 flex min-h-[10%] bg-slate-300 rounded-md p-1 m-1 cursor-pointer overflow-auto">
            <img src={Mask} alt="" />
            <div className=" p-1 flex-auto w-full overflow-auto ">
                <div className="flex justify-between w-full">
                    <span className="font-medium">{userName}</span>
                    <span className="text-sm">{sendTime}</span>
                </div>
                <div className="text-sm text-gray-700 w-full  h-fit ">
                    <p className=" whitespace-nowrap w-72 overflow-hidden text-ellipsis">
                        {lastChat}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatUsersCard;

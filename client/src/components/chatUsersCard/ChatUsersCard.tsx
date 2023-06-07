import { IChatData } from "../../Interface/Interface";
import Mask from "../../assets/images/Mask.svg";

interface Iprops {
    selectChatUserHandler: (item: IChatData) => void;
    chats: IChatData;
    active: string;
}

const ChatUsersCard = ({ chats, selectChatUserHandler, active }: Iprops) => {
    return (
        <div
            onClick={() => selectChatUserHandler(chats)}
            className={`max-h-16 shadow-sm shadow-slate-400 flex min-h-[10%] ${
                chats.id === active ? "bg-slate-300" : "bg-slate-50"
            }  rounded-md p-1 m-1 cursor-pointer overflow-auto hover:bg-slate-300`}
        >
            <img src={Mask} alt="" />
            <div className=" p-1 flex-auto w-full overflow-auto ">
                <div className="flex justify-between w-full">
                    <span className="font-medium">{chats.userName}</span>
                    <span className="text-sm">{chats.sendTime}</span>
                </div>
                <div className="text-sm text-gray-700 w-full  h-fit ">
                    <p className=" whitespace-nowrap w-72 overflow-hidden text-ellipsis">
                        {chats.chat}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatUsersCard;

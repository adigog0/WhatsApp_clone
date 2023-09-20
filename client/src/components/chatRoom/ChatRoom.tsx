import { IChats } from "../../Interface/Interface";
import { extractTime } from "../../utils/time";

interface Iprops {
    chats:IChats[];
    isLoading?:boolean;
}

const ChatRoom = ({ chats,isLoading }: Iprops) => {
    const { id } = JSON.parse(
        localStorage.getItem("loginUserInfo") ?? "null"
    );

    return (
        <div className=" flex-auto flex flex-col justify-end overflow-y-auto custom-scrollbar">
            {isLoading ? <div className="text-white font-bold m-auto">loading...</div> :
            <div className=" h-max max-h-full">
                
                {chats.map((item: IChats, i: number) => (
                    <div
                        key={i}
                        className={`flex m-3 ${item.senderid === id ?"justify-end": "justify-start"}`}
                    >
                        
                        <span
                            className={`flex-col max-w-sm rounded-xl w-max break-all  p-2 ${
                                item.senderid === id
                                    ? "rounded-br-none bg-lime-400"
                                    : "rounded-bl-none bg-slate-100"
                            }`}
                        >
                            
                            {item.message}

                            <p
                                className={`text-xs justify-end text-end ${
                                    item.senderid !== id
                                        ? "text-slate-950"
                                        : "text-gray-50 "
                                } `}
                            >
                                {extractTime(item.date)}
                            </p>
                        </span>
                    </div>
                ))}
            </div>}
        </div>
    );
};
export default ChatRoom;

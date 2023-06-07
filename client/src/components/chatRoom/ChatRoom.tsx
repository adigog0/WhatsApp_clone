import { IMessageObj, IReceiverObj } from "../../Interface/Interface";

interface Iprops {
    messages: IMessageObj[];
    receiver:IReceiverObj;
}

const ChatRoom = ({ messages,receiver }: Iprops) => {
    console.log(messages);
    return (
        <div className=" flex-auto flex flex-col justify-end overflow-y-auto custom-scrollbar">
            <div className=" h-max max-h-full">
                {messages.map((item: IMessageObj, i: number) => (
                    <div
                        key={i}
                        className={`flex m-3 ${
                            item.sender === "other"
                                ? "justify-start"
                                : "justify-end"
                        }`}
                    >
                        <span
                            className={`flex-col max-w-sm rounded-xl w-max break-all  p-2 ${
                                item.sender === "other"
                                    ? "rounded-bl-none bg-slate-100"
                                    : "rounded-br-none bg-lime-400"
                            } `}
                        >
                            {item.message}

                            <p
                                className={`text-xs justify-end text-end ${
                                    item.sender === "other"
                                        ? "text-slate-950"
                                        : "text-gray-50 "
                                } `}
                            >
                                12:34
                            </p>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ChatRoom;

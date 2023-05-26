import { IMessageObj } from "../../Interface/Interface";

interface Iprops {
    messages: IMessageObj[];
}

const ChatRoom = ({ messages }: Iprops) => {
    console.log(messages);
    return (
        <div className=" flex-auto flex flex-col justify-end overflow-y-auto">
            <div className=" h-max max-h-full">
                {messages.map((item: IMessageObj, i: number) => (
                    <div
                        key={i}
                        className={`flex ${
                            item.sender === "other"
                                ? "justify-start"
                                : "justify-end"
                        }`}
                    >
                        <p
                            className={`bg-slate-50 flex-row max-w-sm rounded-xl w-max break-all m-3 p-2 ${
                                item.sender === "other"
                                    ? "rounded-bl-none"
                                    : "rounded-br-none bg-lime-300"
                            } `}
                        >
                            {item.message}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ChatRoom;

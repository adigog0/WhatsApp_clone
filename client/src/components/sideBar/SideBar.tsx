import { useQuery } from "react-query";
import { IChatData, IReceiverObj } from "../../Interface/Interface";
import { chatData } from "../../constants/constants";
import ChatUsersCard from "../chatUsersCard/ChatUsersCard";
import SearchBar from "../searchBar/SearchBar";
import { useState } from "react";
import UserCard from "../userCard/UserCard";

interface Iprops {
    setReceiver: React.Dispatch<React.SetStateAction<IReceiverObj>>;
}
const SideBar = ({ setReceiver }: Iprops) => {
    const [active,setActive] = useState<string>("");
    
    const selectChatUserHandler = (item: IChatData) => {
        setActive(item.id)
        let receiverObj = {
            receiverName: item.userName,
            receiverDp: undefined,
            receiverChat: [item.chat],
        };
        setReceiver(receiverObj);
    };

    return (
        <div className="w-4/12 h-full bg-white rounded-xl p-1">
            <UserCard/>
            <SearchBar />
            <div className="flex-1 h-[calc(100%-56px)] overflow-y-auto custom-scrollbar">
                {chatData.map((chats: IChatData, i: number) => (
                    <ChatUsersCard
                    active={active}
                        selectChatUserHandler={selectChatUserHandler}
                        chats={chats}
                        key={i}
                    />
                ))}
            </div>
        </div>
    );
};

export default SideBar;

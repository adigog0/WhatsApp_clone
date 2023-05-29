import { IReceiverObj } from "../../Interface/Interface";
import ChatUsersCard from "../chatUsersCard/ChatUsersCard";
import SearchBar from "../searchBar/SearchBar";

interface Iprops{
    setReceiver:React.Dispatch<React.SetStateAction<IReceiverObj>>
}
const SideBar = ({setReceiver}:Iprops) => {
    return (
        <div className="w-4/12 h-full bg-white rounded-xl p-1">
            <SearchBar />
            <div className="flex-1 h-[calc(100%-56px)] overflow-y-auto custom-scrollbar">
                {Array(16)
                    .fill(0)
                    .map((item: any, i: number) => (
                        <ChatUsersCard
                         setReceiver={setReceiver}
                            date={new Date()}
                            lastChat="last chat will be shown here whether seen or not"
                            sendTime="12:13"
                            userName="Cillian Murphy"
                            key={i}
                        />
                    ))}
            </div>
        </div>
    );
};

export default SideBar;

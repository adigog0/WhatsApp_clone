import { useState } from "react";
import ChatRoom from "../chatRoom/ChatRoom";
import NavBar from "../navBar/NavBar";
import UserInput from "../userInput/UserInput";
import OptionMenu from "../optionMenu/OptionMenu";

const TabContainer = () => {
    const [openOptions,setOpenOptions] = useState<boolean>(false);
    return (
        <div className="flex-1 flex flex-col bg-gray-800 rounded-xl ">
            <NavBar openOptions={openOptions} setOpenOptions={setOpenOptions} />
            <ChatRoom />
            <UserInput />
            

        </div>
    );
};

export default TabContainer;

import SideBar from "../../components/sideBar/SideBar";
import ChatTab from "../../components/chatTab/ChatTab";
import { useState } from "react";
import { IReceiverObj } from "../../Interface/Interface";

const LandingPage = () => {

    const [receiver,setReceiver] =useState<IReceiverObj>({
        receiverName:"",
        receiverDp:undefined,
    });
    return (
        <div className="flex w-full h-full bg-slate-300 gap-3  rounded-lg  p-2">
            <SideBar setReceiver={setReceiver} />
            <ChatTab receiver={receiver}/>
        </div>
    );
};

export default LandingPage;

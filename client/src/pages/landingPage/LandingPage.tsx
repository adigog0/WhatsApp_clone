import SideBar from "../../components/sideBar/SideBar";
import ChatTab from "../../components/chatTab/ChatTab";
import { useState } from "react";
import {  IUsers } from "../../Interface/Interface";
import { getAllChats } from "../../apis/userdata";
import { useQuery } from "react-query";
import { useSnackbar } from "notistack";

const LandingPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [chatUser, setchatUser] = useState<IUsers>({
        display_id: "",
        display_email: "",
        display_name: "",
        display_picture: undefined,
        message: "",
        date:""
    });
    const [allUsers, setAllUsers] = useState<IUsers[]>([]);

    const { isLoading } = useQuery({
        queryKey: ["allchats"],
        queryFn: getAllChats,
        onSuccess: (response) => {
            setAllUsers(response.data);
        },
        onError: (error: any) => {
            enqueueSnackbar(
                `${error.response.status}! ${error.response.data.message}`,
                {
                    variant: "error",
                }
            );
        },
    });

    return (
        <div className="flex w-full h-full bg-slate-300 gap-3  rounded-lg  p-2">
            {isLoading ? (
                <div className="m-auto">loading....</div>
            ) : (
                <>
                    <SideBar chatUser={chatUser} setchatUser={setchatUser} allUsers={allUsers} />
                    <ChatTab chatUser={chatUser} />
                </>
            )}
        </div>
    );
};

export default LandingPage;

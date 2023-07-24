import { IUsers } from "../../Interface/Interface";
import ChatUsersCard from "../chatUsersCard/ChatUsersCard";
import SearchBar from "../searchBar/SearchBar";
import { useState } from "react";
import UserCard from "../userCard/UserCard";
import { getUserMessages } from "../../apis/userdata";
import { useSnackbar } from "notistack";


interface Iprops {
    chatUser: IUsers;
    setchatUser: React.Dispatch<React.SetStateAction<IUsers>>;
    allUsers: IUsers[];
}
const SideBar = ({ setchatUser, allUsers }: Iprops) => {
    const [active, setActive] = useState<string>("");
    const { enqueueSnackbar } = useSnackbar();

    const selectChatUserHandler = async (item: IUsers) => {
        try {
            console.log("selected user", item);
            const chatData = await getUserMessages(item.display_id);
            console.log("chat data ", chatData);
            setActive(item.display_id);
            let chatUser = {
                display_id: item.display_id,
                display_name: item.display_name,
                display_email: item.display_email,
                display_picture: item.display_picture,
                message: item.message,
                date: item.date,
            };
            setchatUser(chatUser);
        } catch (error: any) {
            enqueueSnackbar(
                `${error.response.status}! ${error.response.data.message}`,
                {
                    variant: "error",
                }
            );
        }
    };

    // const { isLoading } = useQuery({
    //     queryKey: ["userChat"],
    //     queryFn: selectChatUserHandler,
    //     onSuccess: (response:any) => {
    //         // setChats(response.data);
    //     },
    //     onError: (error: any) => {
    //         enqueueSnackbar(
    //             `${error.response.status}! ${error.response.data.message}`,
    //             {
    //                 variant: "error",
    //             }
    //         );
    //     },
    // });

    return (
        <div className="w-4/12 h-full bg-white rounded-xl p-1">
            <UserCard />
            <SearchBar />
            <div className="flex-1 h-[calc(100%-56px)] overflow-y-auto custom-scrollbar">
                {allUsers.map((user: IUsers, i: number) => (
                    <ChatUsersCard
                        active={active}
                        selectChatUserHandler={selectChatUserHandler}
                        user={user}
                        key={i}
                    />
                ))}
            </div>
        </div>
    );
};

export default SideBar;

import { IUsers } from "../../Interface/Interface";
import EmptyProfile from "../../assets/images/empty_profile.svg";

interface Iprops {
    selectChatUserHandler: (item: IUsers) => void;
    user: IUsers;
    active: string;
}

const ChatUsersCard = ({ user, selectChatUserHandler, active }: Iprops) => {
    const { user_email } = JSON.parse(
        localStorage.getItem("loginUserInfo") ?? "null"
    );
    return (
        <div
            onClick={() => selectChatUserHandler(user)}
            className={`max-h-16 shadow-sm shadow-slate-400 flex min-h-[10%] ${
                user.display_id === active ? "bg-slate-300" : "bg-slate-50"
            }  rounded-md p-1 m-1 cursor-pointer overflow-auto hover:bg-slate-300 items-center ${user.display_email === user_email ? "hidden":"block"}`}
        >
            <img className="rounded-full h-12" src={user.display_picture ?? EmptyProfile } alt="" />
            <div className=" p-1 flex-auto w-full overflow-auto ml-2">
                <div className="flex justify-between w-full">
                    <span className="font-medium">{user.display_name}</span>
                    <span className="text-sm"> 00:00</span>
                </div>
                <div className="text-sm text-gray-700 w-full  h-fit ">
                    <p className=" whitespace-nowrap w-72 overflow-hidden text-ellipsis">
                        {user.message}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatUsersCard;

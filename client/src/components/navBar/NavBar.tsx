import EmptyProfile from "../../assets/images/empty_profile.svg";
import Options from "../../assets/icons/options.svg";
import OptionMenu from "../optionMenu/OptionMenu";
import phone from "../../assets/icons/phone.svg";
import video from "../../assets/icons/video.svg";
import { IUsers } from "../../Interface/Interface";
import { Link } from "react-router-dom";

interface Iprops {
    openOptions: boolean;
    setOpenOptions: React.Dispatch<React.SetStateAction<boolean>>;
    chatUsers: IUsers;
}
const NavBar = ({ openOptions, setOpenOptions, chatUsers }: Iprops) => {
    function handleOptionsMenu() {
        setOpenOptions((prev) => !prev);
    }
    return (
        <div className=" w-full h-16 relative bg-neutral-200 bg-neutral-500/50 flex-initial flex justify-between items-center p-2 rounded-xl rounded-br-none rounded-bl-none ">
            <img className="cursor-pointer h-12 rounded-full" src={chatUsers.display_picture ?? EmptyProfile } alt="avatar" />
            <span className="font-medium text-slate-50 ml-2">
                {chatUsers.display_name}
            </span>
            <button className="cursor-pointer ml-auto">
                <img src={phone} className="h-8" alt="phone-call" />
            </button>
            <Link className="cursor-pointer ml-3" to={`/videoCall`} target="_blank">
                <img src={video} className="h-8" alt="video-call" />
            </Link>
            <button ></button>
            <img
                className="cursor-pointer ml-3 relative"
                onClick={handleOptionsMenu}
                src={Options}
                alt="option-menu"
            />
            {openOptions && <OptionMenu />}
        </div>
    );
};

export default NavBar;

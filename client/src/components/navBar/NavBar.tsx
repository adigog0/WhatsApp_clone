import Avatar from "../../assets/images/avatar.svg";
import Options from "../../assets/icons/options.svg";
import OptionMenu from "../optionMenu/OptionMenu";
import phone from "../../assets/icons/phone.svg";
import video from "../../assets/icons/video.svg";
import { IReceiverObj } from "../../Interface/Interface";

interface Iprops{
    openOptions: boolean;
    setOpenOptions:React.Dispatch<React.SetStateAction<boolean>>;
    receiver:IReceiverObj;
}
const NavBar = ({openOptions,setOpenOptions,receiver}:Iprops) => {

    function handleOptionsMenu(){
        setOpenOptions(prev => !prev);
    }
    return (
        <div className=" w-full h-16 relative bg-neutral-200 bg-neutral-500/50 flex-initial flex justify-between items-center p-2 rounded-xl rounded-br-none rounded-bl-none ">
            <img className="cursor-pointer h-12" src={Avatar} alt="avatar" />
            <span className="font-medium text-slate-50 ml-2">{receiver.receiverName}</span>
            <img src={phone} className="cursor-pointer ml-auto h-8" alt="phone-call"/>
            <img src={video} className="cursor-pointer ml-3 h-8" alt="video-call"/>
            <img className="cursor-pointer ml-3 relative" onClick={handleOptionsMenu} src={Options} alt="option-menu" />
            {openOptions && <OptionMenu/>}
        </div>
    );
};

export default NavBar;

import Mood from "../../assets/icons/mood.svg";
import Mic from "../../assets/icons/mic.svg";
import Send from "../../assets/icons/send.svg";

const UserInput = () => {
    return (
        <div className="w-full flex items-center justify-center rounded-lg p-2">
            <div className="h-16 flex justify-between items-center px-8 py-2 w-9/12 bg-slate-200 rounded-xl  ml-4">
                <img src={Mood} alt="" className="h-9" />
                <input type="text" className="w-5/6 p-3 rounded-lg " placeholder="type a message" />
                <img src={Mic} alt="" className="h-9 "  />
            </div>

            <img
                src={Send}
                alt=""
                className="bg-slate-100 -rotate-45 rounded-full p-3 items-center ml-2"
            />
        </div>
    );
};
export default UserInput;

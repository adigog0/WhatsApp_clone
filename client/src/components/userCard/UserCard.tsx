import Options from "../../assets/icons/options.svg";

const UserCard = () => {
    const { username, user_picture } = JSON.parse(
        localStorage.getItem("loginUserInfo") ?? "null"
    );
    return (
        <div className="h-14 sticky	 bg-slate-100 p-3 rounded-lg flex items-center gap-4">
            <img src={user_picture} className=" h-12 rounded-3xl" />
            <span className="font-medium">{username}</span>
            <button className="ml-auto hover:bg-slate-200 p-1 rounded-full">
                <img
                    className="invert cursor-pointer"
                    src={Options}
                    alt="option-menu"
                />
            </button>
        </div>
    );
};

export default UserCard;

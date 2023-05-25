import SearchBar from "../searchBar/SearchBar";

const SideBar = () => {
    return (
        <div className="w-4/12 h-full bg-white rounded-xl p-2">
            <SearchBar/>
            <div>chat</div>
        </div>
    );
};

export default SideBar;

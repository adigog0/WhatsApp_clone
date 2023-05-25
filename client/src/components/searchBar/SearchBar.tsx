import Search from "../../assets/icons/search.svg";

const SearchBar =()=>{
    return(
        <div className="h-14 bg-slate-100 p-2 rounded-lg flex items-center justify-center ">
            <img src={Search} alt="" className="h-6"/>
            <input placeholder="Search" className="w-full rounded-lg  p-2"/>

        </div>
    );

}

export default SearchBar;

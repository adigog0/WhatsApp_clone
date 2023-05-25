import SideBar from "../../components/sideBar/SideBar";
import TabContainer from "../../components/tabContainer/TabContainer";

const LandingPage = () => {
    return (
        <div className="flex w-full h-full bg-slate-300 gap-3  rounded-lg  p-2">
            <SideBar />
            <TabContainer/>
        </div>
    );
};

export default LandingPage;

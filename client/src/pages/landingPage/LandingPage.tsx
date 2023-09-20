import SideBar from "../../components/sideBar/SideBar";
import ChatTab from "../../components/chatTab/ChatTab";

const LandingPage = () => {
  return (
    <div className="flex w-full h-full bg-slate-300 gap-3  rounded-lg  p-2">
      <SideBar />
      <ChatTab />
    </div>
  );
};

export default LandingPage;

import { IUsers } from "../../Interface/Interface";
import ChatUsersCard from "../chatUsersCard/ChatUsersCard";
import SearchBar from "../searchBar/SearchBar";
import { useState } from "react";
import UserCard from "../userCard/UserCard";
import { getAllChats } from "../../apis/userdata";
import { useSnackbar } from "notistack";
import ContactList from "../contactList/ContactList";
import { useQuery } from "react-query";
import { useAuth } from "../../context/AuthContext";
import { useSetRecoilState } from "recoil";
import { selectedChatUser } from "../../recoil/selectedChatUser";

export interface IChatUsers {
  date: Date | string;
  display_email: string;
  display_id: string;
  display_name: string;
  display_picture: string;
  message: string;
  messageid: string;
}

const SideBar = () => {
  //hooks
  const { requestWrapper } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  //states
  const [active, setActive] = useState<string>(""); //selected user is active
  const [viewContactList, setViewContactList] = useState<boolean>(false); // to view contact list
  const [userChats, setUserChats] = useState<IUsers[]>([]); // login user all chats
  const setchatUser = useSetRecoilState(selectedChatUser); //selected chat

  //functions

  // get all chats of the login user
  const { isLoading } = useQuery({
    queryKey: ["USERCHATS", userChats],
    // queryFn: async () => {
    //   const [result, err] = await requestWrapper(getAllChats);
    //   {
    //     err !== null &&
    //       enqueueSnackbar(`Error in fetching user chats`, {
    //         variant: "error",
    //       });
    //   }
    //   return result;
    // },
    queryFn: getAllChats,
    onSuccess: (response) => {
      console.log("response in side bar",response);
      let data = response?.data;
      let arr: IUsers[] = [];

      data.forEach((item: IChatUsers) => {
        let obj = {
          user_id: item.display_id,
          user_email: item.display_email,
          user_name: item.display_name,
          user_picture: item.display_picture,
          message: item.message,
          date: item.date,
        };
        arr.push(obj);
      });
      setUserChats(arr);
    },
    refetchInterval: 1000,
  });

  //view contact list handler
  function viewContactListHandler() {
    setViewContactList((prev) => !prev);
  }

  //user selected handler

  const selectChatUserHandler = async (item: IUsers) => {
    setActive(item.user_id);
    let chatUser = {
      user_id: item.user_id,
      user_name: item.user_name,
      user_email: item.user_email,
      user_picture: item.user_picture,
      message: item.message,
      date: item.date,
    };
    setchatUser(chatUser);
  };

  console.log("user chats", userChats);
  return (
    <>
      <div className=" w-[450px]  h-full bg-slate-50 rounded-xl p-1 overflow-hidden">
        {isLoading ? (
          <span>loading..</span>
        ) : (
          <div
            className={`${
              viewContactList ? "-translate-x-[450px] " : "translate-x-0 "
            } flex w-[900px] duration-200 transition-timing-function: cubic-bezier(0.4, 0, 1, 1)  bg-slate-100 h-full  `}
          >
            <div className="w-[440px] p-1 mr-3">
              <UserCard viewContactListHandler={viewContactListHandler} />
              <SearchBar />
              <div className="flex-1 h-[calc(100%-56px)] overflow-y-auto custom-scrollbar">
                {userChats.map((user: IUsers, i: number) => (
                  <ChatUsersCard
                    active={active}
                    selectChatUserHandler={selectChatUserHandler}
                    user={user}
                    key={i}
                  />
                ))}
              </div>
            </div>
            <div className="w-[440px]">
              <ContactList
                setViewContactList={setViewContactList}
                viewContactListHandler={viewContactListHandler}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;

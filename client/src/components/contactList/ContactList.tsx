import { useState } from "react";
import { IUsers } from "../../Interface/Interface";
import { getAllUsers, getUserMessages } from "../../apis/userdata";
import BackButton from "../../assets/icons/back_button.svg";
import SearchBar from "../searchBar/SearchBar";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "react-query";
import ChatUsersCard from "../chatUsersCard/ChatUsersCard";
import { useSetRecoilState } from "recoil";
import { selectedChatUser } from "../../recoil/selectedChatUser";

interface IProps {
  viewContactListHandler: () => void;
  setViewContactList: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactList = ({
  viewContactListHandler,
  setViewContactList,
}: IProps) => {
  const [active, setActive] = useState<string>("");
  const [userList, setUserList] = useState<IUsers[]>([]);
  const setchatUser = useSetRecoilState(selectedChatUser); 

  const { isLoading } = useQuery({
    queryKey: ["All_Users"],
    queryFn: getAllUsers,
    onSuccess: (response) => {
      let data = response?.data;
      let arr: IUsers[] = [];
      data.forEach(
        (item: {
          id: string;
          username: string;
          user_email: string;
          user_picture: string;
        }) => {
          let obj = {
            user_id: item.id,
            user_email: item.user_email,
            user_name: item.username,
            user_picture: item.user_picture,
            message: "",
            date: new Date(),
          };
          arr.push(obj);
        }
      );
      setUserList(arr);
    },
    onError: (error: any) => {
      enqueueSnackbar(
        `${error.response.status}! ${error.response.data.message}`,
        {
          variant: "error",
        }
      );
    },
  });

  async function selectUserHandler(item: IUsers) {
      setchatUser(item);
      setViewContactList((prev) => !prev);
  }
  return (
    <>
      <button
        onClick={viewContactListHandler}
        className="flex items-center justify-between"
      >
        <img src={BackButton} alt="back_button" />
      </button>

      <SearchBar />
      <div className="flex-1 h-[calc(100%-56px)] overflow-y-auto custom-scrollbar justify-center items-center ">
        {isLoading ? (
          <div className="m-auto border border-4 w-full min-h-full">Loading...</div>
        ) : (
          userList.map((user, i) => (
            <ChatUsersCard
              active={active}
              selectChatUserHandler={selectUserHandler}
              user={user}
              key={i}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ContactList;

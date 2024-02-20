import useGetItems from "../../hooks/useGetItems";
import UserItem from "../components/UserItem";
import { useState } from "react";
import Loading from "../../shared/components/Loading/Loading";
import "./Users.css";
import MainPageLayout from "../../shared/components/MainPageLayout/MainPageLayout";

const Users = () => {
  const [searchedText, setSearchedText] = useState("");

  // useEffect(() => {
  //   if (e.target.value !== "") {
  //     setSearchedText(e.target.value);
  //   }
  // }, [e.target.value]);

  const searchText = (e) => {
    if(e.target.value !== ""){
      setSearchedText(e.target.value);
    } else {
      setSearchedText("");
    }
  }
  
  const userData = useGetItems(
    `${process.env.REACT_APP_BASE_API_URL}/user?name=${searchedText || ""}`,
    false
  );

  return (
    <>
      <MainPageLayout active="explore">
        <input className="search-input" type="text" placeholder="Search friends..." onChange={(e) => searchText(e)} />
        {userData.isLoading && <Loading />}
        {!userData.isLoading &&
          userData.data.map((user) => {
            return (
              <UserItem
                key={user.uid}
                uid={user.uid}
                profileImage={user.profileImage}
                name={user.name}
              />
            );
          })}
      </MainPageLayout>
    </>
  );
};

export default Users;

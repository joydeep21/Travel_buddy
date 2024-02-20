/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../shared/components/Loading/Loading";
import PostItem from "../../shared/components/PostItem/PostItem";
import useGetItems from "../../hooks/useGetItems";
import MainPageLayout from "../../shared/components/MainPageLayout/MainPageLayout";
import sad from "../../assets/sad.svg";
import "./Feed.css";
import useToast from "../../hooks/useToast";

const Feed = () => {
  const showToast = useToast();
  const currentUrl = window.location.pathname;
  const [searchedLocText, setSearchedLocText] = useState("");

  const searchLocText = (e) => {
    if(e.target.value !== ""){
      setSearchedLocText(e.target.value);
    } else {
      setSearchedLocText("");
    }
  }

  const feedData = useGetItems(
    `${process.env.REACT_APP_BASE_API_URL}/posts/feed?location=${searchedLocText || ""}`,
    true
  );

  useEffect(() => {
    if (feedData.isError) {
      showToast("Something went wrong", false);
    }
  }, [feedData.isError]);

  return (
    <>
      <MainPageLayout active="home">
        { (currentUrl === "/" || currentUrl === "/saves") && (
        <input className="search-loc-input" type = "text" placeholder = "Search by location..." onChange={(e) => searchLocText(e)}/>
        )}
        {feedData.isLoading && <Loading />}
        {!feedData.isLoading &&
          feedData.data.length !== 0 &&
          feedData.data.posts.map((post) => {
            return (
              <PostItem
                key={post._id}
                id={post._id}
                saves={feedData.data.saves}
                {...post}
              />
            );
          })}

        {!feedData.isLoading && (
          <div className="feed-end">
            <img src={sad} alt="" />
            <span>{`${
              feedData.data.posts.length === 0 ? "No " : "End of "
            }content?`}</span>
            <span>
              {`${
                feedData.data.posts.length === 0
                  ? "Find and follow "
                  : "For more content, find new "
              }`}
              users on the <Link to="/explore">find friends</Link> page
            </span>
          </div>
        )}
      </MainPageLayout>
    </>
  );
};

export default Feed;

import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchCard, Navbar, Sidebar, Spinner, Card } from "../components/";
import { clearVideos } from "../features/Youtube/youtubeSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { HomepageVideos } from "../Types";
import { useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";

const Search: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeCloneApp.videos);
  const searchTerm = useAppSelector((state) => state.youtubeCloneApp.searchTerm);

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === "") navigate("/");
    else {
      dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, searchTerm]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "5.8vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "95vh" }}>
        <Sidebar />
        <div className="flex-grow h-screen">
          {videos.length ? (
            <div className="py-8 pl-8 flex flex-col gap-5 w-full">
              <InfiniteScroll
                dataLength={videos.length}
                next={() => dispatch(getSearchPageVideos(true))}
                hasMore={videos.length < 500}
                loader={<Spinner />}
                height={1000}
              >
                {videos.map((item: HomepageVideos) => {
                  return (
                    <div className="my-5">
                      <SearchCard data={item} key={item.videoId + Math.random()} />
                    </div>
                  );
                })}
              </InfiniteScroll>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

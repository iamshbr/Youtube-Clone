import React, { useEffect } from "react";
import { Navbar, Sidebar, Card, Spinner } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../store/store";
import { getHomepageVideos } from "../store/reducers/getHomepageVideos";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomepageVideos } from "../Types";
import { clearVideos } from "../features/Youtube/youtubeSlice";

const Home: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const videos = useAppSelector((state: RootState) => state.youtubeCloneApp.videos);

  useEffect(() => {
    return () => {
      dispatch(clearVideos());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHomepageVideos(false));
    console.log(videos);
  }, [dispatch]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "5.8vh" }}>
        <Navbar />
      </div>
      <div className="flex overflow-hidden" style={{ height: "95vh" }}>
        <Sidebar />

        <div className="flex-grow h-screen">
          {videos.length ? (
            <InfiniteScroll height={1000} dataLength={videos.length} next={() => dispatch(getHomepageVideos(true))} hasMore={videos.length < 500} loader={<Spinner />}>
              <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8 h-full">
                {videos.map((item: HomepageVideos) => {
                  return <Card data={item} key={item.videoId + Math.random()} />;
                })}
              </div>
            </InfiniteScroll>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

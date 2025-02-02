import React from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { TiMicrophone } from "react-icons/ti";
import { BsYoutube, BsCameraVideo, BsBell } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoAppsSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { YoutubeIcon } from "./";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../store/store";
import { clearVideos, changeSearchTerm, clearSearchTerm } from "../features/Youtube/youtubeSlice";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";

const Navbar: React.FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state: RootState) => state.youtubeCloneApp.searchTerm);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.pathname !== "search") {
      navigate("/search");
    } else {
      dispatch(clearVideos());
      dispatch(getSearchPageVideos(false));
    }
  };

  return (
    <div className="flex justify-between items-center  px-14 h-14 bg-[#212121] opacity-95 sticky top-0 z-50">
      <div className="flex gap-8 items-center text-2xl">
        <div>
          <GiHamburgerMenu />
        </div>
        <Link to="/">
          <div className="flex gap-1 items-center justify-center">
            <YoutubeIcon />
            <span className="text-xl font-medium">Youtube</span>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-5">
        <form onSubmit={handleSearch}>
          <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0 rounded-full">
            <div className="flex gap-4 items-center pr-5">
              <div>
                <AiOutlineSearch className="text-xl" />
              </div>
              <input
                type="text"
                className="w-96 bg-zinc-900 focus:outline-none border-none"
                placeholder="Search"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(changeSearchTerm(e.target.value));
                }}
              />
              {/* <AiOutlineClose className="" /> */}
              <AiOutlineClose
                className={`text-xl cursor-pointer  ${!searchTerm ? "invisible" : "visible"}`}
                onClick={(e: React.MouseEvent): void => {
                  e.preventDefault();
                  dispatch(clearSearchTerm());
                }}
              />
            </div>
            <button className="h-10 w-16 flex items-center justify-center bg-zinc-800 rounded-r-full">
              <AiOutlineSearch className="text-xl" />
            </button>
          </div>
        </form>
        <div className="text-xl p-3 bg-zinc-900 rounded-full">
          <TiMicrophone />
        </div>
      </div>
      <div className="flex gap-5 items-center text-xl">
        <BsCameraVideo />
        <IoAppsSharp />
        <div className="relative">
          <BsBell />
          <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">9+</span>
        </div>
        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-red-600 text-sm ml-1 px-1">S</div>
      </div>
    </div>
  );
};

export default Navbar;

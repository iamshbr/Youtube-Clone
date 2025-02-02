import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { HomepageVideos } from "../../Types";
import { parseData } from "../../utils";
import { YOUTUBE_API_URL } from "../../utils/constants";
import apiKeys from "../../config/config";

const API_KEY = apiKeys.youtubeApiKey;

export const getSearchPageVideos = createAsyncThunk("youtubeCloneApp/searchPageVideos", async (isNext: boolean, { getState }) => {
  const {
    youtubeCloneApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
  } = getState() as RootState;
  const {
    data: { items, nextPageToken },
  } = await axios.get(`${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""}`);
  const parsedData: HomepageVideos[] = await parseData(items);
  return { parsedData: [...videos, ...parsedData], nextPageToken };
});

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiKeys from "../../config/config";
import { RootState } from "../store";
import { HomepageVideos } from "../../Types";
import { YOUTUBE_API_URL } from "../../utils/constants";
import axios from "axios";
import { parseData } from "../../utils";

const API_KEY = apiKeys.youtubeApiKey;

export const getHomepageVideos = createAsyncThunk("youtubeCloneApp/homePageVideos", async (isNext: boolean, { getState }) => {
  const {
    youtubeCloneApp: { nextPageToken: nextPageTokenFromState, videos },
  } = getState() as RootState;

  const {
    data: { items, nextPageToken },
  } = await axios.get(
    `${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""}`
  );

  const parsedData: HomepageVideos[] = await parseData(items);
  return { parsedData: [...videos, ...parsedData], nextPageToken };
});

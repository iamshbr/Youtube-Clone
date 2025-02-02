import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { RecommendedVideos } from "../../Types";
import { parseRecommendedData } from "../../utils";
import { YOUTUBE_API_URL } from "../../utils/constants";
import apiKeys from "../../config/config";

const API_KEY = apiKeys.youtubeApiKey;

export const getRecommendedVideos = createAsyncThunk("youtubeCloneApp/getRecommendedVideos", async (videoId: string, { getState }) => {
  const { youtubeCloneApp } = getState() as RootState;
  const channelId = youtubeCloneApp.currentPlaying?.channelInfo?.id ?? null;

  const {
    data: { items },
  } = await axios.get(`${YOUTUBE_API_URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`);

  const parsedData: RecommendedVideos[] = await parseRecommendedData(items, videoId);

  return { parsedData };
});

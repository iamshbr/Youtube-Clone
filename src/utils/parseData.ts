import axios from "axios";
import { convertRawViewsToString, parseVideoDuration, timeSince } from "./";
import { YOUTUBE_API_URL } from "./constants";
import { HomepageVideos } from "../Types";
import apiKeys from "../config/config";

const API_KEY = apiKeys.youtubeApiKey;

// Function to process and format YouTube video data
export const parseData = async (items: any[]) => {
  try {
    const videoIds: string[] = []; // Store extracted video IDs
    const channelIds: string[] = []; // Store extracted channel IDs

    // Loop through items and extract video and channel IDs
    items.forEach((item: { snippet: { channelId: string }; id: { videoId: string } }) => {
      channelIds.push(item.snippet.channelId);
      videoIds.push(item.id.videoId);
    });

    // 🔹 Fetch channel details (profile images, etc.)
    const {
      data: { items: channelsData },
    } = await axios.get(`${YOUTUBE_API_URL}/channels?part=snippet,contentDetails&id=${channelIds.join(",")}&key=${API_KEY}`);

    // 🔹 Parse channel data (store ID and profile image)
    const parsedChannelsData: { id: string; image: string }[] = [];
    channelsData.forEach((channel: { id: string; snippet: { thumbnails: { default: { url: string } } } }) =>
      parsedChannelsData.push({
        id: channel.id,
        image: channel.snippet.thumbnails.default.url,
      })
    );

    // 🔹 Fetch video details (duration, views, etc.)
    const {
      data: { items: videosData },
    } = await axios.get(`${YOUTUBE_API_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`);

    // 🔹 Parse video data into structured format
    const parsedData: HomepageVideos[] = [];
    items.forEach(
      (
        item: {
          snippet: {
            channelId: string;
            title: string;
            description: string;
            thumbnails: { medium: { url: string } };
            publishedAt: Date;
            channelTitle: string;
          };
          id: { videoId: string };
        },
        index: number // Track index for corresponding video details
      ) => {
        // Find the corresponding channel image
        const { image: channelImage } = parsedChannelsData.find((data) => data.id === item.snippet.channelId)!;

        // Ensure channel image exists before pushing data
        if (channelImage)
          parsedData.push({
            videoId: item.id.videoId,
            videoTitle: item.snippet.title,
            videoDescription: item.snippet.description,
            videoThumbnail: item.snippet.thumbnails.medium.url,
            videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            videoDuration: parseVideoDuration(videosData[index].contentDetails.duration),
            videoViews: convertRawViewsToString(videosData[index].statistics.viewCount),
            videoAge: timeSince(new Date(item.snippet.publishedAt)),
            channelInfo: {
              id: item.snippet.channelId,
              image: channelImage,
              name: item.snippet.channelTitle,
            },
          });
      }
    );

    return parsedData;
  } catch (err) {
    console.log(err);
    return [];
  }
};

import logger from "../logging/logger";
import { google } from "googleapis";
import { getPerspective } from "./perspective";

const youtube = google.youtube({
  version: "v3",
  auth: "AIzaSyBs8qmyswTKPUTxP84pJZ1MLpLWCKc1yT0",
});

export const getComments = async (videoId: string) => {
  try {
    const response = await youtube.commentThreads.list({
      part: ["snippet"],
      videoId: videoId,
      textFormat: "plainText",
    });

    if (!response.data.items) {
      throw new Error("No comments found");
    }

    const comments = response.data.items?.map(
      (item: any) => item?.snippet?.topLevelComment?.snippet?.textDisplay ?? ""
    );

    console.log(comments);

    const perspectivePromises = comments.map((comment: any) =>
      getPerspective(comment)
    );
    const perspectiveResults = await Promise.all(perspectivePromises);
    return perspectiveResults;
  } catch (error) {
    logger.error(`Video Url Invalid ${videoId} : ${error}`);
    throw error;
  }
};

// getComments("xJGknPWd0mo");

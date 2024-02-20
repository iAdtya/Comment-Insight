import express, { Express, Request, Response } from "express";
import { getComments } from "../controllers/comments";
import { getPerspective } from "../controllers/perspective";
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello This is Comment-Insight API!!",
  });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Health Check Passed",
  });
});

app.post("/comments", async (req: Request, res: Response) => {
  console.log(req.body);
  const videoId = req.body.videoId;
  try {
    const comments = await getComments(videoId);
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({
      error:
        "An error occurred while fetching comments. Please try again later.",
    });
  }
});

// app.post("/perspective", async (req: Request, res: Response) => {
//   try {
//     const perspective = await getPerspective();
//     res.status(200).json({ perspective: perspective });
//   } catch (err) {
//     res.status(500).json({
//       error:
//         "An error occurred while Perspective comments. Please try again later.",
//     });
//   }
// });

console.log("router:: loaded");

export default app;

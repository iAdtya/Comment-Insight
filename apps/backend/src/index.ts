import express from "express";
import logger from "./logging/logger";
import routes from "./routes/index";

const app = express();

const PORT = process.env.port || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

let server;

const startServer = async () => {
  try {
    server = app.listen(PORT, () => {
      logger.info(`Server beating 💓 on port :: ${PORT}`);
    });
  } catch (error: any) {
    logger.error(`Error occurred: ${error.message}`);
  }
};
startServer();

export default app;
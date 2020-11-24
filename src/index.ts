import * as dotenv from "dotenv";
dotenv.config();

import * as express from "express";
import { json } from "body-parser";
import * as AWS from "aws-sdk";

AWS.config.update({ region: "us-west-1" });

import { VideoController } from "./videoController";

const app: express.Application = express();
const videoController = new VideoController();

app.use(json());

app.post("/videos/concatenate", videoController.concatenateVideos);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

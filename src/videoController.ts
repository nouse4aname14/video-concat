import { Request, Response } from "express";
import * as AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { FileUpload } from "./fileUpload";

export class VideoController {
  public concatenateVideos = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const fileUpload = new FileUpload();
      const files = await fileUpload.handle(req.body.files);
      const elastictranscoder = new AWS.ElasticTranscoder();
      const uuid = uuidv4();
      const outputFileName = `${uuid}.mp4`;
      const outputFile = `https://${process.env.AWS_OUTPUT_BUCKET}.s3-us-west-1.amazonaws.com/o/${outputFileName}`;
      const params = {
        PipelineId: process.env.AWS_PIPELINE_ID || "",
        Inputs: [{ Key: files[0] }, { Key: files[1] }],
        Output: {
          Key: outputFileName,
          PresetId: process.env.AWS_JOB_PRESET_VIDEO || ""
        },
        OutputKeyPrefix: `o/`
      };

      // running into sync issues
      await new Promise(resolve =>
        setTimeout(() => {
          elastictranscoder.createJob(params, (err: any, result: any) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
            }
          });
        }, 2000)
      );

      return res.status(200).send({ file: outputFile });
    } catch (e) {
      console.log(e);
      return res.status(500).send({});
    }
  };
}

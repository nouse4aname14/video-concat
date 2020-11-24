import * as AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { PassThrough } from "stream";

export class FileUpload {
  public async handle(files: string[]): Promise<string[]> {
    let promise = null;
    const s3 = new AWS.S3();
    const file1Name = `${uuidv4()}.mp4`;
    const file2Name = `${uuidv4()}.mp4`;

    const uploadStream = (filename: string, contentType: any) => {
      const pass = new PassThrough();
      promise = s3
        .upload({
          Key: filename,
          Body: pass,
          ACL: "public-read",
          ContentType: contentType,
          Bucket: process.env.AWS_INPUT_BUCKET || ""
        })
        .promise();
      return pass;
    };

    const video1 = await axios({
      method: "get",
      url: files[0],
      responseType: "stream"
    });

    if (video1.status === 200) {
      video1.data.pipe(uploadStream(file1Name, video1.headers["content-type"]));
    }

    const video2 = await axios({
      method: "get",
      url: files[1],
      responseType: "stream"
    });

    if (video2.status === 200) {
      video2.data.pipe(uploadStream(file2Name, video2.headers["content-type"]));
    }

    return [file1Name, file2Name];
  }
}

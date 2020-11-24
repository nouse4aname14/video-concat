# Video concat

## Getting Started
- Create a .env file at the root of the directory and provide your own configuration values
    ```PORT=$YOUR_PORT
    AWS_PIPELINE_ID=$YOUR_AWS_ELASTICTRANSCODER_PIPELINE_ID
    AWS_JOB_PRESET_VIDEO=$YOUR_AWS_ELASTICTRANSCODER_JOB_PRESET
    AWS_INPUT_BUCKET=$YOUR_AWS_VIDEO_INPUT_BUCKET
    AWS_OUTPUT_BUCKET=$YOUR_AWS_VIDEO_OUTPUT_BUCKET
    ```
- This project uses the aws-sdk for node and needs a file created ~/.aws/credentials with your aws_access_key_id and aws_secret_access_key
- Install [node.js](https://nodejs.org/en/download/)
- Install the app
    ```bash
    npm install
    ```
- Build the app
    ```bash
    npm run build
    ```
- Start the app
    ```bash
    npm start
    ```
    
## Tech Decisions
- I decided to use `node.js` with `Typescript` and `express.js` to complete this task because given the timeframe I thought it would be the quickest to get the job done.
- I used [AWS Elastic Transcoder](https://aws.amazon.com/elastictranscoder/) because I read that it could get the job done and I have never used it before so I thought it would be a great opportunity to try something new.
- If I had more time I would build a more robust system envolving a queue, notification system, and cleaner better thought out code.

## Citation
- Grabbed videos from https://coverr.co/
- Looked at this to setup AWS environment https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/sample-code.html
- Found this for downloading file from remote url and upload to s3 https://gist.github.com/DWboutin/5314172f65c9dab32c663faab8a42de3

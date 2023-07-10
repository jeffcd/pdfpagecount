import fs from "node:fs";
import { S3Client, GetObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";

const client = new S3Client({});
const Bucket = "sagemaker-us-west-2-598303512945";
const listObjectsInput = {
  Bucket
};
const command = new ListObjectsCommand(listObjectsInput);
const response = await client.send(command);
response.Contents.slice(0, 50).forEach(async (object) => {
  const filename = object.Key.split("/").pop();
  if (/\.pdf/.test(filename) && !fs.existsSync(filename)) {
    console.log(filename);
    const getObjectInput = {
      Bucket,
      Key: object.Key,
    };
    const command = new GetObjectCommand(getObjectInput);
    const response = await client.send(command);
    const writeStream = fs.createWriteStream(filename);
    const readStream = response.Body;
    readStream.pipe(writeStream);
  }
});

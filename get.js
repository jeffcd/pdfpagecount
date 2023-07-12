import fs from "node:fs";
import {
  S3Client,
  GetObjectCommand,
  ListObjectsCommand,
} from "@aws-sdk/client-s3";

if (fs.existsSync("pdfs") || fs.existsSync("pdfs.tgz")) {
  console.error("Please remove pdfs and/or pdfs.tgz");
  process.exit(1);
}

fs.mkdirSync("pdfs");

const client = new S3Client({});
const Bucket = process.argv[2];
const Prefix = process.argv[3];
const listObjectsInput = {
  Bucket,
  Prefix,
};
const command = new ListObjectsCommand(listObjectsInput);
const response = await client.send(command);
const MAX_TO_GET = 100;
let count = 0;
for (let i = 0; i < response.Contents.length; i++) {
  const object = response.Contents[i];
  const filename = object.Key.split("/").pop();
  if (
    /\.pdf$|\.PDF$/.test(filename) &&
    !fs.existsSync(filename) &&
    count < MAX_TO_GET
  ) {
    count += 1;
    console.log(filename);
    const getObjectInput = {
      Bucket,
      Key: object.Key,
    };
    const command = new GetObjectCommand(getObjectInput);
    const response = await client.send(command);
    const writeStream = fs.createWriteStream("pdfs/" + filename);
    const readStream = response.Body;
    readStream.pipe(writeStream);
  }
}

import S3 from "aws-sdk/clients/s3";
import { randomBytes } from "crypto";
import fs from "fs";

const region = process.env.AWS_BACKET_REGION;
const bucketName = process.env.AWS_BACKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_S3;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_S3;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

// from node backend to AWS bucket
// export const uploadFile = (file) => {
//   const fileStream = fs.createReadStream(file.path);

//   const uploadParams = {
//     Bucket: bucketName,
//     Body: fileStream,
//     Key: file.name,
//   };

//   return s3.upload(uploadParams).promise();
// };

// upload image from client
export async function generateUploadUrl() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };
  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

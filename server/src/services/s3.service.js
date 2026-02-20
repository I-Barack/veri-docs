import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const uploadBufferToS3 = async (buffer, mimetype) => {
  const key = `document/${crypto.randomUUID()}`;

  const command = new PutObjectCommand({
    bucket: process.env.AWS_S3_BUCKET,
    key,
    body: buffer,
    ContentType: mimetype,
  });

  await s3.send(command);

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;
};

import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { date } from "zod";
import { env } from "../../../validate.env.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: env.AWS_REGION!,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadFile =async(file:Express.Multer.File,key:string)=>{
  try{
  
    await s3Client.send(
      new PutObjectCommand({
        Bucket:env.AWS_BUCKET_NAME,
        Key:key,
        Body:file.buffer,
        ContentType:file.mimetype,
      })
    );
    return key 
  }catch(e){
        throw(e);
  }

};


export const getPreSignedURL = async (key: string) => {
  try {
    const command = new GetObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: key
    });
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  } catch (e) {
    throw (e);
  }
}

export default s3Client;
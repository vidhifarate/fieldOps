import { createClient } from "redis";

export const redis = createClient();
export const connectToRedis = async () => {
  try {
    await redis.connect();
    redis.on('error', (err) => { console.log("error while connecting to redis ") })
    console.log("connected to redis");
  } catch (e) {
    throw e;

  }
}
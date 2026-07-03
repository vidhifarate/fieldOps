import z from "zod";
const envSchema = z.object({
  PORT: z.coerce.number({ message: "port should be a number " }),
  DB_NAME: z.string().min(1),
  DB_USERNAME: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  AWS_REGION: z.string().min(1),
  AWS_BUCKET_NAME: z.string().min(1),
  OPENAI_API_KEY: z.string().min(1)
})

export const env = envSchema.parse(process.env);
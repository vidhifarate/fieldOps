import z from "zod";

export const ZCreateMessage = z.object({
  sender_id: z.string(),
  message: z.string()
})

export type createMessage = {
  job_id: string,
  sender_id: string,
  message: string
}
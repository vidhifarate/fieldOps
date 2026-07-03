import { JobMessage } from "./job-message.schemas.js";
import type { createMessage } from "./job-message.types.js";

const create = async (message: createMessage) => await JobMessage.create(message);


export const findAll = async (jobId: string) => await JobMessage.findAll({
  where: { job_id: jobId }, order: [["created_at", "ASC"]]
});


export default {
  create, findAll
}
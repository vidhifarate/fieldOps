import { Op } from "sequelize";
import type { CreateJob } from "./job.types.js";
import { Jobs } from "./jobs.schemas.js";

const create = async (job: CreateJob) => await Jobs.create(job);

export const findAll = async (query: any) => {
  try {

    const { search, subscription, sortBy, order = 'ASC', limit = 4 } = query;
    const whereClause: any = {};


    if (search) {
      whereClause.status = {
        [Op.iLike]: `%${search}%`
      }
    }
    if (subscription) {
      whereClause.subscription = subscription;
    }
    return Jobs.findAll({
      where: whereClause,
      order: [['status', order]],
      limit: limit,
      raw: true,
    })

  } catch (e) {
    throw e;
  }
}


const findOne = async (whereClause: any) => await Jobs.findOne({ where: whereClause });

const update = async (jobId: string, updateData: any) => await Jobs.update(updateData, { where: { id: jobId } })





export default { create, 
  findAll, 
  findOne,
   update
   }
import { partial } from "zod/mini";
import { Users } from "./user.schema.js";
import type { CreateUser, Update, User } from "./user.types.js";
import { Op, where } from "sequelize";
import { Jobs } from "../jobs/jobs.schemas.js";


const findOne = async (whereClause: any) => Users.findOne({ where: { ...whereClause } });


const getTechnicianSummary = async (technicianId: string) => {
  return await Users.findOne({
    where: {
      id: technicianId,
      role: "Technician"
    },
    attributes: ["id", "name", "email", "created_at"],
    include: [
      {
        model: Jobs,
        as: "assignedJobs",
        required: false
      }
    ],
    order: [[{ model: Jobs, as: "assignedJobs" }, "created_at", "DESC"]]
  });
};




const create = async (user: User) => await Users.create(user);

export const findAll = async (query: any) => {
  try {

    const { search, subscription, sortBy, order = 'ASC', limit = 10 } = query;
    const whereClause: any = {};
    if (search) {
      whereClause.name = {
        [Op.iLike]: `%${search}%`
      }
    }
    return Users.findAll({
      where: whereClause,
      order: [['name', order]],
      limit: limit,
      raw: true,
    })

  } catch (e) {
    throw e;
  }
}



export default { create, findOne, findAll, getTechnicianSummary }

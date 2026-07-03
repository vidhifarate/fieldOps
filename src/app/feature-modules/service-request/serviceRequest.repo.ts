import { Op } from "sequelize";
import { ServiceRequest } from "./serviceRequest.schema.js";
import type { CreateRequest, Request } from "./serviceRequest.types.js";

const create = async(request:Request)=>await ServiceRequest.create(request);


export const findAll = async (query: any) => {
  try {

    const { search, subscription, sortBy, order = 'ASC', limit = 4 } = query;
    const whereClause: any = {};
  
    if (search) {
      whereClause.title = {
        [Op.iLike]: `%${search}%`
      }
    }
  
    return ServiceRequest.findAll({
      where: whereClause,
      order: [[ 'urgency', order]],
      limit: limit,
      raw: true,
    })

  } catch (e) {
    throw e;
  }
};

const findOne = async(filter:any)=>await ServiceRequest.findOne({where:filter})



export default {
  create,findAll,findOne
}
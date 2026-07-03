
import { Op } from "sequelize";
import { AddressSchema } from "./address.schemas.js";
import type { Address } from "./address.types.js";

const create = async (address: Address) => await AddressSchema.create(address);


export const findAll = async (query: any) => {
  try {

    const { search, subscription, sortBy, order = 'ASC', limit = 4 } = query;
    const whereClause: any = {};
    if (search) {
      whereClause.city = {
        [Op.iLike]: `%${search}%`
      }
    }
    if (subscription) {
      whereClause.subscription = subscription;
    }
    return AddressSchema.findAll({
      where: whereClause,
      order: [['city', order]],
      limit: limit,
      raw: true,
    })

  } catch (e) {
    throw e;
  }
};


export default {
  create,
  findAll
}
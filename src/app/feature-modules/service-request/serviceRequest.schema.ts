import { DataTypes, Model, Sequelize, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../connecions/pg.connection.js";
import type { Users } from "../user/user.schema.js";
import type { AddressSchema } from "../address/address.schemas.js";


export class ServiceRequest extends Model<InferAttributes<ServiceRequest>, InferCreationAttributes<ServiceRequest>> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare description: CreationOptional<string>;
  declare  address_id: ForeignKey<AddressSchema["id"]>;
  declare urgency: string;
  declare photo:string
  declare   customer_id:ForeignKey<Users["id"]>
  declare date: CreationOptional<string>;
  declare created_by: ForeignKey<Users["id"]>
  declare updated_by: CreationOptional<ForeignKey<Users["id"]>>
  declare deleted_by: CreationOptional<ForeignKey<Users["id"]>>
  declare created_at: CreationOptional<string>
  declare updated_at: CreationOptional<string>
  declare deleted_at: CreationOptional<string>
}

ServiceRequest.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.fn('uuidv4')
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
    address_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'address',
      key: 'id'
    }
  },
  urgency: {
    type: DataTypes.ENUM("high", "mid", "low"),
    allowNull: true
  },
  photo:{
    allowNull:true,
    type:DataTypes.STRING
  },
  date: {
    allowNull: true,
    type: DataTypes.INTEGER,
    defaultValue:Sequelize.fn('now') ,
  },
  customer_id:{
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  
  created_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  updated_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.fn('now')
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.fn('now')
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  }

}, {
  sequelize,
  tableName: "service_requests",
  timestamps: false
});








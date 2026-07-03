import { DataTypes, Model, Sequelize, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../connecions/pg.connection.js";
import type { Users } from "../user/user.schema.js";


export class AddressSchema extends Model<InferAttributes<AddressSchema>, InferCreationAttributes<AddressSchema>> {
  declare id: CreationOptional<string>;
  declare line1: string;
  declare line2: CreationOptional<string>;
  declare city: string;
  declare state: string;
  declare customer_id: ForeignKey<Users["id"]>
  declare created_by: ForeignKey<Users["id"]>
  declare updated_by: CreationOptional<ForeignKey<Users["id"]>>
  declare deleted_by: CreationOptional<ForeignKey<Users["id"]>>
  declare created_at: CreationOptional<string>
  declare updated_at: CreationOptional<string>
  declare deleted_at: CreationOptional<string>
}

AddressSchema.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.fn('uuidv4')
  },
  line1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  line2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  },
  customer_id: {
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
  tableName: "address",
  timestamps: false
});








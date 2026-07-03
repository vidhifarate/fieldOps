import { DataTypes, Model, Sequelize, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import type { ServiceRequest } from "../service-request/serviceRequest.schema.js";
import type { Users } from "../user/user.schema.js";
import { sequelize } from "../../connecions/pg.connection.js";



export class Jobs extends Model<InferAttributes<Jobs>, InferCreationAttributes<Jobs>> {
  declare id: CreationOptional<string>;
  declare service_request_id: ForeignKey<ServiceRequest["id"]>;
  declare description: CreationOptional<string>
  declare technician_id: ForeignKey<Users["id"]>;
  declare status: string;
  declare scheduled_at: string;
  declare after_photo: CreationOptional<string>;
  declare summary: CreationOptional<string>;
  declare created_by: ForeignKey<Users["id"]>
  declare updated_by: CreationOptional<ForeignKey<Users["id"]>>
  declare deleted_by: CreationOptional<ForeignKey<Users["id"]>>
  declare created_at: CreationOptional<string>
  declare updated_at: CreationOptional<string>
  declare deleted_at: CreationOptional<string>
}

Jobs.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.fn('uuidv4')
  },
  service_request_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: 'service_requests', key: 'id'
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  technician_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users', key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM("assigned", "en route",
      "in progress", "completed"),
    defaultValue: "assigned"
  },
  scheduled_at: {
    type: DataTypes.STRING,
    allowNull: false

  },
  after_photo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true
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
  tableName: "jobs",
  timestamps: false,
});

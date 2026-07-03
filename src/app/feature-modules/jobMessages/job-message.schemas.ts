import { DataTypes, Model, Sequelize, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../connecions/pg.connection.js";


export class JobMessage extends Model<InferAttributes<JobMessage>, InferCreationAttributes<JobMessage>> {
  declare id: CreationOptional<string>;
  declare job_id: string;
  declare sender_id: string;
  declare message: string;
  declare created_at: CreationOptional<Date>;
}

JobMessage.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true, defaultValue:
      Sequelize.fn('uuidv4')
  },
  job_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  sender_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('now')
  }
}, {
  sequelize,
  tableName: "job_messages",
  timestamps: false,

});

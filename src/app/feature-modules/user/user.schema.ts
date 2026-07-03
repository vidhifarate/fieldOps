import { DataTypes, Model, Sequelize, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../connecions/pg.connection.js";


export class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role:string;
  declare pwd_version:CreationOptional<number>;
  declare is_active:CreationOptional<boolean>
  declare created_by :ForeignKey<Users["id"]>
  declare updated_by:CreationOptional<ForeignKey<Users["id"]>>
  declare deleted_by:CreationOptional<ForeignKey<Users["id"]>>
  declare created_at:CreationOptional<string>
  declare updated_at:CreationOptional<string>
  declare deleted_at:CreationOptional<string>
}

Users.init({
  id: {
  type:DataTypes.UUID,
    primaryKey:true,
    defaultValue:Sequelize.fn('uuidv4')
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role:{
    type: DataTypes.ENUM("Customer","Technician","Dispatcher","Default"),
    allowNull:true
  },
  pwd_version: {
    allowNull: true,
    type: DataTypes.INTEGER,
    defaultValue:0 ,
  },
  is_active:{
    allowNull:true,
    type:DataTypes.BOOLEAN,
    defaultValue:false
   },
 created_by:{
     type:DataTypes.UUID,
    allowNull:true,
     references:{
      model:'users',
      key:'id'
    }
  },
  updated_by:{
    type:DataTypes.UUID,
    allowNull:true,
     references:{
      model:'users',
      key:'id'
    }
  },
 
  created_at:{
    type:DataTypes.DATE,
    allowNull:true,
    defaultValue:Sequelize.fn('now')
  },
  updated_at:{
    type:DataTypes.DATE,
    allowNull:true,
    defaultValue:Sequelize.fn('now')
  },
  deleted_at :{
    type:DataTypes.DATE,
    allowNull:true,
  }

}, {
  sequelize,
  tableName: "users",
  timestamps: false 
});








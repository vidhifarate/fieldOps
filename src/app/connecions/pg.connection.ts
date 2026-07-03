
import { Sequelize } from "sequelize";
import { env } from "../../validate.env.js";

export const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USERNAME,
  env.DB_PASSWORD,
  {
    dialect: "postgres"
  }
);
export const connectToPG = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to DB ");
  } catch (e) {
    console.log("error: ", e);

  }
}
import { Sequelize } from "sequelize";
import pg from "pg";
const sequelize = new Sequelize(
  "postgres://postgres:1907@localhost:5432/project",
  {
    logging: false, //reducing console logs, set to true for debugging
    dialectModule: pg,
  },
);

// iife to test the connection and sync the models
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default sequelize;

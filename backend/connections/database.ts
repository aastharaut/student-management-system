import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgres://postgres:1907@localhost:5432/project",
);
//iffe to test the connection and sync the models
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default sequelize;

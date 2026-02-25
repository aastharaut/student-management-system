import { Sequelize } from "sequelize";

// Option 1: Passing a connection URI
const sequelize = new Sequelize(
  "postgres://postgres:1907@localhost:5432/project",
); // Example for postgres

export const checkDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true, force: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
checkDatabaseConnection();
export default sequelize;

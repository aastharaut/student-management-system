const { Sequelize } = require("sequelize");

// Option 1: Passing a connection URI
const sequelize = new Sequelize(
  "postgres://postgres:1907@localhost:5432/postgres",
); // Example for postgres

const checkDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export default sequelize;

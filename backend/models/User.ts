const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "teacher", "viewer"),
      defaultValue: "viewer",
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
  },
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

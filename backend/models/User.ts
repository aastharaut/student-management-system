import { DataTypes } from "sequelize";
import sequelize from "../connections/database";
import { ROLES } from "../constants/role";
import bcrypt from "bcrypt";
import { STATUS } from "../constants/status";

const User = sequelize.define(
  "User",
  {
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
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(ROLES.ADMIN, ROLES.STUDENT),
      defaultValue: ROLES.ADMIN,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(STATUS.ACTIVE, STATUS.INACTIVE, STATUS.REJECTED),
      defaultValue: STATUS.INACTIVE, //login bhayesi inactive hunxa, admin le active garna parxa
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
  },
);

export default User;

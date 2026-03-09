import { DataTypes } from "sequelize";
import sequelize from "../connections/database";
import { ROLES } from "../constants/role";

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
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 10,
        max: 100,
      },
    },
    course: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    profilePicture: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "profile_picture",
    },
    role: {
      type: DataTypes.ENUM(ROLES.ADMIN, ROLES.STUDENT),
      defaultValue: ROLES.ADMIN,
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

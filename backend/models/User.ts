import { DataTypes } from "sequelize";
import sequelize from "../connections/database";
import bcrypt from "bcrypt";

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
      set(value: string) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hash);
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 10, max: 100 },
    },
    course: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { notEmpty: true },
    },
    profilePicture: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "profile_picture",
    },
    roles: {
      type: DataTypes.STRING, // simple string
      allowNull: false,
      defaultValue: "student", // every created user defaults to student
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
  },
);

export default User;

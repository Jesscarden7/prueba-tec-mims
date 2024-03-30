import { DataTypes } from "sequelize";
import { sequelize } from "../connection";
import { Loan } from "./Loan";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
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
  },
  {
    timestamps: true,
  },
);

User.hasMany(Loan, {
  foreignKey: "userId",
  sourceKey: "id",
});

Loan.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

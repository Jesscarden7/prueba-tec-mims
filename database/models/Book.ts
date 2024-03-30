import { DataTypes } from "sequelize";
import { sequelize } from "../conection";
import { Loan } from "./Loan";

export const Book = sequelize.define(
  "book",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicationYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

Book.hasMany(Loan, {
  foreignKey: "bookId",
  sourceKey: "id",
});

Loan.belongsTo(Book, {
  foreignKey: "bookId",
  targetKey: "id",
});

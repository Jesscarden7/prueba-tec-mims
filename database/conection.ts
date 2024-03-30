import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "library_db_a627",
  "jesscarden",
  "spItSwEBMDzxgNVTPgAgYHVwpyCeniIq",
  {
    host: "dpg-co42cja1hbls73bodqag-a.oregon-postgres.render.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
    },
  },
);

import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const databaseUrl = process.env.DB_URL || "";

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  schema: "public",
  logging: false,
  dialectOptions: {
    connectTimeout: 10000,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    schema: "public",
    timestamps: true,
  },
});

export default sequelize;
import sequelize from "./config/sequelize.js";

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection authenticated");
    
    await sequelize.sync({ alter: true });
    console.log("Base de datos sincronizada");
  } catch (error) {
    console.error("Error inicializando base de datos:", error);
    // Continue server startup even if DB connection fails
    // This allows for graceful degradation
  }
};

initializeDatabase();
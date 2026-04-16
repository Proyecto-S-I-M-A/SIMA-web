import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./config/sequelize.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const initializeServer = async () => {
  try {
    // Authenticate and sync database before starting server
    await sequelize.authenticate();
    console.log("✓ Database connection authenticated");

    await sequelize.sync({ alter: true, schema: "public" });
    console.log("✓ Database synchronized on schema: public");

    // Start server after DB is ready
    const server = app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT} [${process.env.NODE_ENV || "development"}]`
      );
    });

    // Graceful shutdown
    const shutdown = (signal: string) => {
      console.log(`\nReceived ${signal}. Closing HTTP server…`);
      server.close(() => {
        console.log("HTTP server closed.");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
};

initializeServer();

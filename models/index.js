const sequelize = require("../config/database");
const Category = require("./category");
const Product = require("./product");

const syncDatabase = async () => {
  try {
    console.log("Attempting to connect to the database...");
    await sequelize.authenticate(); // ✅ Check if DB is connected
    console.log("Database connection successful!");

    await sequelize.sync({ force: false }); // ✅ Ensure tables are created
    console.log("Database & tables synced successfully!");
  } catch (error) {
    console.error("Database sync failed:", error);
    process.exit(1); // ❌ Exit if database connection fails
  }
};

module.exports = { sequelize, syncDatabase, Category, Product };

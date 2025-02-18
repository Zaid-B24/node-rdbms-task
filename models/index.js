const sequelize = require("../config/database");
const Category = require("./category");
const Product = require("./product");

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Database sync failed:", error);
  }
};

module.exports = { sequelize, syncDatabase, Category, Product };

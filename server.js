const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { syncDatabase } = require("./models/index");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception. Server shutting down...", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1); // ✅ Prevent undefined behavior
});

app.get("/", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const startServer = async () => {
  try {
    await syncDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database sync failed", error);
  }
};

startServer();

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { syncDatabase } = require("./models/index");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

app.get("/", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

// app.use((req, res, next) => {
//   res.status(404).json({ error: "Route not found" });
// });

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ error: "Internal server error" });
// });

const startServer = async () => {
  try {
    await syncDatabase();
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error("Database sync failed", error);
    process.exit(1);
  }
};

startServer();

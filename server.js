const express = require("express");
const cors = require("cors");
const { syncDatabase } = require("./models/index");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

syncDatabase();

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

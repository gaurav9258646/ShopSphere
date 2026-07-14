const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const productImageRoutes = require("./routes/productImage.routes");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);
// Authentication Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/product-images", productImageRoutes);


module.exports = app;
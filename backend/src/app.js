const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ShopSphere API Running Successfully",
    });
});

// Authentication Routes
app.use("/auth", authRoutes);

module.exports = app;
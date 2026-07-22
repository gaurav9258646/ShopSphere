const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");

const {
    getDashboardStats,
} = require("../controllers/dashboard.controller");

router.get(
    "/",
    authMiddleware,
    isAdmin,
    getDashboardStats
);

module.exports = router;
const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");

const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
} = require("../controllers/order.controller");



router.get(
    "/",
    authMiddleware,
    isAdmin,
    getAllOrders
);


router.get(
    "/:id",
    authMiddleware,
    isAdmin,
    getOrderById
);


router.post(
    "/",
    authMiddleware,
    createOrder
);


router.put(
    "/:id/status",
    authMiddleware,
    isAdmin,
    updateOrderStatus
);



router.delete(
    "/:id",
    authMiddleware,
    isAdmin,
    deleteOrder
);

module.exports = router;
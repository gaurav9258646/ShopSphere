const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware");

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
} = require("../controllers/product.controller");


router.get("/", getAllProducts);

// Search Products
router.get("/search", searchProducts);

// Get Product By ID
router.get("/:id", getProductById);

/**
 * Admin Routes
 */

// Create Product with Image Upload
router.post(
    "/",
    authMiddleware,
    isAdmin,
    upload.single("thumbnail"),
    createProduct
);

// Update Product
router.put(
    "/:id",
    authMiddleware,
    isAdmin,
    upload.single("thumbnail"),
    updateProduct
);

// Delete Product
router.delete(
    "/:id",
    authMiddleware,
    isAdmin,
    deleteProduct
);

module.exports = router;
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


router.get("/search", searchProducts);


router.get("/:id", getProductById);

router.post(
    "/",
    authMiddleware,
    isAdmin,
    upload.array("images", 5),
    createProduct
);

router.put(
    "/:id",
    authMiddleware,
    isAdmin,
    upload.array("images", 5),
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
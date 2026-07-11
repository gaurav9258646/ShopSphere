const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
    isAdmin,
} = require("../middleware/role.middleware");

const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require("../controllers/category.controller");


router.get("/", getAllCategories);

router.get("/:id", getCategoryById);

router.post(
    "/",
    authMiddleware,
    isAdmin,
    createCategory
);

// Update Category
router.put(
    "/:id",
    authMiddleware,
    isAdmin,
    updateCategory
);
 
// Delete Category
router.delete(
    "/:id",
    authMiddleware,
    isAdmin,
    deleteCategory
);

module.exports = router;
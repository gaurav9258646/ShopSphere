const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware");

const {
    uploadProductImages,
    getProductImages,
    deleteProductImage,
} = require("../controllers/productImage.controller");


router.post(
    "/:id",
    authMiddleware,
    isAdmin,
    upload.array("images", 5),
    uploadProductImages
);

router.get("/:id", getProductImages);


router.delete(
    "/:imageId",
    authMiddleware,
    isAdmin,
    deleteProductImage
);

module.exports = router;
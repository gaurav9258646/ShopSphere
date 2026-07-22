const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
    isAdmin,
    isUser,
} = require("../middleware/role.middleware");

const {
    getProfile,
    updateProfile,
    getAllUsers,
    deleteUser,
    updateUserStatus,
} = require("../controllers/user.controller");



router.get(
    "/profile",
    authMiddleware,
    isUser,
    getProfile
);

// Update Profile
router.put(
    "/profile",
    authMiddleware,
    isUser,
    updateProfile
);


router.get(
    "/",
    authMiddleware,
    isAdmin,
    getAllUsers
);

// Delete User
router.delete(
    "/:id",
    authMiddleware,
    isAdmin,
    deleteUser
);
router.put(
    "/:id/status",
    authMiddleware,
    isAdmin,
    updateUserStatus
);

module.exports = router;
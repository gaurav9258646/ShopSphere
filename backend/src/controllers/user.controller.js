const {
    getProfileService,
    updateProfileService,
    getAllUsersService,
    deleteUserService,
} = require("../services/user.service");


const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await getProfileService(userId);

        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const { name, email } = req.body;

        const updatedUser = await updateProfileService(userId, {
            name,
            email,
        });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersService();

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteUserService(id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    getAllUsers,
    deleteUser,
};
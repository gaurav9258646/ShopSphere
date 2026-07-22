const User = require("../models/user.model");


const getProfileService = async (userId) => {
    const user = await User.findUserById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};


const updateProfileService = async (userId, userData) => {

    const user = await User.findUserById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    await User.updateUser(userId, {
        name: userData.name,
        email: userData.email,
    });

    const updatedUser = await User.findUserById(userId);

    return updatedUser;
};


const getAllUsersService = async () => {

    const users = await User.getAllUsers();

    return users;
};

const deleteUserService = async (userId) =>{

    const user = await User.findUserById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    await User.deleteUser(userId);

    return true;
};
const updateUserStatusService = async (
    id,
    status
) => {

    const user = await User.findUserById(id);

    if (!user) {
        throw new Error("User not found");
    }

    await User.updateUserStatus(
        id,
        status
    );

    return await User.findUserById(id);

};

module.exports = {
    getProfileService,
    updateProfileService,
    getAllUsersService,
    deleteUserService,
    updateUserStatusService,
};
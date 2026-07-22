const User = require("../models/user.model");


const getProfileService = async (id) => {

    const user = await User.findUserById(id);

    if (!user) {
        throw new Error("User not found");
    }

    return user;

};



const updateProfileService = async (id, data) => {

    const user = await User.findUserById(id);

    if (!user) {
        throw new Error("User not found");
    }

    await User.updateUser(id, data);

    return await User.findUserById(id);

};



const getAllUsersService = async () => {

    return await User.getAllUsers();

};

const getUserByIdService = async (id) => {

    const user = await User.findUserById(id);

    if (!user) {
        throw new Error("User not found");
    }

    return user;

};


const updateUserService = async (id, data) => {

    const user = await User.findUserById(id);

    if (!user) {
        throw new Error("User not found");
    }

    await User.updateUser(id, data);

    return await User.findUserById(id);

};



const deleteUserService = async (id) => {

    const user = await User.findUserById(id);

    if (!user) {
        throw new Error("User not found");
    }

    await User.deleteUser(id);

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

    await User.updateUserStatus(id, status);

    return await User.findUserById(id);

};

module.exports = {
    getProfileService,
    updateProfileService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
    updateUserStatusService,
};
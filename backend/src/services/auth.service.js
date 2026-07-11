const bcrypt = require("bcrypt");
const User = require("../models/user.model");


const registerService = async ({ name, email, password, role }) => {
    const existingUser = await User.findUserByEmail(email);

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await User.createUser({
        name,
        email,
        password: hashedPassword,
        role: role || "user",
    });

    return {
        id: userId,
        name,
        email,
        role: role || "user",
    };
};

const loginService = async ({ email, password }) => {
    try {
        const user = await User.findUserByEmail(email);

        if (!user) {
            throw new Error("Invalid Email");
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            throw new Error("Invalid Password");
        }

        return user;
    } catch (error) {
        throw error;
    }
};


const logoutService = async () => {
    return {
        success: true,
        message: "Logout successful",
    };
};

module.exports = {
    registerService,
    loginService,
    logoutService,
};
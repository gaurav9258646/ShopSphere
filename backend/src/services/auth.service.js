const bcrypt = require("bcrypt");
const User = require("./../models/user.model");

const registerService = async ({ name, email, password }) => {

    const existingUser = await User.findUserByEmail(email);

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await User.createUser({
        name,
        email,
        password: hashedPassword,
    });

    return {
        id: userId,
        name,
        email,
    };
};

const loginService = async ({ email, password }) => {

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
};

module.exports = {
    registerService,
    loginService,
};
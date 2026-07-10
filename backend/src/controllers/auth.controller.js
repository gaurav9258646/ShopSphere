const jwt = require("jsonwebtoken");

const {
    registerService,
    loginService,
} = require("../services/auth.service");

const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });

        }

        const user = await registerService({
            name,
            email,
            password,
        });

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });

        }

        const user = await loginService({
            email,
            password,
        });

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    register,
    login,
};
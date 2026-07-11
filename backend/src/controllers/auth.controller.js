const jwt = require("jsonwebtoken");

const {
    registerService,
    loginService,
    logoutService,
} = require("../services/auth.service");


const register = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        const user = await registerService({
            name,
            email,
            password,
            role,
        });

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user,
        });

    } catch (error) {
        return res.status(400).json({
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

        return res.status(200).json({
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
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};


const logout = async (req, res) => {
    try {
        const response = await logoutService();

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    register,
    login,
    logout,
};
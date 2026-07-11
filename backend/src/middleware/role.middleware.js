
const isAdmin = (req, res, next) => {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access Denied. Admin Only",
            });
        }

        next();

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

const isUser = (req, res, next) => {
    try {

        if (req.user.role !== "user") {
            return res.status(403).json({
                success: false,
                message: "Access Denied. User Only",
            });
        }

        next();

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

module.exports = {
    isAdmin,
    isUser,
};
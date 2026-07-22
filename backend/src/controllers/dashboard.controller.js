const {
    getDashboardStatsService,
} = require("../services/dashboard.service");


const getDashboardStats = async (req, res) => {

    try {

        const stats = await getDashboardStatsService();

        return res.status(200).json({
            success: true,
            data: stats,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    getDashboardStats,
};
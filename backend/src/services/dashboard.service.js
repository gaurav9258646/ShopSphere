const Dashboard = require("../models/dashboard.model");



const getDashboardStatsService = async () => {

    const products = await Dashboard.getTotalProducts();

    const categories = await Dashboard.getTotalCategories();

    const orders = await Dashboard.getTotalOrders();

    const users = await Dashboard.getTotalUsers();

    return {
        products,
        categories,
        orders,
        users,
    };

};

module.exports = {
    getDashboardStatsService,
};
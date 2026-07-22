const db = require("../config/db");



const getTotalProducts = async () => {

    const [rows] = await db.execute(`
    SELECT COUNT(*) AS total
    FROM products
  `);

    return rows[0].total;

};


const getTotalCategories = async () => {

    const [rows] = await db.execute(`
    SELECT COUNT(*) AS total
    FROM categories
  `);

    return rows[0].total;

};



const getTotalOrders = async () => {

    const [rows] = await db.execute(`
    SELECT COUNT(*) AS total
    FROM orders
  `);

    return rows[0].total;

};


const getTotalUsers = async () => {

    const [rows] = await db.execute(`
    SELECT COUNT(*) AS total
    FROM users
  `);

    return rows[0].total;

};

module.exports = {
    getTotalProducts,
    getTotalCategories,
    getTotalOrders,
    getTotalUsers,
};
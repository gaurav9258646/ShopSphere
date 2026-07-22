const db = require("../config/db");



const createOrder = async (orderData) => {

    const {
        user_id,
        order_number,
        total_amount,
        payment_method,
        payment_status,
        order_status,
        shipping_address,
    } = orderData;

    const sql = `
    INSERT INTO orders (
      user_id,
      order_number,
      total_amount,
      payment_method,
      payment_status,
      order_status,
      shipping_address
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [
        user_id,
        order_number,
        total_amount,
        payment_method,
        payment_status,
        order_status,
        shipping_address,
    ];

    const [result] = await db.execute(sql, values);

    return result.insertId;
};



const getAllOrders = async () => {

    const sql = `
    SELECT
      o.*,
      u.name AS customer_name,
      u.email
    FROM orders o
    INNER JOIN users u
      ON o.user_id = u.id
    ORDER BY o.id DESC
  `;

    const [rows] = await db.query(sql);

    return rows;
};



const findOrderById = async (id) => {

    const [rows] = await db.execute(
        "SELECT * FROM orders WHERE id = ? LIMIT 1",
        [id]
    );

    return rows.length ? rows[0] : null;
};



const updateOrderStatus = async (
    id,
    order_status
) => {

    const sql = `
    UPDATE orders
    SET order_status = ?
    WHERE id = ?
  `;

    const [result] = await db.execute(sql, [
        order_status,
        id,
    ]);

    return result;
};

const deleteOrder = async (id) => {

    const [result] = await db.execute(
        "DELETE FROM orders WHERE id = ?",
        [id]
    );

    return result;
};

module.exports = {
    createOrder,
    getAllOrders,
    findOrderById,
    updateOrderStatus,
    deleteOrder,
};
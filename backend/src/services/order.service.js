const Order = require("../models/order.model");


const createOrderService = async (orderData) => {

    const orderId = await Order.createOrder(orderData);

    return await Order.findOrderById(orderId);

};



const getAllOrdersService = async () => {

    return await Order.getAllOrders();

};



const getOrderByIdService = async (id) => {

    const order = await Order.findOrderById(id);

    if (!order) {
        throw new Error("Order not found");
    }

    return order;

};



const updateOrderStatusService = async (
    id,
    order_status
) => {

    const order = await Order.findOrderById(id);

    if (!order) {
        throw new Error("Order not found");
    }

    await Order.updateOrderStatus(
        id,
        order_status
    );

    return await Order.findOrderById(id);

};



const deleteOrderService = async (id) => {

    const order = await Order.findOrderById(id);

    if (!order) {
        throw new Error("Order not found");
    }

    await Order.deleteOrder(id);

    return true;

};

module.exports = {
    createOrderService,
    getAllOrdersService,
    getOrderByIdService,
    updateOrderStatusService,
    deleteOrderService,
};
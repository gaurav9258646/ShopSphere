const {
    createOrderService,
    getAllOrdersService,
    getOrderByIdService,
    updateOrderStatusService,
    deleteOrderService,
} = require("../services/order.service");



const createOrder = async (req, res) => {

    try {

        const {
            user_id,
            order_number,
            total_amount,
            payment_method,
            payment_status,
            order_status,
            shipping_address,
        } = req.body;

        if (
            !user_id ||
            !order_number ||
            !total_amount ||
            !shipping_address
        ) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing",
            });
        }

        const order = await createOrderService({
            user_id,
            order_number,
            total_amount,
            payment_method,
            payment_status,
            order_status,
            shipping_address,
        });

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};



const getAllOrders = async (req, res) => {

    try {

        const orders = await getAllOrdersService();

        return res.status(200).json({
            success: true,
            count: orders.length,
            data: orders,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


const getOrderById = async (req, res) => {

    try {

        const { id } = req.params;

        const order = await getOrderByIdService(id);

        return res.status(200).json({
            success: true,
            data: order,
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message,
        });

    }

};



const updateOrderStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { order_status } = req.body;

        const order = await updateOrderStatusService(
            id,
            order_status
        );

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};


const deleteOrder = async (req, res) => {

    try {

        const { id } = req.params;

        await deleteOrderService(id);

        return res.status(200).json({
            success: true,
            message: "Order deleted successfully",
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
};
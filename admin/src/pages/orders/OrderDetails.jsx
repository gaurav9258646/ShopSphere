import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  getOrderById,
  updateOrderStatus,
} from "../../services/order.service";

const OrderDetails = () => {

  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [order, setOrder] = useState(null);

 

  const fetchOrder = async () => {

    try {

      const response = await getOrderById(id);

      if (response.success) {

        setOrder(response.data);

      }

    } catch (error) {

      toast.error("Order not found");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchOrder();

  }, []);

  

  const handleStatusChange = async (e) => {

    try {

      setSaving(true);

      const response = await updateOrderStatus(
        id,
        e.target.value
      );

      if (response.success) {

        toast.success("Order Status Updated");

        fetchOrder();

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Update Failed"
      );

    } finally {

      setSaving(false);

    }

  };

  if (loading) {

    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-semibold">
          Loading Order...
        </h1>
      </div>
    );

  }

  if (!order) {

    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-semibold text-red-500">
          Order Not Found
        </h1>
      </div>
    );

  }
    return (

    <div className="max-w-6xl mx-auto p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Order Details
          </h1>

          <p className="text-gray-500 mt-1">
            Order #{order.order_number}
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-xl font-semibold mb-4">
            Customer Information  
          </h2>

          <div className="space-y-3">

            <div>

              <p className="text-gray-500">
                Customer Name
              </p>

              <p className="font-semibold">
                {order.customer_name}
              </p>

            </div>

            <div>

              <p className="text-gray-500">
                Email
              </p>

              <p className="font-semibold">
                {order.email || "N/A"}
              </p>

            </div>

            <div>

              <p className="text-gray-500">
                User ID
              </p>

              <p className="font-semibold">
                {order.user_id}
              </p>

            </div>

          </div>

        </div>

        {/* Order Information */}

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-xl font-semibold mb-4">
            Order Information
          </h2>

          <div className="space-y-3">

            <div>

              <p className="text-gray-500">
                Order Number
              </p>

              <p className="font-semibold">
                {order.order_number}
              </p>

            </div>

            <div>

              <p className="text-gray-500">
                Total Amount
              </p>

              <p className="text-2xl font-bold text-green-600">
                ₹ {order.total_amount}
              </p>

            </div>

            <div>

              <p className="text-gray-500">
                Payment Method
              </p>

              <p className="font-semibold">
                {order.payment_method}
              </p>

            </div>

          </div>

        </div>
                {/* Payment Status */}

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-xl font-semibold mb-4">
            Payment Status
          </h2>

          <span
            className={`inline-block px-4 py-2 rounded-full text-white font-semibold

              ${
                order.payment_status === "Paid"
                  ? "bg-green-500"
                  : order.payment_status === "Pending"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }

            `}
          >
            {order.payment_status}
          </span>

        </div>

        {/* Shipping Address */}

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-xl font-semibold mb-4">
            Shipping Address
          </h2>

          <p className="text-gray-700 leading-7">
            {order.shipping_address}
          </p>

        </div>

        {/* Order Status */}

        <div className="lg:col-span-2 bg-white shadow rounded-xl p-6">

          <h2 className="text-xl font-semibold mb-4">
            Update Order Status
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <select
              value={order.order_status}
              onChange={handleStatusChange}
              disabled={saving}
              className="border rounded-lg p-3 w-full md:w-72"
            >

              <option value="Pending">
                Pending
              </option>

              <option value="Processing">
                Processing
              </option>

              <option value="Shipped">
                Shipped
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

            <span
              className={`px-4 py-3 rounded-lg text-white font-semibold text-center

                ${
                  order.order_status === "Pending"
                    ? "bg-yellow-500"
                    : order.order_status === "Processing"
                    ? "bg-blue-500"
                    : order.order_status === "Shipped"
                    ? "bg-purple-500"
                    : order.order_status === "Delivered"
                    ? "bg-green-500"
                    : "bg-red-500"
                }

              `}
            >
              {saving
                ? "Updating..."
                : order.order_status}
            </span>

          </div>

        </div>
                {/* Action Buttons */}

        <div className="lg:col-span-2 flex flex-wrap gap-4 mt-2">

          <button
            type="button"
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            🖨️ Print Invoice
          </button>

          <button
            type="button"
            onClick={() =>
              toast("PDF Download feature coming soon")
            }
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
          >
            📄 Download Invoice
          </button>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition"
          >
            ← Back
          </button>

        </div>

      </div>

    </div>

  );

};

export default OrderDetails;
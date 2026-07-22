import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  getOrders,
  deleteOrder,
} from "../../services/order.service";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  // Search
  const [search, setSearch] = useState("");

  // Status Filter
  const [statusFilter, setStatusFilter] = useState("All");

  // ==========================
  // Fetch Orders
  // ==========================

  const fetchOrders = async () => {

    try {

      const response = await getOrders();

      if (response.success) {
        setOrders(response.data);
      }

    } catch (error) {

      toast.error("Failed to load orders");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchOrders();

  }, []);

  // ==========================
  // Delete Order
  // ==========================

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this order?")) {
      return;
    }

    try {

      const response = await deleteOrder(id);

      if (response.success) {

        toast.success(response.message);

        fetchOrders();

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );

    }

  };
    // ==========================
  // Filter Orders
  // ==========================

  const filteredOrders = orders.filter((order) => {

    const matchSearch =
      order.order_number
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      order.customer_name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" ||
      order.order_status === statusFilter;

    return matchSearch && matchStatus;

  });

  // ==========================
  // Loading
  // ==========================

  if (loading) {

    return (
      <div className="text-center py-20">
        Loading Orders...
      </div>
    );

  }

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Orders
        </h2>

      </div>

      {/* Search + Filter */}

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

        <input
          type="text"
          placeholder="Search Order..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3 md:w-80"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg p-3"
        >

          <option value="All">
            All Status
          </option>

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

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3 text-left">
                Order No.
              </th>

              <th className="p-3 text-left">
                Customer
              </th>

              <th className="p-3 text-left">
                Amount
              </th>

              <th className="p-3 text-left">
                Payment
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.length > 0 ? (
                              filteredOrders.map((order) => (

                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">
                    {order.order_number}
                  </td>

                  <td className="p-3">
                    {order.customer_name}
                  </td>

                  <td className="p-3 font-semibold">
                    ₹ {order.total_amount}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white

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

                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white

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
                      {order.order_status}
                    </span>

                  </td>

                  <td className="p-3">

                    <div className="flex justify-center gap-2">

                      <Link
                        to={`/orders/${order.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                      >
                        View
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(order.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))
                          ) : (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No Orders Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Orders;
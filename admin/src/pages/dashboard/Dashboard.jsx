import {
  FaUsers,
  FaBoxOpen,
  FaList,
  FaShoppingCart,
} from "react-icons/fa";

import StatCard from "../dashboard/StatCard";

const Dashboard = () => {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Users"
          value="120"
          icon={<FaUsers />}
          color="bg-blue-600"
        />

        <StatCard
          title="Products"
          value="85"
          icon={<FaBoxOpen />}
          color="bg-green-600"
        />

        <StatCard
          title="Categories"
          value="12"
          icon={<FaList />}
          color="bg-purple-600"
        />

        <StatCard
          title="Orders"
          value="45"
          icon={<FaShoppingCart />}
          color="bg-orange-500"
        />

      </div>

      {/* Recent Orders */}

      <div className="mt-10 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Recent Orders
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Order ID</th>

              <th className="text-left">Customer</th>

              <th className="text-left">Amount</th>

              <th className="text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b">

              <td className="py-3">#1001</td>

              <td>Rahul</td>

              <td>₹12,500</td>

              <td>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Delivered
                </span>
              </td>

            </tr>

            <tr className="border-b">

              <td className="py-3">#1002</td>

              <td>Gaurav</td>

              <td>₹6,999</td>

              <td>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                  Pending
                </span>
              </td>

            </tr>

            <tr>

              <td className="py-3">#1003</td>

              <td>Aman</td>

              <td>₹2,499</td>

              <td>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  Shipped
                </span>
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Dashboard;
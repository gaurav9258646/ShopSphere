import { useEffect, useState } from "react";

import StatCard from "../../pages/dashboard/StatCard";

import { getDashboardStats } from "../../services/dashboard.service";

const Dashboard = () => {

  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    users: 0,
  });

  const [loading, setLoading] = useState(true);

  // ==========================
  // Fetch Dashboard Data
  // ==========================

  const fetchDashboard = async () => {

    try {

      const response = await getDashboardStats();

      if (response.success) {
        setStats(response.data);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchDashboard();

  }, []);

  if (loading) {

    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-semibold">
          Loading Dashboard...
        </h1>
      </div>
    );

  }

  return (

    <div className="p-6">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to ShopSphere Admin Panel
        </p>

      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Products"
          value={stats.products}
          color="bg-blue-500"
        />

        <StatCard
          title="Categories"
          value={stats.categories}
          color="bg-green-500"
        />

        <StatCard
          title="Orders"
          value={stats.orders}
          color="bg-orange-500"
        />

        <StatCard
          title="Users"
          value={stats.users}
          color="bg-purple-500"
        />

      </div>

      {/* Latest Products */}

      <div className="mt-10 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Latest Products
        </h2>

        <p className="text-gray-500">
          Coming Soon...
        </p>

      </div>

      {/* Latest Orders */}

      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Latest Orders
        </h2>

        <p className="text-gray-500">
          Coming Soon...
        </p>

      </div>

    </div>

  );

};

export default Dashboard;
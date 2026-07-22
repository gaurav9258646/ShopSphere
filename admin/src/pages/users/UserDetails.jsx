import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getUserById } from "../../services/user.service";

const UserDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  // ==========================
  // Fetch User
  // ==========================

  const fetchUser = async () => {

    try {

      const response = await getUserById(id);

      if (response.success) {

        setUser(response.data);

      }

    } catch (error) {

      toast.error("User not found");

      navigate("/users");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchUser();

  }, []);

  if (loading) {

    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-semibold">
          Loading User...
        </h1>
      </div>
    );

  }

  if (!user) {

    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-semibold text-red-500">
          User Not Found
        </h1>
      </div>
    );


  }
    return (

    <div className="max-w-5xl mx-auto p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            User Details
          </h1>

          <p className="text-gray-500 mt-1">
            User ID : {user.id}
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* User Profile */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            User Profile
          </h2>

          <div className="space-y-4">

            <div>

              <p className="text-gray-500">
                Full Name
              </p>

              <p className="font-semibold text-lg">
                {user.name}
              </p>

            </div>

            <div>

              <p className="text-gray-500">
                Email Address
              </p>

              <p className="font-semibold">
                {user.email}
              </p>

            </div>

            <div>

              <p className="text-gray-500">
                Role
              </p>

              <span
                className={`inline-block px-3 py-1 rounded-full text-white text-sm

                  ${
                    user.role === "admin"
                      ? "bg-purple-600"
                      : "bg-blue-600"
                  }

                `}
              >
                {user.role}
              </span>

            </div>

          </div>

        </div>

        {/* Account Information */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Account Information
          </h2>

          <div className="space-y-4">

            <div>

              <p className="text-gray-500">
                Account Status
              </p>

              <span
                className={`inline-block px-3 py-1 rounded-full text-white text-sm

                  ${
                    user.status === "blocked"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }

                `}
              >
                {user.status || "active"}
              </span>

            </div>

            <div>

              <p className="text-gray-500">
                Joined On
              </p>

              <p className="font-semibold">
                {user.created_at}
              </p>

            </div>

          </div>

        </div>
                {/* Action Buttons */}

        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <Link
              to={`/users/edit/${user.id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition"
            >
              ✏️ Edit User
            </Link>

            <button
              type="button"
              onClick={() => navigate("/users")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition"
            >
              ← Back to Users
            </button>

            <button
              type="button"
              onClick={() =>
                toast("Delete feature available from Users List")
              }
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
            >
              🗑️ Delete User
            </button>

          </div>


        </div>
              </div>

    </div>

  );

};

export default UserDetails;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  getUsers,
  deleteUser,
  updateUserStatus,
} from "../../services/user.service";

const Users = () => {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");



  const fetchUsers = async () => {

    try {

      const response = await getUsers();

      if (response.success) {

        setUsers(response.data);

      }

    } catch (error) {

      toast.error("Failed to load users");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchUsers();

  }, []);




  const handleDelete = async (id) => {

    if (!window.confirm("Delete this user?")) {
      return;
    }

    try {

      const response = await deleteUser(id);

      if (response.success) {

        toast.success(response.message);

        fetchUsers();

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete Failed"
      );

    }

  };


  const handleStatus = async (
    id,
    status
  ) => {

    try {

      const response =
        await updateUserStatus(
          id,
          status
        );

      if (response.success) {

        toast.success(response.message);

        fetchUsers();

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Status Update Failed"
      );

    }

  };


  const filteredUsers = users.filter((user) => {

    return (
      user.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      user.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  });



  if (loading) {

    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-semibold">
          Loading Users...
        </h1>
      </div>
    );

  }

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

        <h2 className="text-3xl font-bold">
          Users
        </h2>

        <input
          type="text"
          placeholder="Search User..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg p-3 w-full md:w-80"
        />

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Email
              </th>

              <th className="p-3 text-left">
                Role
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.length > 0 ? (
                              filteredUsers.map((user) => (

                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3 font-medium">
                    {user.name}
                  </td>

                  <td className="p-3">
                    {user.email}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm

                        ${
                          user.role === "admin"
                            ? "bg-purple-600"
                            : "bg-blue-600"
                        }

                      `}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm

                        ${
                          user.status === "blocked"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }

                      `}
                    >
                      {user.status || "active"}
                    </span>

                  </td>

                  <td className="p-3">

                    <div className="flex justify-center gap-2">

                      <Link
                        to={`/users/${user.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                      >
                        View
                      </Link>

                      <Link
                        to={`/users/edit/${user.id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleStatus(
                            user.id,
                            user.status === "blocked"
                              ? "active"
                              : "blocked"
                          )
                        }
                        className={`px-3 py-2 rounded text-white

                          ${
                            user.status === "blocked"
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-orange-500 hover:bg-orange-600"
                          }

                        `}
                      >
                        {user.status === "blocked"
                          ? "Unblock"
                          : "Block"}
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(user.id)
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
                  colSpan="5"
                  className="text-center py-8 text-gray-500"
                >
                  No Users Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Users;
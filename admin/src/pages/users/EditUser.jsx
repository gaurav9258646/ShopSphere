import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  getUserById,
  updateUser,
} from "../../services/user.service";

const EditUser = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });



  const fetchUser = async () => {

    try {

      const response = await getUserById(id);

      if (response.success) {

        const user = response.data;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          role: user.role || "user",
          status: user.status || "active",
        });

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

  // ==========================
  // Handle Input
  // ==========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };
    // ==========================
  // Update User
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Name is required");
    }

    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }

    try {

      setSaving(true);

      const response = await updateUser(
        id,
        formData
      );

      if (response.success) {

        toast.success("User updated successfully");

        navigate("/users");

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Update failed"
      );

    } finally {

      setSaving(false);

    }

  };

  // ==========================
  // Loading
  // ==========================

  if (loading) {

    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-semibold">
          Loading User...
        </h1>
      </div>
    );

  }

  return (

    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">

      <h1 className="text-3xl font-bold mb-8">
        Edit User
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >        {/* Name */}

        <div>

          <label className="block mb-2 font-medium">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Full Name"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Email */}

        <div>

          <label className="block mb-2 font-medium">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Role */}

        <div>

          <label className="block mb-2 font-medium">
            Role
          </label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="user">
              User
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

        </div>

        {/* Status */}

        <div>

          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="active">
              Active
            </option>

            <option value="blocked">
              Blocked
            </option>

          </select>

        </div></form>
                {/* Action Buttons */}

        <div className="flex gap-4 pt-4">

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/users")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition"
          >
            Cancel
          </button>

        </div>


    </div>

  );

};

export default EditUser;
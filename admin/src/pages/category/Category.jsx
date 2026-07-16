import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  getCategories,
  deleteCategory,
} from "../../services/category.service";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await getCategories();

      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch categories"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete Category
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteCategory(id);

      if (response.success) {
        toast.success("Category Deleted Successfully");
        fetchCategories();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  const filteredCategories = categories.filter((category) => {
    return (
      category.name.toLowerCase().includes(search.toLowerCase()) ||
      category.slug.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (loading) {
    return (
      <h2 className="text-xl font-semibold">
        Loading...
      </h2>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Categories
        </h2>

        <Link
          to="/categories/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Category
        </Link>

      </div>

      <div className="mb-5">
        <input
          type="text"
          placeholder="Search Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <table className="w-full border border-gray-300">

        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">ID</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Slug</th>
            <th className="border p-3">Description</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredCategories.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center py-6"
              >
                No Categories Found
              </td>
            </tr>
          ) : (
            filteredCategories.map((category) => (
              <tr key={category.id}>

                <td className="border p-3">
                  {category.id}
                </td>

                <td className="border p-3">
                  {category.name}
                </td>

                <td className="border p-3">
                  {category.slug}
                </td>

                <td className="border p-3">
                  {category.description}
                </td>

                <td className="border p-3">

                  <Link
                    to={`/categories/edit/${category.id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
};

export default Category;
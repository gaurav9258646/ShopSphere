import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  getCategoryById,
  updateCategory,
} from "../../services/category.service";

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  // Load Category
  const fetchCategory = async () => {
    try {
      const response = await getCategoryById(id);

      if (response.success) {
        setFormData({
          name: response.data.name,
          slug: response.data.slug,
          description: response.data.description || "",
        });
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Category not found"
      );

      navigate("/categories");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      return toast.error("Category Name is required");
    }

    try {
      setLoading(true);

      const response = await updateCategory(
        id,
        formData
      );

      if (response.success) {
        toast.success("Category Updated");

        navigate("/categories");
      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Update Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

      <h2 className="text-3xl font-bold mb-6">
        Edit Category
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-5">

          <label>Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

        <div className="mb-5">

          <label>Slug</label>

          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

        <div className="mb-5">

          <label>Description</label>

          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

        <div className="flex gap-4">

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {loading ? "Updating..." : "Update Category"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/categories")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
};

export default EditCategory;
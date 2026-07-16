import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createCategory } from "../../services/category.service";

const AddCategory = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  // Auto Generate Slug
  const handleNameChange = (e) => {
    const name = e.target.value;

    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      return toast.error("Category Name is required");
    }

    try {
      setLoading(true);

      const response = await createCategory(formData);

      if (response.success) {
        toast.success(response.message || "Category Created");

        navigate("/categories");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

      <h2 className="text-3xl font-bold mb-6">
        Add Category
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-5">
          <label className="block font-medium mb-2">
            Category Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleNameChange}
            placeholder="Enter Category Name"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="mb-5">
          <label className="block font-medium mb-2">
            Slug
          </label>

          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="category-slug"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="mb-5">
          <label className="block font-medium mb-2">
            Description
          </label>

          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description"
            className="w-full border rounded-lg p-3"
          />
        </div>
        <div className="flex gap-4">

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {loading ? "Saving..." : "Save Category"}
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

export default AddCategory;
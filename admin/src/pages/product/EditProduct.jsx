import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getCategories } from "../../services/category.service";

import {
  getProductById,
  updateProduct,
} from "../../services/product.service";

const EditProduct = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [categories, setCategories] = useState([]);

  const [existingImages, setExistingImages] = useState([]);

  const [images, setImages] = useState([]);

  const [previewImages, setPreviewImages] = useState([]);

  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    slug: "",
    description: "",
    sku: "",
    price: "",
    discount_price: "",
    stock: "",
    status: "active",
  });

  // ===========================
  // Fetch Categories
  // ===========================

  const fetchCategories = async () => {

    try {

      const response = await getCategories();

      if (response.success) {
        setCategories(response.data);
      }

    } catch (error) {

      toast.error("Failed to load categories");

    }

  };

  // ===========================
  // Fetch Product
  // ===========================

  const fetchProduct = async () => {

    try {

      const response = await getProductById(id);

      if (response.success) {

        const product = response.data;

        setFormData({
          category_id: product.category_id || "",
          name: product.name || "",
          slug: product.slug || "",
          description: product.description || "",
          sku: product.sku || "",
          price: product.price || "",
          discount_price: product.discount_price || "",
          stock: product.stock || "",
          status: product.status || "active",
        });

        setExistingImages(product.images || []);

      }

    } catch (error) {

      toast.error("Product not found");

      navigate("/products");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchCategories();
    fetchProduct();

  }, [id]);
    // ===========================
  // Handle Input
  // ===========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // ===========================
  // Generate Slug
  // ===========================

  const generateSlug = (value) => {

    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  };

  // ===========================
  // Product Name Change
  // ===========================

  const handleNameChange = (e) => {

    const name = e.target.value;

    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });

  };

  // ===========================
  // Handle Image Upload
  // ===========================

  const handleImageChange = (e) => {

    const files = Array.from(e.target.files);

    if (existingImages.length + files.length > 5) {
      return toast.error("Maximum 5 images allowed");
    }

    setImages(files);

    const preview = files.map(file =>
      URL.createObjectURL(file)
    );

    setPreviewImages(preview);

  };

  // ===========================
  // Remove Selected Image
  // ===========================

  const removeImage = (index) => {

    const updatedImages = [...images];
    updatedImages.splice(index, 1);

    setImages(updatedImages);

    const updatedPreview = [...previewImages];
    updatedPreview.splice(index, 1);

    setPreviewImages(updatedPreview);

  };

  // ===========================
  // Update Product
  // ===========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.category_id ||
      !formData.name ||
      !formData.slug ||
      !formData.sku ||
      !formData.price
    ) {
      return toast.error("Please fill all required fields");
    }

    try {

      setSaving(true);

      const data = new FormData();

      data.append("category_id", formData.category_id);
      data.append("name", formData.name);
      data.append("slug", formData.slug);
      data.append("description", formData.description);
      data.append("sku", formData.sku);
      data.append("price", formData.price);
      data.append("discount_price", formData.discount_price);
      data.append("stock", formData.stock);
      data.append("status", formData.status);

      images.forEach((image) => {
        data.append("images", image);
      });

      const response = await updateProduct(id, data);

      if (response.success) {

        toast.success("Product Updated Successfully");

        navigate("/products");

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

  // ===========================
  // Loading
  // ===========================

  if (loading) {

    return (
      <div className="text-center py-20 text-xl">
        Loading Product...
      </div>
    );

  }
    return (
    <div className="bg-white shadow rounded-xl p-6 max-w-5xl mx-auto">

      <h2 className="text-3xl font-bold mb-6">
        Edit Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        {/* Category */}
        <div>

          <label className="block mb-2 font-medium">
            Category
          </label>

          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >

            <option value="">
              Select Category
            </option>

            {categories.map((category) => (

              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>

            ))}

          </select>

        </div>

        {/* Product Name */}
        <div>

          <label className="block mb-2 font-medium">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleNameChange}
            placeholder="Enter Product Name"
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Slug */}
        <div>

          <label className="block mb-2 font-medium">
            Slug
          </label>

          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="product-slug"
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* SKU */}
        <div>

          <label className="block mb-2 font-medium">
            SKU
          </label>

          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="SKU001"
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Price */}
        <div>

          <label className="block mb-2 font-medium">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="1000"
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Discount Price */}
        <div>

          <label className="block mb-2 font-medium">
            Discount Price
          </label>

          <input
            type="number"
            name="discount_price"
            value={formData.discount_price}
            onChange={handleChange}
            placeholder="900"
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Stock */}
        <div>

          <label className="block mb-2 font-medium">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="50"
            className="w-full border rounded-lg p-3"
          />

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
            className="w-full border rounded-lg p-3"
          >

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

          </select>

        </div>

        {/* Description */}
        <div className="md:col-span-2">

          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Product Description"
            className="w-full border rounded-lg p-3"
          />

        </div>
                {/* Existing Images */}
        <div className="md:col-span-2">

          <label className="block mb-3 text-lg font-semibold">
            Existing Images
          </label>

          {existingImages.length > 0 ? (

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

              {existingImages.map((image) => (

                <div
                  key={image.id}
                  className="relative border rounded-lg overflow-hidden"
                >

                  <img
                    src={image.image_url}
                    alt="Product"
                    className="w-full h-32 object-cover"
                  />

                  {/* Delete Button (API Later) */}
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center"
                  >
                    ✕
                  </button>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-gray-500">
              No Images Available
            </p>

          )}

        </div>

        {/* Upload New Images */}
        <div className="md:col-span-2">

          <label className="block mb-2 font-medium">
            Upload New Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-lg p-3"
          />

          <p className="text-sm text-gray-500 mt-2">
            Maximum 5 images allowed.
          </p>

        </div>

        {/* New Image Preview */}
        {previewImages.length > 0 && (

          <div className="md:col-span-2">

            <h3 className="text-lg font-semibold mb-3">
              New Image Preview
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

              {previewImages.map((image, index) => (

                <div
                  key={index}
                  className="relative border rounded-lg overflow-hidden"
                >

                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center"
                  >
                    ✕
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* Action Buttons */}
        <div className="md:col-span-2 flex gap-4 mt-6">

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg transition"
          >
            {saving ? "Updating..." : "Update Product"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );

};

export default EditProduct;
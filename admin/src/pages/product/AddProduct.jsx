import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getCategories } from "../../services/category.service";
import { createProduct } from "../../services/product.service";
import generateSKU from "../../utils/generateSKU";

const AddProduct = () => {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

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
  const fetchCategories = async () => {

    try {

      setLoading(true);

      const response = await getCategories();

      if (response.success) {
        setCategories(response.data);
      }

    } catch (error) {

      toast.error("Failed to load categories");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchCategories();
  }, []);



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



  const updateSKU = (categoryId, productName) => {

    const category = categories.find(
      (item) => item.id == categoryId
    );

    if (!category) return;

    const sku = generateSKU(
      category.name,
      productName
    );

    setFormData((prev) => ({
      ...prev,
      category_id: categoryId,
      sku,
    }));

  };


  const handleNameChange = (e) => {

    const name = e.target.value;

    const slug = generateSlug(name);

    const category = categories.find(
      (item) => item.id == formData.category_id
    );

    const sku = category
      ? generateSKU(category.name, name)
      : "";

    setFormData({
      ...formData,
      name,
      slug,
      sku,
    });

  };



  const handleImageChange = (e) => {

    const files = Array.from(e.target.files);

    if (files.length > 5) {
      return toast.error("Maximum 5 images allowed");
    }

    setImages(files);

    const preview = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages(preview);

  };



  const removeImage = (index) => {

    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreview = [...previewImages];
    newPreview.splice(index, 1);
    setPreviewImages(newPreview);

  };

 

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

    if (images.length === 0) {
      return toast.error("Please select at least one image");
    }

    try {

      setSaving(true);

      const data = new FormData();

      data.append("category_id", formData.category_id);
      data.append("name", formData.name);
      data.append("slug", formData.slug);
      data.append("sku", formData.sku);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("discount_price", formData.discount_price);
      data.append("stock", formData.stock);
      data.append("status", formData.status);

      images.forEach((image) => {
        data.append("images", image);
      });

      const response = await createProduct(data);

      if (response.success) {

        toast.success("Product Added Successfully");

        navigate("/products");

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to create product"
      );

    } finally {

      setSaving(false);

    }

  };
    return (
    <div className="bg-white shadow rounded-xl p-6 max-w-5xl mx-auto">

      <h2 className="text-3xl font-bold mb-6">
        Add Product
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

          {loading && (
            <p className="text-blue-500 text-sm mb-2">
              Loading Categories...
            </p>
          )}

          <select
            name="category_id"
            value={formData.category_id}
            onChange={(e) =>
              updateSKU(e.target.value, formData.name)
            }
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
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
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
            placeholder="10"
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

        {/* Product Images */}
        <div className="md:col-span-2">

          <label className="block mb-2 font-medium">
            Product Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-lg p-3"
          />

        </div>
                {/* Image Preview */}
        {previewImages.length > 0 && (

          <div className="md:col-span-2">

            <h3 className="text-lg font-semibold mb-3">
              Image Preview
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

              {previewImages.map((image, index) => (

                <div
                  key={index}
                  className="relative"
                >

                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center"
                  >
                    ✕
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* Buttons */}
        <div className="md:col-span-2 flex gap-4 mt-4">

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg"
          >
            {saving ? "Saving..." : "Save Product"}
          </button>

          <button
            type="button"
            onClick={() => {

              setFormData({
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

              setImages([]);
              setPreviewImages([]);

            }}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
          >
            Reset
          </button>

        </div>

      </form>

    </div>
  );

};

export default AddProduct;
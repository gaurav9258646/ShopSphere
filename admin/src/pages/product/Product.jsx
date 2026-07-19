import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  getProducts,
  deleteProduct,
} from "../../services/product.service";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteProduct(id);

      if (response.success) {
        toast.success("Product Deleted Successfully");
        fetchProducts();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  if (loading) {
    return (
      <h2 className="text-xl font-semibold">
        Loading...
      </h2>
    );
  }

  return (
    <div className="bg-white shadow rounded-xl p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Products
        </h2>

        <Link
          to="/products/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </Link>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-300">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-3">ID</th>

              <th className="border p-3">Image</th>

              <th className="border p-3">Name</th>

              <th className="border p-3">Category</th>

              <th className="border p-3">Price</th>

              <th className="border p-3">Stock</th>

              <th className="border p-3">Status</th>

              <th className="border p-3">Action</th>

            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-6"
                >
                  No Products Found
                </td>

              </tr>

            ) : (

              products.map((product) => (

                <tr key={product.id}>

                  <td className="border p-3">
                    {product.id}
                  </td>

                  <td className="border p-3">

                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />

                  </td>

                  <td className="border p-3">
                    {product.name}
                  </td>

                  <td className="border p-3">
                    {product.category_name}
                  </td>

                  <td className="border p-3">
                    ₹{product.price}
                  </td>

                  <td className="border p-3">
                    {product.stock}
                  </td>

                  <td className="border p-3">

                    <span
                      className={`px-3 py-1 rounded text-white ${
                        product.status === "active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {product.status}
                    </span>

                  </td>

                  <td className="border p-3">

                    <Link
                      to={`/products/edit/${product.id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product.id)}
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

    </div>
  );
};

export default Product;
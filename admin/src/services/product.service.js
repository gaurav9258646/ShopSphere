import api from "./api";

// Get All Products
export const getProducts = async () => {
    const response = await api.get("/products");
    return response.data;
};

// Get Product By ID
export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

export const createProduct = async (formData) => {
    const response = await api.post("/products", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const updateProduct = async (id, formData) => {
    const response = await api.put(`/products/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};

export const searchProducts = async (params) => {
    const response = await api.get("/products/search", {
        params,
    });

    return response.data;
};
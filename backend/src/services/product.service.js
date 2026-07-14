const Product = require("../models/product.model");
const Category = require("../models/category.model");


const createProductService = async (productData) => {

    const {
        category_id,
        name,
        slug,
        description,
        sku,
        price,
        discount_price,
        stock,
        thumbnail,
        status,
    } = productData;

    const category = await Category.findCategoryById(category_id);

    if (!category) {
        throw new Error("Category not found");
    }

    const existingProduct = await Product.findProductBySlug(slug);

    if (existingProduct) {
        throw new Error("Product slug already exists");
    }

    const productId = await Product.createProduct({
        category_id,
        name,
        slug,
        description,
        sku,
        price,
        discount_price,
        stock,
        thumbnail,
        status,
    });

    return {
        id: productId,
        category_id,
        name,
        slug,
        description,
        sku,
        price,
        discount_price,
        stock,
        thumbnail,
        status,
    };
};


const getAllProductsService = async () => {
    return await Product.getAllProducts();
};


const getProductByIdService = async (id) => {

    const product = await Product.findProductById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};


const updateProductService = async (id, productData) => {

    const product = await Product.findProductById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    const category = await Category.findCategoryById(productData.category_id);

    if (!category) {
        throw new Error("Category not found");
    }

    await Product.updateProduct(id, productData);

    return await Product.findProductById(id);
};


const deleteProductService = async (id) => {

    const product = await Product.findProductById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    await Product.deleteProduct(id);

    return true;
};


const searchProductsService = async (filters) => {

    return await Product.searchProducts(filters);

};

module.exports = {
    createProductService,
    getAllProductsService,
    getProductByIdService,
    updateProductService,
    deleteProductService,
    searchProductsService,
};
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const ProductImage = require("../models/productImage.model");


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
        status,
        images = [],
    } = productData;

    // Check Category
    const category = await Category.findCategoryById(category_id);

    if (!category) {
        throw new Error("Category not found");
    }

    // Check Duplicate Slug
    const existingProduct = await Product.findProductBySlug(slug);

    if (existingProduct) {
        throw new Error("Product slug already exists");
    }

    // First Image = Thumbnail
    const thumbnail =
        images.length > 0
            ? images[0]
            : null;

    // Create Product
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

    // Save Multiple Images
    if (images.length > 0) {

        for (const image of images) {

            await ProductImage.addProductImage(
                productId,
                image
            );

        }

    }

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
        images,
    };


};


const getAllProductsService = async () => {

    const products = await Product.getAllProducts();

    return products;

};



const getProductByIdService = async (id) => {

    // Find Product
    const product = await Product.findProductById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    // Get Product Images
    const images = await ProductImage.getProductImages(id);

    // Return Product with Images
    return {
        ...product,
        images,
    };

};
// ======================================
// Update Product Service
// ======================================

const updateProductService = async (id, productData) => {

    const product = await Product.findProductById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    const {
        category_id,
        name,
        slug,
        description,
        sku,
        price,
        discount_price,
        stock,
        status,
        images = [],
    } = productData;

    // Check Category
    const category = await Category.findCategoryById(category_id);

    if (!category) {
        throw new Error("Category not found");
    }

    // Keep old thumbnail if no new image uploaded
    let thumbnail = product.thumbnail;

    // If new images uploaded, first image becomes thumbnail
    if (images.length > 0) {

        thumbnail = images[0];

        // Save new images
        for (const image of images) {

            await ProductImage.addProductImage(
                id,
                image
            );

        }

    }

    // Update Product
    await Product.updateProduct(id, {
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

    const updatedProduct = await Product.findProductById(id);
    const productImages = await ProductImage.getProductImages(id);

    return {
        ...updatedProduct,
        images: productImages,
    };

};
// ======================================
// Delete Product Service
// ======================================

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
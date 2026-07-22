const Product = require("../models/product.model");
const ProductImage = require("../models/productImage.model");

const {
    deleteImageFromCloudinary,
} = require("../utils/cloudinary");

// Upload Images
const uploadProductImagesService = async (productId, files) => {

    const product = await Product.findProductById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    const uploadedImages = [];

    for (const file of files) {

        const imageId = await ProductImage.addProductImage(
            productId,
            file.path
        );

        uploadedImages.push({
            id: imageId,
            image_url: file.path,
        });

    }

    return uploadedImages;
};

// Get Images
const getProductImagesService = async (productId) => {

    const product = await Product.findProductById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    return await ProductImage.getProductImages(productId);

};

// Delete Image
const deleteProductImageService = async (imageId) => {

    const image = await ProductImage.findImageById(imageId);

    if (!image) {
        throw new Error("Image not found");
    }

    // Delete from Cloudinary
    await deleteImageFromCloudinary(
        image.image_url
    );

    // Delete from Database
    await ProductImage.deleteProductImage(
        imageId
    );

    return true;
};

module.exports = {
    uploadProductImagesService,
    getProductImagesService,
    deleteProductImageService,
};
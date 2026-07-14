const Product = require("../models/product.model");
const ProductImage = require("../models/productImage.model");


const uploadProductImagesService = async (productId, files) => {

    // Check Product
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


const getProductImagesService = async (productId) => {

    const product = await Product.findProductById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    return await ProductImage.getProductImages(productId);
};


const deleteProductImageService = async (imageId) => {

    const image = await ProductImage.findImageById(imageId);

    if (!image) {
        throw new Error("Image not found");
    }

    await ProductImage.deleteProductImage(imageId);

    return true;
};

module.exports = {
    uploadProductImagesService,
    getProductImagesService,
    deleteProductImageService,
};
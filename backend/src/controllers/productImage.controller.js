const {
    uploadProductImagesService,
    getProductImagesService,
    deleteProductImageService,
} = require("../services/productImage.service");


const uploadProductImages = async (req, res) => {
    console.log("FILES:", req.files);
    console.log("BODY:", req.body);

    try {

        const { id } = req.params;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please upload at least one image",
            });
        }

        const images = await uploadProductImagesService(
            id,
            req.files
        );

        return res.status(201).json({
            success: true,
            message: "Images uploaded successfully",
            data: images,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


const getProductImages = async (req, res) => {

    try {

        const { id } = req.params;

        const images = await getProductImagesService(id);

        return res.status(200).json({
            success: true,
            count: images.length,
            data: images,
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};


const deleteProductImage = async (req, res) => {

    try {

        const { imageId } = req.params;

        await deleteProductImageService(imageId);

        return res.status(200).json({
            success: true,
            message: "Image deleted successfully",
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    uploadProductImages,
    getProductImages,
    deleteProductImage,
};
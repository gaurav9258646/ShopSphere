const {
    createProductService,
    getAllProductsService,
    getProductByIdService,
    updateProductService,
    deleteProductService,
    searchProductsService,
} = require("../services/product.service");


const createProduct = async (req, res) => {
    try {

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
        } = req.body;

        const thumbnail = req.file
            ? req.file.path
            : null;

        if (
            !category_id ||
            !name ||
            !slug ||
            !sku ||
            !price
        ) {
            return res.status(400).json({
                success: false,
                message: "Category, Name, Slug, SKU and Price are required",
            });
        }

        const product = await createProductService({
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

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

const getAllProducts = async (req, res) => {
    try {

        const products = await getAllProductsService();

        return res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


const getProductById = async (req, res) => {
    try {

        const { id } = req.params;

        const product = await getProductByIdService(id);

        return res.status(200).json({
            success: true,
            data: product,
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};


const updateProduct = async (req, res) => {
    try {

        const { id } = req.params;

        const updatedProduct = await updateProductService(
            id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};


const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params;

        await deleteProductService(id);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

const searchProducts = async (req, res) => {
    try {

        const {
            search,
            category,
            minPrice,
            maxPrice,
            page,
            limit,
        } = req.query;

        const products = await searchProductsService({
            search,
            category,
            minPrice,
            maxPrice,
            page,
            limit,
        });

        return res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts
};
const {
    createCategoryService,
    getAllCategoriesService,
    getCategoryByIdService,
    updateCategoryService,
    deleteCategoryService,
} = require("../services/category.service");


const createCategory = async (req, res) => {
    try {
        const { name, slug, description } = req.body;

        if (!name || !slug) {
            return res.status(400).json({
                success: false,
                message: "Name and Slug are required",
            });
        }

        const category = await createCategoryService({
            name,
            slug,
            description,
        });

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


const getAllCategories = async (req, res) => {
    try {

        const categories = await getAllCategoriesService();

        return res.status(200).json({
            success: true,
            count: categories.length,
            data: categories,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const getCategoryById = async (req, res) => {
    try {

        const { id } = req.params;

        const category = await getCategoryByIdService(id);

        return res.status(200).json({
            success: true,
            data: category,
        });

    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};


const updateCategory = async (req, res) => {
    try {

        const { id } = req.params;

        const updatedCategory = await updateCategoryService(
            id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updatedCategory,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


const deleteCategory = async (req, res) => {
    try {

        const { id } = req.params;

        await deleteCategoryService(id);

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
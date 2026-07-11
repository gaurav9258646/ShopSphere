const Category = require("../models/category.model");

const createCategoryService = async (categoryData) => {
    const { name, slug, description } = categoryData;

    const existingCategory = await Category.findCategoryByName(name);

    if (existingCategory) {
        throw new Error("Category already exists");
    }

    const categoryId = await Category.createCategory({
        name,
        slug,
        description,
    });

    return {
        id: categoryId,
        name,
        slug,
        description,
    };
};

const getAllCategoriesService = async () => {
    return await Category.getAllCategories();
};


const getCategoryByIdService = async (id) => {
    const category = await Category.findCategoryById(id);

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};


const updateCategoryService = async (id, categoryData) => {

    const category = await Category.findCategoryById(id);

    if (!category) {
        throw new Error("Category not found");
    }

    await Category.updateCategory(id, categoryData);

    return await Category.findCategoryById(id);
};


const deleteCategoryService = async (id) => {

    const category = await Category.findCategoryById(id);

    if (!category) {
        throw new Error("Category not found");
    }

    await Category.deleteCategory(id);

    return true;
};

module.exports = {
    createCategoryService,
    getAllCategoriesService,
    getCategoryByIdService,
    updateCategoryService,
    deleteCategoryService,
};

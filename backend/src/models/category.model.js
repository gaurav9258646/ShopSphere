const db = require("../config/db");
const createCategory = async ({ name, slug, description }) => {
    const sql = `
    INSERT INTO categories (name, slug, description)
    VALUES (?, ?, ?)
  `;
    const [result] = await db.execute(sql, [
        name,
        slug,
        description,
    ]);

    return result.insertId;
};

const findCategoryByName = async (name) => {
    const sql = `
    SELECT *
    FROM categories
    WHERE name = ?
    LIMIT 1
  `;

    const [rows] = await db.execute(sql, [name]);

    return rows.length ? rows[0] : null;
};

const findCategoryById = async (id) => {
    const sql = `
    SELECT *
    FROM categories
    WHERE id = ?
    LIMIT 1
  `;

    const [rows] = await db.execute(sql, [id]);

    return rows.length ? rows[0] : null;
};


const getAllCategories = async () => {
    const sql = `
    SELECT *
    FROM categories
    ORDER BY id DESC
  `;

    const [rows] = await db.execute(sql);

    return rows;
};


const updateCategory = async (
    id,
    { name, slug, description, status }
) => {
    const sql = `
    UPDATE categories
    SET
      name = ?,
      slug = ?,
      description = ?,
      status = ?
    WHERE id = ?
  `;

    const [result] = await db.execute(sql, [
        name,
        slug,
        description,
        status,
        id,
    ]);

    return result;
};

const deleteCategory = async (id) => {
    const sql = `
    DELETE FROM categories
    WHERE id = ?
  `;

    const [result] = await db.execute(sql, [id]);

    return result;
};

module.exports = {
    createCategory,
    findCategoryByName,
    findCategoryById,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
const db = require("../config/db");

const addProductImage = async (product_id, image_url) => {

    const sql = `
        INSERT INTO product_images (
            product_id,
            image_url
        )
        VALUES (?, ?)
    `;

    const [result] = await db.execute(sql, [
        product_id,
        image_url,
    ]);

    return result.insertId;
};


const getProductImages = async (product_id) => {

    const sql = `
        SELECT *
        FROM product_images
        WHERE product_id = ?
        ORDER BY id ASC
    `;

    const [rows] = await db.execute(sql, [product_id]);

    return rows;
};


const findImageById = async (id) => {

    const sql = `
        SELECT *
        FROM product_images
        WHERE id = ?
        LIMIT 1
    `;

    const [rows] = await db.execute(sql, [id]);

    return rows.length ? rows[0] : null;
};


const deleteProductImage = async (id) => {

    const sql = `
        DELETE FROM product_images
        WHERE id = ?
    `;

    const [result] = await db.execute(sql, [id]);

    return result;
};

module.exports = {
    addProductImage,
    getProductImages,
    findImageById,
    deleteProductImage,
};
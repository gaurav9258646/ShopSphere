const db = require("../config/db");

const createProduct = async (productData) => {
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

  const sql = `
        INSERT INTO products (
            category_id,
            name,
            slug,
            description,
            sku,
            price,
            discount_price,
            stock,
            thumbnail,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const values = [
    category_id,
    name,
    slug,
    description,
    sku,
    price,
    discount_price,
    stock,
    thumbnail,
    status || "active",
  ];

  const [result] = await db.execute(sql, values);

  return result.insertId;
};


const findProductById = async (id) => {
  const [rows] = await db.execute(
    "SELECT * FROM products WHERE id = ? LIMIT 1",
    [id]
  );

  return rows.length ? rows[0] : null;
};


const findProductBySlug = async (slug) => {
  const [rows] = await db.execute(
    "SELECT * FROM products WHERE slug = ? LIMIT 1",
    [slug]
  );

  return rows.length ? rows[0] : null;
};

const getAllProducts = async () => {
  const sql = `
        SELECT
            p.*,
            c.name AS category_name
        FROM products p
        INNER JOIN categories c
            ON p.category_id = c.id
        ORDER BY p.id DESC
    `;

  const [rows] = await db.query(sql);

  return rows;
};


const searchProducts = async ({
  search = "",
  category = "",
  minPrice = "",
  maxPrice = "",
  page = 1,
  limit = 10,
}) => {

  page = Number(page) || 1;
  limit = Number(limit) || 10;

  let sql = `
        SELECT
            p.*,
            c.name AS category_name
        FROM products p
        INNER JOIN categories c
            ON p.category_id = c.id
        WHERE 1=1
    `;

  const values = [];

  if (search) {
    sql += " AND p.name LIKE ?";
    values.push(`%${search}%`);
  }

  if (category) {
    sql += " AND p.category_id = ?";
    values.push(Number(category));
  }

  if (minPrice) {
    sql += " AND p.price >= ?";
    values.push(Number(minPrice));
  }

  if (maxPrice) {
    sql += " AND p.price <= ?";
    values.push(Number(maxPrice));
  }

  const offset = (page - 1) * limit;

  sql += ` ORDER BY p.id DESC LIMIT ${limit} OFFSET ${offset}`;

  console.log("SQL:", sql);
  console.log("VALUES:", values);

  const [rows] = await db.query(sql, values);

  return rows;
};

const updateProduct = async (id, productData) => {

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

  const sql = `
        UPDATE products
        SET
            category_id = ?,
            name = ?,
            slug = ?,
            description = ?,
            sku = ?,
            price = ?,
            discount_price = ?,
            stock = ?,
            thumbnail = ?,
            status = ?
        WHERE id = ?
    `;

  const values = [
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
    id,
  ];

  const [result] = await db.execute(sql, values);

  return result;
};


const deleteProduct = async (id) => {

  const [result] = await db.execute(
    "DELETE FROM products WHERE id = ?",
    [id]
  );

  return result;
};

module.exports = {
  createProduct,
  findProductById,
  findProductBySlug,
  getAllProducts,
  searchProducts,
  updateProduct,
  deleteProduct,
};
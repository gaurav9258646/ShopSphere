const db = require("./../config/db");


const createUser = async ({ name, email, password }) => {
    const sql = `
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `;

    const [result] = await db.execute(sql, [
        name,
        email,
        password,
    ]);

    return result.insertId;
};

const findUserByEmail = async (email) => {
    const sql = `
    SELECT *
    FROM users
    WHERE email = ?
    LIMIT 1
  `;

    const [rows] = await db.execute(sql, [email]);

    return rows.length ? rows[0] : null;
};

const findUserById = async (id) => {
    const sql = `
    SELECT id,name,email,role,created_at
    FROM users
    WHERE id=?
    LIMIT 1
  `;

    const [rows] = await db.execute(sql, [id]);

    return rows.length ? rows[0] : null;
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
};
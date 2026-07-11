const db = require("../config/db");


const createUser = async ({ name, email, password }) => {
    try {
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
    } catch (error) {
        throw error;
    }
};


const findUserByEmail = async (email) => {
    try {
        const sql = `
      SELECT *
      FROM users
      WHERE email = ?
      LIMIT 1
    `;

        const [rows] = await db.execute(sql, [email]);

        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw error;
    }
};

const findUserById = async (id) => {
    try {
        const sql = `
      SELECT
        id,
        name,
        email,
        role,
        created_at
      FROM users
      WHERE id = ?
      LIMIT 1
    `;

        const [rows] = await db.execute(sql, [id]);

        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw error;
    }
};


const updateUser = async (id, { name, email }) => {
    try {
        const sql = `
      UPDATE users
      SET
        name = ?,
        email = ?
      WHERE id = ?
    `;

        const [result] = await db.execute(sql, [
            name,
            email,
            id,
        ]);

        return result;
    } catch (error) {
        throw error;
    }
};


const getAllUsers = async () => {
    try {
        const sql = `
      SELECT
        id,
        name,
        email,
        role,
        created_at
      FROM users
      ORDER BY id DESC
    `;

        const [rows] = await db.execute(sql);

        return rows;
    } catch (error) {
        throw error;
    }
};


const deleteUser = async (id) => {
    try {
        const sql = `
      DELETE FROM users
      WHERE id = ?
    `;

        const [result] = await db.execute(sql, [id]);

        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    updateUser,
    getAllUsers,
    deleteUser,
};
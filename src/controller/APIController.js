import pool from '../config/connectDatabase'
const getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `USERS`')
    return res.status(200).json({
        message: 'Get all users',
        data: rows
    })
}
const createNewUser = async (req, res) => {
    const { first_name, last_name, email, age } = req.body;
    if (!first_name || !last_name || !email || !age) {
        return res.status(400).json({
            message: 'Bad request',
            data: 'Please fill all field'
        })
    }
    await pool.execute('INSERT INTO `USERS` (`first_name`, `last_name`, `email`, `age`) VALUES (?, ?, ?, ?)', [first_name, last_name, email, age]);
    return res.status(201).json({
        message: 'Create new user',
    })
}
const getUserById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if (!id) {
        return res.status(400).json({
            message: "bad request",
        })
    }
    const [rows] = await pool.execute("select * from `USERS` where id=?", [id]);
    if (rows.length === 0) {
        return res.status(404).json({
            message: "user not found",
        })
    }
    return res.status(200).json({
        message: "get user by id",
        data: rows[0]
    })
}
const updateUser = async (req, res) => {
    const { first_name, last_name, email, age, id } = req.body;
    if (!first_name || !last_name || !email || !age || !id) {
        return res.status(400).json({
            message: 'Bad request',
            data: 'Please fill all field'
        })
    }
    const [rows] = await pool.execute('UPDATE `USERS` SET `first_name` = ?, `last_name` = ?, `email` = ?, `age` = ? WHERE `id` = ?', [first_name, last_name, email, age, id]);
    return res.status(200).json({
        message: 'update user',
    })
}

const deleteUser = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(400).json({
            message: "bad request",
        })
    }
    const [rows] = await pool.execute('DELETE FROM `USERS` WHERE `id` = ?', [id]);
    return res.status(200).json({
        message: "deleteUser",
        data: rows
    })
}

module.exports = {
    getAllUsers,
    createNewUser,
    getUserById,
    updateUser,
    deleteUser
}
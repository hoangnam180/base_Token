import pool from '../config/connectDatabase'

const getHomepage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `USERS` ');
    return res.render('index.ejs', { dataUser: rows })
}

const getDetail = async (req, res) => {
    let id = req.params.id;
    let [user, fields] = await pool.execute('SELECT * FROM `USERS` WHERE `id` = ?', [id]);
    console.log(user);
    return res.render('detail.ejs', { DetailUser: user })
}

const createNewUser = async (req, res) => {
    const { first_name, last_name, email, age } = req.body;
    const [rows] = await pool.execute('INSERT INTO `USERS` (`first_name`, `last_name`, `email`, `age`) VALUES (?, ?, ?, ?)', [first_name, last_name, email, age]);
    console.log(rows);
    return res.redirect("/")
}

const deleteUser = (req, res) => {
    let id = req.params.id;
    pool.execute('DELETE FROM `USERS` WHERE `id` = ?', [id]);
    return res.redirect("/")
}
const getUserById = async (req, res) => {
    let id = req.params.id;
    const [rows] = await pool.execute('SELECT * FROM `USERS` WHERE `id` = ?', [id]);
    return res.render("edituser.ejs", { user: rows[0] })
}

const updateUser = async (req, res) => {
    let id = req.params.id;
    const { first_name, last_name, email, age } = req.body;
    await pool.execute('UPDATE `USERS` SET `first_name` = ?, `last_name` = ?, `email` = ?, `age` = ? WHERE `id` = ?', [first_name, last_name, email, age, id]);
    return res.redirect("/");
}

module.exports = {
    getHomepage,
    getDetail,
    createNewUser,
    deleteUser,
    getUserById,
    updateUser
}
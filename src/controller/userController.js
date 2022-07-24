
const pool = require('../config/connectDatabase')
const md5 = require('md5')
class UserController {
    // [GET] REGISTER
    register = (req, res) => {
        res.render('pages/register', { error: '' });
    }
    // [POST] REGISTER
    registerPost = async (req, res) => {
        const { name, password, sdt, address, sex, email } = req.body;
        const hashPassword = md5(Number(password));
        const sql = `INSERT INTO thanhvien (sdt, cmnd, address, name, id_thanhvien, email, mat_khau, quyen_truy_cap, gioi_tinh) VALUES ('${sdt}', ${sdt}, '${address}', '${name}', NULL, '${email}', '${hashPassword}', 0, ${sex ? sex : 2})`;
        const result = await pool.execute(sql);
        console.log(result);
        if (result) {

        }
        res.redirect('/user/login');
    }
    // GET Login
    login = (req, res) => {
        if (req.signedCookies.email_user) {
            res.redirect('/');
        }
        res.render('pages/login', { error: '' });
    }

    loginPost = async (req, res) => {
        const { username, password } = req.body;
        const hashPassword = md5(Number(password));
        const sql = `SELECT * FROM thanhvien WHERE email = '${username}' AND mat_khau = '${hashPassword}'`;
        const [rows] = await pool.execute(sql);
        if (rows.length > 0 && rows[0].quyen_truy_cap === 0) {

            res.cookie('email_user', rows[0].email, {
                signed: true,
            });
            res.cookie('id_user', rows[0].id_thanhvien, {
                signed: true,
            });
            res.redirect('/');
            return;
        }
        else {
            res.render('pages/login', { error: 'Sai tài khoản hoặc mật khẩu' });
            return;
        }
    }


    // GET Logout
    logout = (req, res) => {
        res.clearCookie('email_user');
        res.clearCookie('id_user');
        return res.redirect('/');
    }

    // GET Profile
    profile = async (req, res) => {
        const sql = `SELECT * FROM thanhvien WHERE email = '${req.signedCookies.email_user}'`;
        const [rows] = await pool.execute(sql);
        if (rows.length > 0) {
            res.render('pages/index.ejs', {
                user: rows[0],
                page_layout: 'profile',
            });
        }
    }

    // Get Edit User
    editUser = async (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM thanhvien WHERE id_thanhvien = ${id}`;
        const [rows] = await pool.execute(sql);
        if (rows.length > 0) {
            res.render('pages/index.ejs', {
                user: rows[0],
                page_layout: 'edit-user',
            });
        }
    }

    // Post Edit User
    updateUser = async (req, res) => {
        const id = req.params.id;
        const { name, sdt, address, sex } = req.body;
        const sql = `UPDATE thanhvien SET sdt = '${sdt}',address = '${address}', name = '${name}', gioi_tinh = ${sex} WHERE thanhvien.id_thanhvien = ${id}`
        await pool.execute(sql);
        res.redirect('/user')
    }
}


module.exports = new UserController;
import md5 from 'md5';
import pool from '../config/connectDatabase'
//[GET]
class AdminController {
    login = (req, res) => {
        if (req.signedCookies.email) {
            res.redirect('/admin/home');
            return;
        }
        return res.render('admin/login.ejs', { err: '' })
    }
    getHomepage = (req, res) => {
        if (req.signedCookies.email) {
            return res.render('admin/home.ejs', { data: req.data[0] })
        }
    }
    //[POST]
    checkuser = async (req, res) => {
        const { user_name, password } = req.body;
        const hashPassword = md5(Number(password));
        if (!user_name || !password) { return }
        const sql = `SELECT * FROM thanhvien WHERE email = '${user_name}' AND mat_khau = '${hashPassword}'`;
        const [rows] = await pool.execute(sql);
        if (rows.length > 0 && rows[0].quyen_truy_cap === 2) {
            res.cookie('email', rows[0].email, {
                signed: true,
            });
            res.render('admin/home.ejs', { data: rows[0] })
            return;
        }
        else {
            res.render('admin/login.ejs', { err: 'Sai tài khoản hoặc mật khẩu' })
            return;
        }
    }

    logout = (req, res) => {
        res.clearCookie('email');
        return res.redirect('/admin');
    }


    account = async (req, res) => {
        const sql = `SELECT * FROM thanhvien`;
        const [rows] = await pool.execute(sql);
        return res.render('admin/account.ejs', { data: rows })
    }
}


module.exports = new AdminController;
import pool from '../config/connectDatabase'
//[GET]
class AdminController {
    login = (req, res) => {
        if (req.cookies.email) {
            res.redirect('/admin/home');
            return;
        }
        return res.render('admin/login.ejs', { err: '' })
    }
    getHomepage = (req, res) => {
        if (req.cookies.email) {
            return res.render('admin/home.ejs', { data: req.data[0] })
        }
    }
    //[POST]
    checkuser = async (req, res) => {
        const { user_name, password } = req.body;
        if (!user_name || !password) { return }
        const sql = `SELECT * FROM thanhvien WHERE email = '${user_name}' AND mat_khau = '${password}'`;
        const [rows] = await pool.execute(sql);

        if (rows.length > 0 && rows[0].quyen_truy_cap === 2) {
            res.cookie('email', rows[0].email);
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
}


module.exports = new AdminController;
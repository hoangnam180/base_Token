import pool from '../config/connectDatabase'
const requireAuth = async (req, res, next) => {
    if (!req.cookies.email) {
        res.redirect('/admin');
        return;
    }
    const sql = `SELECT * FROM thanhvien WHERE email = '${req.cookies.email}'`;
    const [rows] = await pool.query(sql);
    if (rows.length > 0 && rows[0].quyen_truy_cap === 2) {
        req.data = [rows[0]];
        next();
    }
}

module.exports = { requireAuth };
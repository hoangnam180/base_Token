import pool from '../config/connectDatabase'
const requireAuth = async (req, res, next) => {
    if (!req.signedCookies.email) {
        res.redirect('/admin');
        return;
    }
    const sql = `SELECT * FROM thanhvien WHERE email = '${req.signedCookies.email}'`;
    const [rows] = await pool.query(sql);
    if (rows.length > 0 && rows[0].quyen_truy_cap === 2) {
        req.data = [rows[0]];
        res.locals.user = rows[0];
        next();
    }
    if (rows.length > 0 && rows[0].quyen_truy_cap === 1) {
        req.data = [rows[0]];
        res.locals.user = rows[0];
        next();
    }
}



module.exports = { requireAuth };
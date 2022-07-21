import pool from '../config/connectDatabase'
const dataLocal = async (req, res, next) => {
    const sql = `SELECT * FROM dmsanpham`
    const [rows] = await pool.query(sql)
    if (rows.length > 0) {
        res.locals.dataLocal = rows
        next()
    }
}



module.exports = { dataLocal };
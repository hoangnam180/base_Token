import pool from '../config/connectDatabase'
//[GET]
class SiteController {
    getHomepage = async (req, res) => {
        const sql = `SELECT * FROM sanpham ORDER BY id_sp DESC LIMIT 8`
        const [rows] = await pool.query(sql)
        console.log(rows);
        res.render('pages/index.ejs', {
            products: rows,
            url: req.url //url cua trang hien tai
        });
    }

    //GET DETIAL PRODUCT
    getDetailProduct = async (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM sanpham WHERE id_sp = ${id}`;
        const [rows] = await pool.query(sql);
        if (rows[0] !== undefined || rows[0] !== null || rows[0] !== '' || rows[0] !== 0 || rows[0] !== '0') {
            console.log(rows[0]);
            res.render('pages/index.ejs', {
                dataDetail: rows[0],
                url: "detail-product"
            });
        }
        else {
            res.render('pages/404.ejs');
        }
    }
}


module.exports = new SiteController;
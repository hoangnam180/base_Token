import pool from '../config/connectDatabase'
//[GET]
class SiteController {
    getHomepage = async (req, res) => {
        const sql = `SELECT * FROM sanpham ORDER BY id_sp DESC LIMIT 8`
        const [rows] = await pool.query(sql)
        res.render('pages/index.ejs', {
            products: rows,
            page_layout: req.url //url cua trang hien tai
        });
    }

    //GET DETIAL PRODUCT
    getDetailProduct = async (req, res) => {
        const sql = `SELECT * FROM sanpham WHERE id_sp = ${req.query.id}`;
        const [rows] = await pool.query(sql);
        console.log("check query>>>>>>>>>", req.query);
        if (rows[0] !== undefined || rows[0] !== null || rows[0] !== '' || rows[0] !== 0 || rows[0] !== '0') {
            res.render('pages/index.ejs', {
                dataDetail: rows[0],
                page_layout: req.query.page_layout
            });
        }
        else {
            res.render('pages/404.ejs');
        }
    }

    //GET PRODUCTS
    getProducts = async (req, res) => {
        //get danhmusp and sanpham
        const id = req.query.id_dm;
        const sql = `SELECT * FROM dmsanpham WHERE id_dm = ${id}`;
        const sql2 = `SELECT * FROM sanpham WHERE id_dm = ${id} ORDER BY id_sp DESC`;
        const [rows1, rows2] = await Promise.all([pool.query(sql), pool.query(sql2)]);
        //get danhmusp and sanpham
        res.render('pages/index.ejs', {
            danhmucsp: rows1[0][0],
            sanpham: rows2[0],
            page_layout: req.query.page_layout
        });
    }
}


module.exports = new SiteController;
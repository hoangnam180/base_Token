import pool from '../config/connectDatabase'
//[GET]
class SiteController {
    getHomepage = async (req, res) => {
        //pagination product
        const page = parseInt(req.query.page) || 1;
        const perPage = 8;
        const start = (page - 1) * perPage;
        const end = page * perPage;
        const [Count] = await pool.execute('SELECT COUNT(*) FROM `sanpham`');
        const totalPage = Math.ceil(Count[0]['COUNT(*)'] / perPage);
        const [products] = await pool.execute('SELECT * FROM sanpham LIMIT ?, ?', [start, end]);
        res.render('pages/index.ejs', {
            products,
            page,
            totalPage,
            page_layout: '/'
        });
    }

    //GET DETIAL PRODUCT
    getDetailProduct = async (req, res) => {
        const sql = `SELECT * FROM sanpham WHERE id_sp = ${req.query.id}`;
        //get comments fron blsanpham
        const sql1 = `SELECT * FROM blsanpham WHERE id_sp = ${req.query.id}`
        const [comments] = await pool.execute(sql1);
        const [rows] = await pool.query(sql);
        if (rows[0] !== undefined || rows[0] !== null || rows[0] !== '' || rows[0] !== 0 || rows[0] !== '0') {
            res.render('pages/index.ejs', {
                dataDetail: rows[0],
                comments,
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

    //GET SEARCH
    getSearch = async (req, res) => {
        let search = req.query.search;
        search = search.replace(/\s/g, '%');
        //pagegination product
        const page = parseInt(req.query.page) || 1;
        const perPage = 8;
        const start = (page - 1) * perPage;
        const end = page * perPage;
        const [Count] = await pool.execute('SELECT COUNT(*) FROM `sanpham` WHERE ten_sp LIKE "%' + search + '%"');
        const totalPage = Math.ceil(Count[0]['COUNT(*)'] / perPage);
        const [sanpham] = await pool.execute('SELECT * FROM sanpham WHERE ten_sp LIKE "%' + search + '%" LIMIT ?, ?', [start, end]);
        res.render('pages/index.ejs', {
            sanpham,
            page,
            totalPage,
            search: req.query.search,
            page_layout: 'search'
        });
    }
}


module.exports = new SiteController;
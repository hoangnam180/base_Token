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
        //select count comment by id_sp
        const sql2 = `SELECT COUNT(*) FROM blsanpham WHERE id_sp = ${req.query.id}`
        const [rows] = await pool.execute(sql);
        const [comments] = await pool.execute(sql1);
        const [count] = await pool.execute(sql2);
        if (rows[0] !== undefined || rows[0] !== null || rows[0] !== '' || rows[0] !== 0 || rows[0] !== '0') {
            res.render('pages/index.ejs', {
                dataDetail: rows[0],
                comments,
                count: count[0]['COUNT(*)'],
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

    //POST COMMENT
    postComment = async (req, res) => {
        const id = req.params.id;
        const { message, name, sdt, star } = req.body;
        let date;
        date = new Date();
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + date.getUTCHours()).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2);
        console.log(date);
        const sql = `INSERT INTO blsanpham (id_bl, id_sp, ten, dien_thoai, binh_luan, ngay_gio, star) VALUES (NULL, ${id}, '${name}', '${sdt}', '${message}', '${date}', ${star ? star : 0})`;
        console.log(sql);
        await pool.execute(sql);
        res.redirect('back');

    }
}


module.exports = new SiteController;

const pool = require('../config/connectDatabase');
class CartController {
    async getCart(req, res) {
        const Arr_giohang = req.signedCookies.giohang;
        const list_id_sp = Arr_giohang.map(item => item.id).join(',');
        if (list_id_sp.length > 0) {
            const sql = `SELECT * FROM sanpham WHERE id_sp IN (${list_id_sp})`;
            const [rows] = await pool.execute(sql);
            const newGiohang = [...req.signedCookies.giohang];
            console.log(rows, newGiohang);
            res.render('pages/index.ejs', {
                products: rows,
                Arr_giohang: newGiohang,
                page_layout: 'cart'
            })
            return
        }
        res.render('pages/index.ejs', {
            products: [],
            Arr_giohang: [],
            page_layout: 'cart'
        })
    }

    addCart(req, res) {
        const id = req.params.id;
        const Arr_giohang = req.signedCookies.giohang;
        if (Arr_giohang.length > 0) {
            const index = Arr_giohang.findIndex(item => item.id === id);
            if (index != -1) {
                Arr_giohang[index].quantity += 1;
            }
            else {
                Arr_giohang.push({
                    id: id,
                    quantity: 1
                })
            }
        }
        else {
            // add id to Arr_giohang
            Arr_giohang.push({
                id: id,
                quantity: 1
            });
        }
        res.cookie('giohang', Arr_giohang, {
            signed: true,
        });
        res.redirect('/cart');
    }
    minusCart(req, res) {
        const id = req.params.id;
        const Arr_giohang = req.signedCookies.giohang;
        const index = Arr_giohang.findIndex(item => item.id === id);
        if (index != -1) {
            if (Arr_giohang[index].quantity > 1) {
                Arr_giohang[index].quantity -= 1;
            }
            else {
                Arr_giohang.splice(index, 1);
            }
        }
        res.cookie('giohang', Arr_giohang, {
            signed: true,
        });
        res.redirect('/cart');
    }
    deleteCart(req, res) {
        const id = req.params.id;
        const Arr_giohang = req.signedCookies.giohang;
        const index = Arr_giohang.findIndex(item => item.id === id);
        if (index != -1) {
            Arr_giohang.splice(index, 1);
        }
        res.cookie('giohang', Arr_giohang, {
            signed: true,
        });
        res.redirect('/cart');
    }
    async checkout(req, res) {
        const Arr_giohang = req.signedCookies.giohang;
        const userId = req.signedCookies.id_user;
        const list_id_sp = Arr_giohang.map(item => item.id).join(',');
        // select userId
        const sql = `SELECT * FROM thanhvien WHERE id_thanhvien = ${userId}`;
        const [user] = await pool.execute(sql);
        if (list_id_sp.length > 0) {
            const sql = `SELECT * FROM sanpham WHERE id_sp IN (${list_id_sp})`;
            const [rows] = await pool.execute(sql);
            const newGiohang = [...req.signedCookies.giohang];
            res.render('pages/index.ejs', {
                products: rows,
                user: user[0],
                Arr_giohang: newGiohang,
                page_layout: 'checkout'
            })
            return
        }
        res.render('pages/index.ejs', {
            user: {},
            products: [],
            Arr_giohang: [],
            page_layout: 'checkout'
        })
    }
    async bills(req, res) {
        const Arr_giohang = req.signedCookies.giohang;
        let totalPrice = req.body.price;
        const userId = req.signedCookies.id_user;
        const list_id_sp = Arr_giohang.map(item => item.id).join(',');
        const sql = `SELECT * FROM sanpham WHERE id_sp IN (${list_id_sp})`;
        const [rows] = await pool.execute(sql);
        const name_product = rows.map(item => item.ten_sp).join(',');
        const sql1 = `INSERT INTO hoa_don (id, name_product, price, id_thanhvien) VALUES (NULL , '${name_product}', '${totalPrice}', ${userId})`;
        console.log(sql1);
        const [rows1] = await pool.execute(sql1);
        // clear cookie
        res.clearCookie('giohang');
        if (rows1.affectedRows > 0) {
            res.render('pages/index.ejs', {
                page_layout: 'bills'
            })
            return;
        }

        res.redirect('/cart');
    }

    getBills(req, res) {
        res.render('pages/index.ejs', {
            page_layout: 'bills'
        })
    }
}


module.exports = new CartController;
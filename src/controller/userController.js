
import pool from '../config/connectDatabase'
class UserController {
    // [GET] Login
    register = (req, res) => {
        res.render('pages/register')
    }
    // [POST] Login
    registerPost = async (req, res) => {
        const { name, password, sdt, address, sex, email } = req.body

    }
}


module.exports = new UserController;
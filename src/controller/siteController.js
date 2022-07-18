import pool from '../config/connectDatabase'
//[GET]
class SiteController {
    getHomepage = async (req, res) => {
        return res.render('index.ejs')
    }
}


module.exports = new SiteController;
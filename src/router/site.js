const express = require('express')
const siteController = require('../controller/siteController')
const authMiddleware = require('../middlewares/auth.middlewares')
const dataLocalMiddleware = require('../middlewares/dataLocal.middleware')
const router = express.Router();

router.get('/detail', dataLocalMiddleware.dataLocal, authMiddleware.requireAuthbyUser, siteController.getDetailProduct);
router.get('/category', dataLocalMiddleware.dataLocal, authMiddleware.requireAuthbyUser, siteController.getProducts);
router.get('/search', dataLocalMiddleware.dataLocal, authMiddleware.requireAuthbyUser, siteController.getSearch);
router.post('/comment/:id', dataLocalMiddleware.dataLocal, authMiddleware.requireAuthbyUser, siteController.postComment);
router.get('/contact', dataLocalMiddleware.dataLocal, authMiddleware.requireAuthbyUser, siteController.getContact);
router.get('/', dataLocalMiddleware.dataLocal, authMiddleware.requireAuthbyUser, siteController.getHomepage);

module.exports = router;


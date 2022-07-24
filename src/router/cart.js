const express = require('express')
const authMiddleware = require('../middlewares/auth.middlewares')
const cartController = require('../controller/cartController')
const dataLocalMiddleware = require('../middlewares/dataLocal.middleware')

const router = express.Router();
//add cart
router.get('/add/:id', dataLocalMiddleware.dataLocal, authMiddleware.requireAuthbyUser1, cartController.addCart);
router.get('/minus/:id', dataLocalMiddleware.dataLocal, authMiddleware.requireAuthbyUser1, cartController.minusCart);
router.get('/delete/:id', dataLocalMiddleware.dataLocal, authMiddleware.requireAuthbyUser1, cartController.deleteCart);
//checkout
router.get('/checkout', dataLocalMiddleware.dataLocal, authMiddleware.requireAuthbyUser1, cartController.checkout);
//BILLS
router.post('/bills', dataLocalMiddleware.dataLocal, authMiddleware.requireAuthbyUser1, cartController.bills);
router.get('/bills', dataLocalMiddleware.dataLocal, authMiddleware.requireAuthbyUser1, cartController.getBills);

router.get('/', dataLocalMiddleware.dataLocal, authMiddleware.requireAuthbyUser1, cartController.getCart);
module.exports = router;

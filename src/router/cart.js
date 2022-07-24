import express from 'express'
import authMiddleware from '../middlewares/auth.middlewares'
import cartController from '../controller/cartController'
import { dataLocal } from '../middlewares/dataLocal.middleware'

const router = express.Router();
//add cart
router.get('/add/:id', dataLocal, authMiddleware.requireAuthbyUser1, cartController.addCart);
router.get('/minus/:id', dataLocal, authMiddleware.requireAuthbyUser1, cartController.minusCart);
router.get('/delete/:id', dataLocal, authMiddleware.requireAuthbyUser1, cartController.deleteCart);
//checkout
router.get('/checkout', dataLocal, authMiddleware.requireAuthbyUser1, cartController.checkout);

router.get('/', dataLocal, authMiddleware.requireAuthbyUser1, cartController.getCart);
module.exports = router;

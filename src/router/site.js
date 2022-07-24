import express from 'express'
import siteController from '../controller/siteController'
import authMiddleware from '../middlewares/auth.middlewares'
import { dataLocal } from '../middlewares/dataLocal.middleware'
const router = express.Router();

router.get('/detail', dataLocal, authMiddleware.requireAuthbyUser, siteController.getDetailProduct);
router.get('/category', dataLocal, authMiddleware.requireAuthbyUser, siteController.getProducts);
router.get('/search', dataLocal, authMiddleware.requireAuthbyUser, siteController.getSearch);
router.post('/comment/:id', dataLocal, authMiddleware.requireAuthbyUser, siteController.postComment);
router.get('/contact', dataLocal, authMiddleware.requireAuthbyUser, siteController.getContact);
router.get('/', dataLocal, authMiddleware.requireAuthbyUser, siteController.getHomepage);

module.exports = router;


import express from 'express'
import siteController from '../controller/siteController'
import { dataLocal } from '../middlewares/dataLocal.middleware'
const router = express.Router();

router.get('/detail', dataLocal, siteController.getDetailProduct);
router.get('/category', dataLocal, siteController.getProducts);
router.get('/search', dataLocal, siteController.getSearch);
router.post('/comment/:id', dataLocal, siteController.postComment);
router.get('/', dataLocal, siteController.getHomepage);

module.exports = router;


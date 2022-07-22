import express from 'express'
import siteController from '../controller/siteController'
import { dataLocal } from '../middlewares/dataLocal.middleware'
const router = express.Router();

router.get('/', dataLocal, siteController.getHomepage);
router.get('/detail', dataLocal, siteController.getDetailProduct);
router.get('/category', dataLocal, siteController.getProducts);

module.exports = router;


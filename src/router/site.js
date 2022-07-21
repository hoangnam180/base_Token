import express from 'express'
import siteController from '../controller/siteController'
import { dataLocal } from '../middlewares/dataLocal.middleware'
const router = express.Router();

router.get('/', dataLocal, siteController.getHomepage);
router.get('/detail-product/:id', dataLocal, siteController.getDetailProduct);

module.exports = router;


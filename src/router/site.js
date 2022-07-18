import express from 'express'
import siteController from '../controller/siteController'
const router = express.Router();

router.get('/', siteController.getHomepage);

module.exports = router;


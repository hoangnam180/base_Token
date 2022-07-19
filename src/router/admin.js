import express from 'express'
import adminController from '../controller/adminController'
import authMiddleware from '../middlewares/auth.middlewares'
const router = express.Router();
router.get('/home', authMiddleware.requireAuth, adminController.getHomepage);
router.post('/home', adminController.checkuser);
router.get('/logout', adminController.logout);
router.get('/account', authMiddleware.requireAuth, adminController.account);
router.get('/', adminController.login);
module.exports = router;


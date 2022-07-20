import express from 'express'
import adminController from '../controller/adminController'
import authMiddleware from '../middlewares/auth.middlewares'
const router = express.Router();
router.get('/home', authMiddleware.requireAuth, adminController.getHomepage);
router.post('/home', adminController.checkuser);
router.post('/user/edit/:id', adminController.editUser);
router.post('/user/update/:id', adminController.updateUser);
router.get('/logout', adminController.logout);
router.get('/account', authMiddleware.requireAuth, adminController.account);
router.get('/account/create', authMiddleware.requireAuth, adminController.getCreateAccount);
router.post('/account/create', authMiddleware.requireAuth, adminController.createAccount);
router.post('/delete/:id', authMiddleware.requireAuth, adminController.deleteAccount);
router.get('/categories', authMiddleware.requireAuth, adminController.categories);
router.post('/categories/delete/:id', authMiddleware.requireAuth, adminController.deleteCategory);
router.post('/categories/edit/:id', authMiddleware.requireAuth, adminController.editCategory);
router.post('/categories/update/:id', authMiddleware.requireAuth, adminController.updateCategory);
router.get('/categories/create', authMiddleware.requireAuth, adminController.getCreateCategory);
router.post('/categories/create', authMiddleware.requireAuth, adminController.createCategory);
router.get('/bills', authMiddleware.requireAuth, adminController.bills);
router.post('/bills/delete/:id', authMiddleware.requireAuth, adminController.deleteBill);
router.get('/products', authMiddleware.requireAuth, adminController.products);
router.post('/products/delete/:id', authMiddleware.requireAuth, adminController.deleteProduct);
router.post('/products/edit/:id', authMiddleware.requireAuth, adminController.editProduct);
router.post('/products/update/:id', authMiddleware.requireAuth, adminController.updateProduct);
router.get('/products/create', authMiddleware.requireAuth, adminController.getCreateProduct);
router.post('/products/create', authMiddleware.requireAuth, adminController.createProduct);

router.get('/', adminController.login);
module.exports = router;


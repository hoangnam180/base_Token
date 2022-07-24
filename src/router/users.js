import express from 'express'
import authMiddleware from '../middlewares/auth.middlewares'
import userController from '../controller/userController'
import { dataLocal } from '../middlewares/dataLocal.middleware'

const router = express.Router();
//register
router.get('/register', userController.register);
router.post('/register', authMiddleware.checkEmail, userController.registerPost);

//login
router.get('/login', userController.login);
router.post('/login', userController.loginPost);
router.get('/logout', userController.logout);

// edit user
router.post('/edit/:id', dataLocal, authMiddleware.requireAuthbyUser1, userController.editUser);
router.post('/update/:id', dataLocal, authMiddleware.requireAuthbyUser1, userController.updateUser);
router.get('/', dataLocal, authMiddleware.requireAuthbyUser1, userController.profile);
module.exports = router;


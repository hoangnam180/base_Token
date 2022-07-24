const express = require('express')
const authMiddleware = require('../middlewares/auth.middlewares')
const userController = require('../controller/userController')
const dataLocalMiddleware = require('../middlewares/dataLocal.middleware')

const router = express.Router();
//register
router.get('/register', userController.register);
router.post('/register', authMiddleware.checkEmail, userController.registerPost);

//login
router.get('/login', userController.login);
router.post('/login', userController.loginPost);
router.get('/logout', userController.logout);

// edit user
router.post('/edit/:id', dataLocalMiddleware.dataLocal, authMiddleware.requireAuthbyUser1, userController.editUser);
router.post('/update/:id', dataLocalMiddleware.dataLocal, authMiddleware.requireAuthbyUser1, userController.updateUser);
router.get('/', dataLocalMiddleware.dataLocal, authMiddleware.requireAuthbyUser1, userController.profile);
module.exports = router;


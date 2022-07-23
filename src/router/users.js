import express from 'express'
import { dataLocal } from '../middlewares/dataLocal.middleware'
import userController from '../controller/userController'
const router = express.Router();

router.get('/register', userController.register);
router.post('/register', userController.registerPost);

module.exports = router;


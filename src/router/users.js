import express from 'express'
import userController from '../controller/userController'
const router = express.Router();

router.get('/:id', userController.getDetail);
// router.get("/detail/user/:id", homeController.getDetail)
// router.post("/create-new-user", homeController.createNewUser)
// router.post("/delete/user/:id", homeController.deleteUser)
// router.get("/edit/getuser/:id", homeController.getUserById)
// router.post("/update/user/:id", homeController.updateUser)
module.exports = router;


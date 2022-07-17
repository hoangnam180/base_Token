import express from 'express';
import homeController from '../controller/homeController';
const router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)
    router.get("/detail/user/:id", homeController.getDetail)
    router.post("/create-new-user", homeController.createNewUser)
    router.post("/delete/user/:id", homeController.deleteUser)
    router.get("/edit/getuser/:id", homeController.getUserById)
    router.post("/update/user/:id", homeController.updateUser)
    return app.use('/', router);
}

module.exports = initWebRoute;
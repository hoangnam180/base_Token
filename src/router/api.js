import express from 'express';
const router = express.Router();
import APIController from '../controller/APIController';
const initAPIRoute = (app) => {
    router.get('/user', APIController.getAllUsers) // method : Get ,read Data from database
    router.post('/user', APIController.createNewUser) // method : Get ,read Data from database
    router.get('/user/:id', APIController.getUserById) // method : Get ,read Data from database
    router.put('/user', APIController.updateUser) // method : Get ,read Data from database
    router.delete('/user/:id', APIController.deleteUser) // method : Get ,read Data from database
    return app.use('/api/v1', router);
}

module.exports = initAPIRoute;
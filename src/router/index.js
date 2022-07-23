import siteRouter from './site';
import adminRouter from './admin';
import userRouter from './users'
const initWebRoute = (app) => {
    app.use('/user', userRouter);
    app.use('/admin', adminRouter);
    app.use('/', siteRouter);
}

module.exports = initWebRoute;
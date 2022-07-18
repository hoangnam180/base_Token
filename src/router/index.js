import userRouter from './users';
import siteRouter from './site';
import adminRouter from './admin';
const initWebRoute = (app) => {
    app.use('/users', userRouter);
    app.use('/admin', adminRouter);
    app.use('/', siteRouter);
}

module.exports = initWebRoute;
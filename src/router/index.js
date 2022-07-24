import siteRouter from './site';
import adminRouter from './admin';
import userRouter from './users'
import cartRouter from './cart'
const initWebRoute = (app) => {
    app.use('/cart', cartRouter);
    app.use('/user', userRouter);
    app.use('/admin', adminRouter);
    app.use('/', siteRouter);
}

module.exports = initWebRoute;
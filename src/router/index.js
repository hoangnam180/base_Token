const siteRouter = require('./site');
const adminRouter = require('./admin');
const userRouter = require('./users')
const cartRouter = require('./cart')
const initWebRoute = (app) => {
    app.use('/cart', cartRouter);
    app.use('/user', userRouter);
    app.use('/admin', adminRouter);
    app.use('/', siteRouter);
}

module.exports = initWebRoute;
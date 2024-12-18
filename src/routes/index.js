//import others routes
const homeRoute = require('./home');
const blogRoute = require('./blog');
const accountRoute = require('./account');
const authenticateToken = require('../config/authenticateToken');
const localsAccount = require('../config/localsAccount');


function Route(app) {
    //route này không xác thực gì hết nên để riêng ra
    app.use('/account', accountRoute);
    
    //mấy route này xác thực đăng nhập
    app.use(authenticateToken);
    app.use(localsAccount);
    app.use('/blog', blogRoute);
    app.use('/', homeRoute);
}
module.exports = Route;
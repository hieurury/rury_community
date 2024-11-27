//import other routes
const homeRoute = require('./home');


function Route(app) {
    app.use('/', homeRoute);
}
module.exports = Route;
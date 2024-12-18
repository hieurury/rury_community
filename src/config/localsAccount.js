const User = require('../app/models/Users');
module.exports = async (req, res, next) => {
    if(req.user) {
        const user = await User.findById(req.user._id);
        res.locals.user = user;
        console.log(user);
    }
    next();
}
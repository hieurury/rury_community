const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if(!token) {
        return res.render('account/login', {
            layout: 'account',
        });
    }
    try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch(err) {
        return res.redirect('/account/login');
    }
}

module.exports = authenticateToken;

const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
class AccountController {
    //GET /account/login
    renderLogin(req, res) {
        res.render('account/login', {
            layout: 'account',
        });
    }

    //POST /account/login/post
    loginPost(req, res, next) {
        const email = req.body.email;
        const password = req.body.password
        User.findOne({email: email, password: password})
        .then(user => {
            if(!user) {
                return res.json({message: 'Invalid email or password'});
            }
            const token = jwt.sign({
                _id: user._id,
                email: user.email,
            }, process.env.SECRET_KEY, {
                expiresIn: '1h',
            });
            //tiến hành lưu token vào cookie
            res.cookie('token', token, {
                maxAge: 3600000,
                httpOnly: true,
            });
            req.session.user = user;
            res.redirect('/');
        })
        .catch(next)
    }

    //GET /account/logout
    logout(req, res) {
        res.clearCookie('token');
        res.redirect('/account/login');
    }


    //GET /account/register
    renderRegister(req, res) {
        res.render('account/register', {
            layout: 'account',
        });
    }

    //POST /account/register/post
    async registerPost(req, res) {
        try {
            const email = req.body.email;
            await User.findOne({email: email})
            .then(user => {
                if(user) {
                    throw new Error('Email already exists');
                } else {
                    return User.create(req.body);
                }
            })
            .then(() => {
                res.status(200).redirect('/account/login');
            })
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    //====== PROFILE ======//

    //GET /account/profile
    async renderProfile(req, res, next) {
        try {
            const user = await User.findById(req.user._id).populate('blogs');
            res.render('account/profile', {
                layout: 'account',
                dataUser: user,
            });
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}
module.exports = new AccountController;
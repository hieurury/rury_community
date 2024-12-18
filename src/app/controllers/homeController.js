//nạp model Blog (các bài viết) vào controller
const Blog = require('../models/Blogs');
const User = require('../models/Users');
const Comment = require('../models/Comments');

class HomeControllers {
    async index(req, res, next) {
        try {
            //lấy ra tất cả các bài viết
            const blogs = await Blog.find({})
                .populate('author', 'name avatar') //chỉ lấy name và avatar
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'author',
                        select: 'name avatar'
                    }
                }) //lấy ra tất cả các comment
            // res.json(blogs);
            res.render('home', { blogs });
        } catch (error) {
            res.status(400).json({ error: 'error' });
        }
    }
}
module.exports = new HomeControllers;
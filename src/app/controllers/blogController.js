const Blog = require('../models/Blogs');
const Comment = require('../models/Comments');

class BlogController {
    //GET: /blog/view
    async view(req, res, next) {
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
            res.render('blogs', { blogs });
        } catch (error) {
            res.status(400).json({ error: 'error' });
        }
    }

    //GET: /blog/view/latest
    async viewLatest(req, res, next) {
        try {
            //lấy ra tất cả các bài viết
            const blogs = await Blog.find({})
                .sort({ createdAt: -1 })
                .populate('author', 'name avatar') //chỉ lấy name và avatar
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'author',
                        select: 'name avatar'
                    }
                }) //lấy ra tất cả các comment
            res.render('blogs', { blogs });
        } catch (error) {
            res.status(400).json({ error: 'error' });
        }
    }

    //GET: /blog/view/oldest
    async viewOldest(req, res, next) {
        try {
            //lấy ra tất cả các bài viết
            const blogs = await Blog.find({})
                .sort({ createdAt: 1 })
                .populate('author', 'name avatar') //chỉ lấy name và avatar
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'author',
                        select: 'name avatar'
                    }
                }) //lấy ra tất cả các comment
            res.render('blogs', { blogs });
        } catch (error) {
            res.status(400).json({ error: 'error' });
        }
    }

    //GET: /blog/create
    create(req, res, next) {
        res.render('blog-create');
    }

    //GET: /blog/create/post
    createPost(req, res, next) {
        const dataBlog = req.body;
        dataBlog.author = req.user._id
        
        Blog.create(dataBlog)
            .then(() => res.redirect('/blog/view'))
            .catch(next);
    }

    //POST: /blog/comment/:blogid
    async commentPost(req, res, next) {
        try {
            const blogId = req.params.blogid;
            const dataComment = req.body.content;
            const user = req.user._id;

            //tạo comment mới
            const newComment = new Comment({
                blog: blogId,
                author: user,
                content: dataComment,
            });
            const comment = await newComment.save();
            await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment._id } });
            res.redirect('back');
        } catch (error) {
            res.status(400).json(error);
        }
    }

    //POST: /blog/upload-image
    uploadImage(req, res, next) {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.json({ uploaded: true, url: imageUrl });
    }
}
module.exports = new BlogController;
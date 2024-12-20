const mongoose = require('mongoose');
const User = require('../app/models/Users');
const Blog = require('../app/models/Blogs');
require('dotenv').config();
async function connect() {
    try {
        const url = process.env.DATABASE_URL;
        await mongoose.connect(url)
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log(`Connect failure!!!`, error);
    }
}
async function updateUsersWithBlogs() {
    try {
        // Lấy tất cả các user
        const users = await User.find();

        for (const user of users) {
            // Tìm các blog mà user đã đăng
            const blogs = await Blog.find({ author: user._id });

            // Lấy danh sách các blog ID
            const blogIds = blogs.map(blog => blog._id);

            // Cập nhật trường blogs của user
            user.blogs = blogIds;
            await user.save();
        }

        console.log('Cập nhật thành công!');
    } catch (error) {
        console.error('Lỗi khi cập nhật:', error);
    }
}

module.exports = { connect, updateUsersWithBlogs };
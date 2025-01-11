const express = require('express');
const router = express.Router();
const multer = require('multer');

//cấu hình multer(config multer)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

//get controller
const blogController = require('../app/controllers/blogController');

//set routes

//chuyên cho blog
router.get('/view', blogController.view);
router.get('/view/latest', blogController.viewLatest);
router.get('/view/oldest', blogController.viewOldest);
router.get('/create', blogController.create);
router.post('/create/post', blogController.createPost);

//về comment trong blog
router.post('/comment/:blogid', blogController.commentPost);

//upload image
router.post('/upload-image', upload.single('upload'), blogController.uploadImage);

module.exports = router;
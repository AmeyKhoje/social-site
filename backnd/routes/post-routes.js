const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const fileUpload = require('../middleware/file-upload')
const postController = require('../controllers/post-controller')



router.post('/posts',
	fileUpload.single('image'), [
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('image').not().isEmpty()
], postController.createPost)

router.get('/post', postController.getPost)

router.get('/post/:postId', postController.getPostsById)

router.get('/postuser/:uid', postController.getPostByUserId);
module.exports = router
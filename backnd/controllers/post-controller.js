const mongoose = require('mongoose')
const Post = require('../models/post')
const User = require('../models/user')
const HttpError = require('../models/http-error')


const getPostByUserId = async(req, res, next) => {
    const userId = req.params.uid;

    // let places;
    let userWithPosts;
    try {
        userWithPosts = await User.findById(userId).populate('post')

    } catch (err) {
        const error = new HttpError(
            'Fetching places failed, please try again later.',
            500
        );
        return next(error);
    }

    // if (!places || places.length === 0) {
    if (!userWithPosts || userWithPosts.post.length === 0) {
        return next(
            new HttpError('Could not find places for the provided user id.', 404)
        );
    }

    res.json({
        posts: userWithPosts.post.map(post =>
            post.toObject({ getters: true })
        )
    });
};

const createPost = async(req, res, next) => {
    const { title, description, image, author } = req.body

    const createdPost = new Post({
            title,
            description,
            image: 'http://localhost:5000/' + req.file.path,
            author
        })
        // console.log(createdPost);

    let user;
    try {
        user = await User.findById(author);
        console.log(user)
    } catch (err) {
        const error = new HttpError(
            'Creating place failed, please try again.',
            500
        );
        return next(error);
    }
    if (!user) {
        const error = new HttpError('Could not find user for provided id.', 404);
        return next(error);
    }

    try {
        await createdPost.save()
            // const sess = await mongoose.startSession();
            // console.log(sess)
            // sess.startTransaction();
            // await createdPost.save({ session: sess });
        user.post.push(createdPost);
        await user.save();
        // await sess.commitTransaction();
    } catch (error) {
        console.log(error);
    }

    res.status(201).json({ post: createdPost.toObject({ getters: true }) })
}

const getPost = async(req, res) => {
    const postId = req.params.id

    let posts
    try {
        posts = await Post.find({})
    } catch (error) {
        console.log(error);

    }
    res.json({ posts: posts.map(post => post.toObject({ getters: true })) })

}

const getPostsById = async(req, res) => {
    const userPostId = req.params.postId

    let postsOfUser
    try {
        postsOfUser = await Post.findById(userPostId)
    } catch (error) {
        console.log(error);

    }
    res.json({ posts: postsOfUser.toObject({ getters: true }) })
}

const updatePost = async(req, res, next) => {
    const { title, description } = req.body

    const postId = req.params.psid

    let updatedPost

    try {
        updatedPost = await Post.findById(postId)
            // console.log(updatedPost);

    } catch (error) {
        console.log(error);
        return next(error)
    }

    updatedPost.title = title
    updatedPost.description = description

    try {
        await updatedPost.save()
        console.log(updatedPost)
    } catch (error) {
        console.log('cannot update post');

    }

    res.status(200).json({ post: updatedPost })
}

const deletePost = async(req, res, next) => {
        const postId = req.params.dpid

        let post
        try {
            post = await Post.findById(postId).populate('author')
        } catch (error) {
            res.json({ message: 'Failed' })
            return next(error)
        }

        if (!post) {
            res.json({ message: 'Cannot find post' })
                // return next()
            console.log('cannot find');

        }

        try {
            await post.remove()
            post.author.post.pull(post)
            await post.author.save()
        } catch (error) {
            // res.json({ message: 'Failed to delete Post...' })
            return next(error)
        }

        res.status(200).json({ message: 'Deleted Post successfully', place: deletePost })
    }
    // getPostsByUserId = async(req, res, next) => {

// }

exports.createPost = createPost
exports.getPost = getPost
exports.getPostsById = getPostsById
exports.getPostByUserId = getPostByUserId
exports.updatePost = updatePost
exports.deletePost = deletePost
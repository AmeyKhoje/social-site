const uuid = require('uuid/v4')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error')
const User = require('../models/user')

DUMMY_USERS = [{
    id: "u1",
    name: "Max Schwarz",
    email: "test@mail.com",
    password: "test@this.password"
}]
const getUsers = async(req, res, next) => {
    let users
    try {
        users = await User.find({}, '-password') //This doesn't show password when we show all users
        console.log(users);


    } catch (err) {
        const error = new HttpError(
            'Cannot find user !'
        )
        return next(error)
    }

    res.json({ users: users.map(user => user.toObject({ getters: true })) })
}

const signup = async(req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.group(errors)
        return next(
            new HttpError('Invalid input passed, please check your data', 422)
        )
    } else {
        console.log('Success')
    }
    const { name, email, password } = req.body

    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'Sing up failed. Try again later.',
            500
        )
        return next(error)
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead', 422
        )
        return next(error)
    }

    const createdUser = new User({
        name,
        email,
        image: 'http://localhost:5000/' + req.file.path,
        password,
        post: []
    })


    console.log(createdUser)
    try {
        await createdUser.save()

    } catch (err) {
        const error = new HttpError(
            'Signing Up failed, please try again',
            500
        )
        return next(error)
    }
    let token
    try {
        token = jwt.sign({ userId: createdUser.id, email: createdUser.email },
            'supersecret_dont_share', { expiresIn: '1h' }
        )
    } catch (err) {
        const error = new HttpError(
            'Signing up failed cause of token, try again', 500
        )
        return next(error)
    }


    res.status(200).json({ userId: createdUser.id, email: createdUser.email, token: token })
}

const login = async(req, res, next) => {
    const { email, password } = req.body

    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'Cannot find account, If dont have account register first', 500
        )
        return next(error)
    }

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError(
            'Incorrect credentials, try again', 401
        )
        return next(error)
    }

    let token
    try {
        token = jwt.sign({ userId: existingUser.id, email: existingUser.email },
            'supersecret_dont_share', { expiresIn: '1h' }
        )
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(error);
    }

    res.json({ message: "logged In man !", userId: existingUser.id, email: existingUser.email, token: token })
}

const getProfile = async(req, res, next) => {
    const profId = req.params.prid
    let profile
    try {
        profile = await User.findById(profId)
    } catch (err) {
        const error = new HttpError(
            'Cant find user', 500
        )
        return next(error)
    }

    if (!profile) {
        const error = new HttpError(
            'Cant find user', 500
        )
        return next(error)
    } else {
        res.json({ profile: profile.toObject({ getters: true }) })
    }
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login
exports.getProfile = getProfile
const usersController = require('../controllers/users-controller')
const { check } = require('express-validator')
const fileUpload = require('../middleware/file-upload')
const express = require('express')
const router = express.Router()

router.get('/', usersController.getUsers)

router.post('/signup',
    fileUpload.single('image'), [check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min: 6 })
    ],
    usersController.signup)

router.post('/login', usersController.login)

router.get('/profile/:prid', usersController.getProfile)

router.get('/user/:uid', usersController.getUsersById)

router.patch('/updateuser/:usrId', usersController.updateUser)

module.exports = router
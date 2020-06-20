const productsController = require('../controllers/products-controller')
const { check } = require('express-validator')
const express = require('express')
const router = express.Router()

router.get('/', productsController.getProducts)
router.get('/:plid', productsController.getProductById)
router.post('/createproduct', [check('title').not().isEmpty(),
        check('description').not().isEmpty(),
        check('price').not().isEmpty()
    ],
    productsController.createProduct)

// router.post('/login', usersController.login)

module.exports = router
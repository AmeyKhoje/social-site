const productsController = require('../controllers/products-controller')
const { check } = require('express-validator')
const express = require('express')
const router = express.Router()

router.get('/', productsController.getCart)
router.get('/count', productsController.countCartProducts)

router.post('/carts', [check('title').not().isEmpty(),
        check('description').not().isEmpty(),
        check('price').not().isEmpty()
    ],
    productsController.cartProduct)

router.delete('/:cid', productsController.deleteCartProduct)

module.exports = router
const uuid = require('uuid/v4')
const { validationResult } = require('express-validator')
const HttpError = require('../models/http-error')
const Products = require('../models/products')
const Cart = require('../models/cart')
const mongoose = require('mongoose')

const getProductById = async(req, res, next) => {
    console.log('GET requests in places')
    const productId = req.params.plid

    let product
    try {
        product = await Products.findById(productId)
    } catch (err) {
        const error = new HttpError(
            'Something went wrong. Could not find place',
            500
        )

        return next(error)
    }

    if (!product) {
        const error = new HttpError(
            'Could not find place for provoded id',
            500
        )
        return next(error)
    } else {
        res.json({ product: product.toObject({ getters: true }) })
        console.log(productId);
    }
}


const getProducts = async(req, res, next) => {
    let products
    try {
        products = await Products.find({}) //This doesn't show password when we show all users
        console.log(products);


    } catch (err) {
        const error = new HttpError(
            'Cannot find user !'
        )
        return next(error)
    }

    res.json({ products: products.map(product => product.toObject({ getters: true })) })
}

const createProduct = async(req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.group(errors)
        return next(
            new HttpError('Invalid input passed, please check your data', 422)
        )
    } else {
        console.log('Success')
    }
    const { title, description, price } = req.body

    let existingProduct
    try {
        existingProduct = await Products.findOne({ title: title })
    } catch (err) {
        const error = new HttpError(
            'Creating place failed',
            500
        )
        return next(error)
    }

    if (existingProduct) {
        const error = new HttpError(
            'Place exists already, please login instead', 422
        )
        return next(error)
    }

    const createdUser = new Products({
        title,
        description,
        price
    })
    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError(
            'Signing Up failed, please try again',
            500
        )
        return next(error)
    }



    res.status(200).json({ products: createdUser.toObject({ getters: true }) })
}

const cartProduct = async(req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.group(errors)
        return next(
            new HttpError('Invalid input passed, please check your data', 422)
        )
    } else {
        console.log('Success')
    }
    // const { title, description, price } = req.body

    // let existingProduct
    // try {
    //     existingProduct = await Cart.findOne({ title: title })
    // } catch (err) {
    //     const error = new HttpError(
    //         'Creating place failed',
    //         500
    //     )
    //     return next(error)
    // }

    // if (existingProduct) {
    //     const error = new HttpError(
    //         'Place exists already, please login instead', 422
    //     )
    //     return next(error)
    // }

    const createdUser = new Cart(req.body)
    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError(
            'Signing Up failed, please try again',
            500
        )
        return next(error)
    }

    res.status(200).json({ cart: createdUser.toObject({ getters: true }) })
}

const getCart = async(req, res, next) => {
    let cartValues
    try {
        cartValues = await Cart.find({}) //This doesn't show password when we show all users
        console.log(cartValues);


    } catch (err) {
        const error = new HttpError(
            'Cannot find user !'
        )
        return next(error)
    }

    res.json({ cartValues: cartValues.map(cartValue => cartValue.toObject({ getters: true })) })
}

const deleteCartProduct = async(req, res, next) => {
    const cartItemId = req.params.cid

    let cartItem
    try {
        cartItem = await Cart.findById(cartItemId)
        cartItem.remove()
        console.log(cartItem);

    } catch (err) {
        console.log(err);
    }

    res.status(200).json({ message: "Place deleted", cartItem: deleteCartProduct })
}

const countCartProducts = async(req, res, next) => {
    let cartItems
    try {
        cartItems = await Cart.countDocuments()
        console.log(cartItems);
    } catch (err) {
        console.log(err);
    }
    res.json(cartItems)
}


exports.createProduct = createProduct
exports.getProducts = getProducts
exports.getProductById = getProductById
exports.cartProduct = cartProduct
exports.getCart = getCart
exports.deleteCartProduct = deleteCartProduct
exports.countCartProducts = countCartProducts
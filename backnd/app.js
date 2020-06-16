const fs = require('fs');
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/user-routes')
const HttpError = require('./models/http-error')
const { check } = require('express-validator')
const mongoose = require('mongoose')
const productsRoutes = require('./routes/products-routes')
const cartRoutes = require('./routes/cart-routes')
const postRoutes = require('./routes/post-routes')
const cors = require('cors')

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorozation')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

    next()
})

app.use(bodyParser.json())

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// app.use(cors())



app.use('/api/places', placesRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/product', productsRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/social', postRoutes)

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404)
    throw error
})

app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => {
          console.log(err);
        });
      }
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({ message: error.message || "Unknown error occured" })
})

mongoose
    .connect('mongodb://localhost:27017/Mern', { useNewUrlParser: true, useUnifiedTopology: true, retryWrites:false })
    .then(() => {
        app.listen(5000)
        console.log('Connected !!!')
    })
    .catch(err => {
        console.log(err);

    })
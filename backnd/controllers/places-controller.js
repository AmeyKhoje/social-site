const uuid = require('uuid/v4')
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const HttpError = require('../models/http-error')
const getCoordinatesByAddress = require('../util/location')
const Place = require('../models/place')
const User = require('../models/user')

let DUMMY_PLACES = [{
    id: "p1",
    title: "Taj mahal",
    description: "Best place in world to visit",
    location: {
        lat: 40.7404474,
        lng: -73.9871516
    },
    address: "Agra, Uttar Pradesh",
    creator: "u1"
}]

const getPlaceById = async(req, res, next) => {
    console.log('GET requests in places')
    const placeId = req.params.pid

    let place
    try {
        place = await Place.findById(placeId)
    } catch (err) {
        const error = new HttpError(
            'Something went wrong. Could not find place',
            500
        )

        return next(error)
    }

    if (!place) {
        const error = new HttpError(
            'Could not find place for provoded id',
            500
        )
        return next(error)
    } else {
        res.json({ place: place.toObject({ getters: true }) })
        console.log(placeId);
    }
}

const getPlacesByUserId = async(req, res, next) => {
    const userId = req.params.uid
    let userWithPlaces
    try {
        userWithPlaces = await User.findById(userId).populate('places')
    } catch (err) {
        const error = new HttpError(
            'Something went wrong. Could not find place',
            500
        )
        return next(error)
    }
    if (!userWithPlaces || userWithPlaces.places.length === 0) {
        const error = new HttpError(
            'Could not find place of provided user id',
            404
        )
        return next(error)

    }
    res.json({ places: userWithPlaces.places.map(place => place.toObject({ getters: true })) })
    console.log(places);
}

const createPlace = async(req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        next(new HttpError('Invalid input passed, please check your data', 422))
    }
    const { title, description, address, creator } = req.body //this is shortcut for const title = req.body.title

    // let coordinates
    // try {
    //     coordinates = await getCoordinatesByAddress(address)
    // } catch (error) {
    //     return next(error)
    // }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: {
            lat: '123654',
            lng: '125896'
        },
        image: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        creator
    })
    console.log(createdPlace);

    let user
    try {
        user = await User.findById(creator)
        console.log(`find: ${user}`);


    } catch (err) {
        const error = new HttpError(
            'Creating place failed, please try again man!', 500
        )
        return next(error)
    }
    if (!user) {
        const error = new HttpError(
            'User not found', 404
        )
        return next(error)
    }
    try {

        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdPlace.save(sess)
        user.places.push(createdPlace)
        await user.save(sess)
        sess.commitTransaction()
        console.log(sess.commitTransaction());
        await createdPlace.save()
    } catch (err) {
        const error = new HttpError(
            'Creating place failed, please try again dude',
            500
        )
        return next(error)
    }

    // try {
    //     await createdPlace.save()

    // } catch (err) {
    //     const error = new HttpError(
    //         'Cannot create place', 500
    //     )
    // }

    // DUMMY_PLACES.push(createdPlace)

    res.status(201).json({ place: createdPlace })


}

const updatePlace = async(req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.group(errors)
        return next(
            new HttpError('Invalid input passed, please check your data', 422)
        )
    }
    const { title, description } = req.body

    const placeId = req.params.pid

    let place

    try {
        place = await Place.findById(placeId)
    } catch (err) {
        const error = new HttpError(
            'Cannot find place to update',
            500
        )
        return next(error)
    }

    place.title = title
    place.description = description

    try {
        await place.save()
    } catch (err) {
        const error = new HttpError(
            'Cannot update place', 500
        )

        return next(error)
    }

    res.status(200).json({ place: place.toObject({ getters: true }) })

}

const deletePlace = async(req, res, next) => {
    const placeId = req.params.pid

    let place
    try {
        place = await Place.findById(placeId).populate('creator')
    } catch (err) {
        const errror = new HttpError(
            'Could not delete pllace', 500
        )
        return next(error)
    }

    if (!place) {
        const error = new HttpError(
            'Couldnt find place', 500
        )
        return next(error)
    }

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await place.remove(sess)
        place.creator.places.pull(place)
        await place.creator.save(sess)
        await sess.commitTransaction()
    } catch (err) {
        const error = new HttpError(
            'Cannot delete place', 500
        )
        return next(error)
    }

    res.status(200).json({ message: 'Deleted Place Succcessfully', place: deletePlace })
}

exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace
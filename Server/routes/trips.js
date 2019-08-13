const express = require('express');
const router = express.Router();
const tripsRepo = require('../repositories/tripsRepository');

router.get('/', async (req, res, next) => {
    try {
        const tripsList = await tripsRepo.getAllTrips();
        res.send(tripsList);
    } catch (err) {
        res.status(500).send(`There was a problem getting trips list.\n Error: ${err.message}`)
    };
});

router.get('/getUserTrips/:userId', async (req, res, next) => {
    try {
        const tripsList = await tripsRepo.getUserTrips(req.params.userId);
        res.send(tripsList);
    } catch (err) {
        res.status(500).send(`There was a problem getting trips list.\n Error: ${err.message}`)
    };
});

router.get('/getTripById/:tripId', async (req, res, next) => {
    try {
        const trip = await tripsRepo.getTripById(req.params.tripId);
        res.send(trip);
    } catch (err) {
        res.status(500).send(`There was a problem getting trip.\n Error: ${err.message}`)
    };
});

router.post('/addTrip', async (req, res, next) => {
    try {
        await tripsRepo.addTrip(req.body.trip);
        res.send('Trip was added successfully');
    } catch (err) {
        res.status(500).send(`There was a problem add trip.\n Error: ${err.message}`)
    };
});

router.post('/updateTrip', async (req, res, next) => {
    try {
        await tripsRepo.updateTrip(req.body.trip);
        res.send('Trip was updated successfully');
    } catch (err) {
        res.status(500).send(`There was a problem update trip.\n Error: ${err.message}`)
    };
});

router.post('/deleteTrip', async (req, res, next) => {
    try {
        await tripsRepo.deleteTrip(req.body.tripId);
        res.send('Trip was deleted successfully');
    } catch (err) {
        res.status(500).send(`There was a problem delete trip.\n Error: ${err.message}`)
    };
});

router.get('/getUserTripsByTypes/:userId', async (req, res, next) => {
    try {
        const tripsList = await tripsRepo.getUserTripsByTypes(req.params.userId);
        res.send(tripsList);
    } catch (err) {
        res.status(500).send(`There was a problem getting trips by types.\n Error: ${err.message}`)
    };
});


module.exports = router;

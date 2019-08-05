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

module.exports = router;

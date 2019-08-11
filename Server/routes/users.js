const express = require('express');
const router = express.Router();
const usersRepo = require('../repositories/usersRepository');

router.get('/', async (req, res, next) => {
    try {
        const usersList = await usersRepo.getAllUsers();
        res.send(usersList);
    } catch (err) {
        res.status(500).send(`There was a problem getting games list.\n Error: ${err.message}`)
    };
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await usersRepo.getUserById(req.id);
        res.send(user);
    } catch (err) {
        res.status(500).send(`There was a problem getting games list.\n Error: ${err.message}`)
    };
});

router.get('/email/:email', async (req, res, next) => {
    try {
        const user = await usersRepo.getUserByEmail(req.params.email);
        res.send(user);
    } catch (err) {
        res.status(500).send(`There was a problem getting games list.\n Error: ${err.message}`)
    };
});

router.post('/adduser', async (req, res, next) => {
    const user = req.body.user;

    try {
        await usersRepo.addUser(user);
        res.send('User was added successfully')
    } catch (err) {
        res.status(500).send(`There was a problem adding the game.\n Error: ${err.message}`)
    }
});

router.post('/login', async (req, res, next) => {
    try {
        res.send(await usersRepo.login(req.body.username, req.body.password));
    } catch (err) {
        res.status(500).send(`There was a problem adding the game.\n Error: ${err.message}`)
    }
})

module.exports = router;

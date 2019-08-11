const dbHelper = require('../dbHelper');

const tripsRepository = {
    getAllTrips: async () => {
        let client;
        try {
            client = await dbHelper.getDbClient();
            const tripsList = await dbHelper.findInCollection(client, 'Trips', 'Trips', {}, {});

            return tripsList;
        } catch (err) {
            console.log(err);
            throw err;
        }
        finally {
            dbHelper.closeClient(client);
        }
    },
    getUserTrips: async (userId) => {
        let client;
        try {
            client = await dbHelper.getDbClient();
            const tripsList = await dbHelper.findInCollection(client, 'Trips', 'Trips', { userid: userId }, {});

            return tripsList;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            dbHelper.closeClient(client);
        }
    },
    addTrip: async (newtrip) => {
        let client;
        try {
            client = await dbHelper.getDbClient();
            result = await dbHelper.insertToCollection(client, 'Trips', 'Trips', newtrip);

            return result;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            dbHelper.closeClient(client);
        }
    },
    getTripById: async (id) => {
        let client;
        try {
            client = await dbHelper.getDbClient();
            const trip = await dbHelper.findById(client, 'Trips', 'Trips', id);

            return trip;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            dbHelper.closeClient(client);
        }
    }, 
    updateTrip: async (updatetrip) => {
        let client;
        try {
            client = await dbHelper.getDbClient();
            const { _id, ...fields } = updatetrip;
            result = await dbHelper.updateInCollection(client, 'Trips', 'Trips', _id, { $set: fields })

            return result;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            dbHelper.closeClient(client);
        }
    },
    deleteTrip: async (tripId) => {
        let client;
        try {
            client = await dbHelper.getDbClient();
            result = await dbHelper.deleteFromCollection(client, 'Trips', 'Trips', tripId)

            return result;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            dbHelper.closeClient(client);
        }
    },
}

module.exports = tripsRepository;
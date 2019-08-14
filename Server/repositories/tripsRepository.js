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
    getUserTripsByTypes: async (userId) => {
        let client;
        try {
            client = await dbHelper.getDbClient();
            const tripsList = await dbHelper.groupBy(client, 'Trips', 'Trips', { _id: '$type', count: { $sum: 1 }}, { userid: { $eq: userId }});

            return tripsList.map((trip) => {
                return {
                    type: trip._id,
                    count: trip.count
                }
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        } finally {
            dbHelper.closeClient(client);
        }
    },
    getByNTR : async (params) => {
        let client;
        try {
            client = await dbHelper.getDbClient();
            result = await dbHelper.getByNTR(client, 'Trips', 'Trips', params);

            return result;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            dbHelper.closeClient(client);
        }
    },
    getViewsPerRegion: async () => {
        let client;
        try {
            client = await dbHelper.getDbClient();
            const viewsList = await dbHelper.groupBy(client, 'Trips', 'Trips', { _id: '$region', count: { $sum: '$views' }}, {});

            return viewsList.map((trip) => {
                return {
                    region: trip._id,
                    views: trip.count
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            dbHelper.closeClient(client);
        }
    },
    getByDVD : async (params) => {
        let client;
        try {
            client = await dbHelper.getDbClient();
            result = await dbHelper.getByDVD(client, 'Trips', 'Trips', params);

            return result;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            dbHelper.closeClient(client);
        }
    }
}

module.exports = tripsRepository;
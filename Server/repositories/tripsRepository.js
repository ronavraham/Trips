const dbHelper = require('../dbHelper');

const tripsRepository = {
    getAllTrips: async () => {
        try {
            const client = await dbHelper.getDbClient();
            const tripsList = await dbHelper.findInCollection(client, 'Trips', 'Trips', {}, {});
            dbHelper.closeClient(client);

            return tripsList;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

module.exports = tripsRepository;
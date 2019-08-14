const dbHelper = require('../dbHelper');
const KNN = require('ml-knn');

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
    getHomeTrips: async (userId) => {
        let client;
        try {
            client = await dbHelper.getDbClient();
            var tripsList = await dbHelper.findInCollection(client, 'Trips', 'Trips', {}, {});
            var predictions = [];

            let forML = tripsList.map((trip) => {
                var days = Math.round(Math.abs((new Date(trip.toDate).getTime() - new Date(trip.fromDate).getTime())/(24*60*60*1000)));
                predictions.push(trip.class);
                return ([
                    trip.typeId,
                    days
                ]);
            });

            var knn = new KNN(forML, predictions);
            const myTrips = await dbHelper.findInCollection(client, 'Trips', 'Trips', { userid: userId }, {});
            let myTripsforML = myTrips.map((trip) => {
                var days = Math.round(Math.abs((new Date(trip.toDate).getTime() - new Date(trip.fromDate).getTime())/(24*60*60*1000)));
                predictions.push(trip.class);
                return ([
                    trip.typeId,
                    days
                ]);
            });

            var ans = knn.predict(myTripsforML);
            var countArr = [0, 0, 0];

            ans.forEach((x) => {
                countArr[x - 1]++;
            });

            const predictClass = countArr.indexOf(Math.max.apply(null, Object.values(countArr)));            
            
            var finalArray = tripsList.filter((x) => {
                return x.class === predictClass + 1;
            });
            
            var notMine = finalArray.filter((x) => {
                return x.userid !== userId;
            });
            var mine = finalArray.filter((x) => {
                return x.userid === userId;
            });

            finalArray = notMine.concat(mine);

            return finalArray;
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
            newtrip.views = 0;

            //ML
            var tripsList = await dbHelper.findInCollection(client, 'Trips', 'Trips', {}, {});
            var predictions = [];

            let forML = tripsList.map((trip) => {
                var days = Math.round(Math.abs((new Date(trip.toDate).getTime() - new Date(trip.fromDate).getTime())/(24*60*60*1000)));
                predictions.push(trip.class);
                return ([
                    trip.typeId,
                    days
                ]);
            });

            var knn = new KNN(forML, predictions);

            var tripVec = [newtrip.typeId, Math.round(Math.abs((new Date(newtrip.toDate).getTime() - new Date(newtrip.fromDate).getTime())/(24*60*60*1000)))]
            var ans = knn.predict(tripVec);
            newtrip.class = ans;    
            
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
            const tripsList = await dbHelper.groupBy(client, 'Trips', 'Trips', { _id: '$selectedTripType', count: { $sum: 1 }}, { userid: { $eq: userId }});

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
            const viewsList = await dbHelper.groupBy(client, 'Trips', 'Trips', { _id: '$selectedTripArea', count: { $sum: '$views' }}, {});

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
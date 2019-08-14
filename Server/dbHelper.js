const { MongoClient, ObjectId } = require('mongodb');
const { connectionUrl } = require('./appConfig');

const dbHelper = {
	getDbClient() {
		return new Promise((resolve, reject) => {
			MongoClient.connect(connectionUrl, (err, client) => {
				if (err) {
					reject(err);
				} else {
					resolve(client);
				}
			});
		});
	},
	findInCollection(client, dbName, collectionName, query, sort) {
		return new Promise((resolve, reject) => {
			const filter = {};
			Object.keys(query).forEach(key => {
				filter[key] = { $regex: `.*${query[key]}.*`, $options:'i' };
			});

			client.db(dbName).collection(collectionName).find(filter).sort(sort).toArray((err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	findById(client, dbName, collectionName, id) {
		return new Promise((resolve, reject) => {
			client.db(dbName).collection(collectionName).findOne({ _id: ObjectId(id)}, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	findByEmail(client, dbName, collectionName, email) {
		return new Promise((resolve, reject) => {
			client.db(dbName).collection(collectionName).findOne({ email: { $eq: email }}, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	groupBy(client, dbName, collectionName, groupParams, match) {
		return new Promise((resolve, reject) => {
			client.db(dbName).collection(collectionName).aggregate([ { $match: match }, { $group: groupParams } ]).
				toArray((err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
		});
	},
	insertToCollection(client, dbName, collectionName, newObject) {
		return new Promise((resolve, reject) => {
			client.db(dbName).collection(collectionName).insertOne(newObject, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	updateInCollection(client, dbName, collectionName, id, newvalues) {
		return new Promise((resolve, reject) => {
			client.db(dbName).collection(collectionName).updateOne({ _id: ObjectId(id) }, newvalues, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	deleteFromCollection(client, dbName, collectionName, id) {
		return new Promise((resolve, reject) => {
			client.db(dbName).collection(collectionName).deleteOne({ _id: ObjectId(id) }, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	getByNTR(client, dbName, collectionName, params) {
		return new Promise((resolve, reject) => {
			const filter = { name: {$regex: ".*" + params.name + ".*"}, type: params.type, region: params.region  };
			client.db(dbName).collection(collectionName).find(filter).toArray((err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	getByDVD(client, dbName, collectionName, params) {
		return new Promise((resolve, reject) => {
			const filter = { description: {$regex: ".*" + params.desc + ".*"},
							 fromDate: { $gte: params.fromDate},
							 toDate: { $lt: params.toDate},
							 views: { $gte: params.viewsFrom, $lt: params.viewsTo } };
			client.db(dbName).collection(collectionName).find(filter).toArray((err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	closeClient(client) {
		client.close();
	}
}

module.exports = dbHelper;
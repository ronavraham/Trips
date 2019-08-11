const dbHelper = require('../dbHelper');

const usersRepository = {
    getAllUsers: async () => {
        try {
            const client = await dbHelper.getDbClient();
            const usersList = await dbHelper.findInCollection(client, 'Trips', 'Users', {}, {});
            dbHelper.closeClient(client);

            return usersList;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    getUserById: async (userId) => {
        try {
            const client = await dbHelper.getDbClient();
            const user = await dbHelper.findById(client, 'Trips', 'Users', userId);
            dbHelper.closeClient(client);

            return user;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    getUserByEmail: async (email) => {
        try {
            const client = await dbHelper.getDbClient();
            const user = await dbHelper.findByEmail(client, 'Trips', 'Users', email);
            dbHelper.closeClient(client);

            return user;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    addUser: async (newuser) => {
        try {
            const client = await dbHelper.getDbClient();
            result = await dbHelper.insertToCollection(client, 'Trips', 'Users', newuser);
            dbHelper.closeClient(client);

            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    login: async (username, pass) => {
        try {
            const client = await dbHelper.getDbClient();
            const user = await dbHelper.findInCollection(client, 'Trips', 'Users', { username: username, password: pass });
            dbHelper.closeClient(client);

            return user;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

module.exports = usersRepository;
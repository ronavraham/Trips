const dbHelper = require('../dbHelper');

const usersRepository = {
    getAllUsers: async () => {
        let client;
        try {
            client = await dbHelper.getDbClient();
            const usersList = await dbHelper.findInCollection(client, 'Trips', 'Users', {}, {});

            return usersList;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            dbHelper.closeClient(client);
        }
    },
    getUserById: async (userId) => {
        let client;
        try {
            client = await dbHelper.getDbClient();
            const user = await dbHelper.findById(client, 'Trips', 'Users', userId);

            return user;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            dbHelper.closeClient(client);
        }
    },
    addUser: async (newuser) => {
        let client;
        try {
            client = await dbHelper.getDbClient();
            result = await dbHelper.insertToCollection(client, 'Trips', 'Users', newuser);

            return result;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            dbHelper.closeClient(client);
        }
    },
    login: async (username, pass) => {
        let client;
        try {
            client = await dbHelper.getDbClient();
            const user = await dbHelper.findInCollection(client, 'Trips', 'Users', { username: username, password: pass });
            dbHelper.closeClient(client);

            return user;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            dbHelper.closeClient(client);
        }
    }
}

module.exports = usersRepository;
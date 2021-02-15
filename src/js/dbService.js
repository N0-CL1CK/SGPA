const mysql = require('mysql2');
const dotenv = require('dotenv');

let instance = null;

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: '',
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) console.log(err.message);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((res, rej) => {
                const query = "SELECT * FROM projeto";

                connection.query(query, (err, results) => {
                    if (err) rej(new Error(err.message));

                    res(results);
                });
            });

            console.log(response);

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = DbService;
const { Pool } = require('pg');
const config = require('../config/config.js');

const pool = new Pool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    port: config.db.port,
    database: config.db.database
})

pool.connect((err) => {
    if (err) {
        console.log(" Database connection Error:", err);
    } else {
        console.log("Database connect successfully");
    };
});

module.exports = pool
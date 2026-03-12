const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');

const envpath = path.join(__dirname, `./src/config/.env_${process.env.NODE_ENV}`);
dotenv.config({ path: envpath });
console.log("envpath:", envpath);

const config = require('./src/config/config.js');
const apiRoutes = require('./src/route/indexRoute.js');

require('./src/db/connection.js')

app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' })
});

app.use('/api/v1', apiRoutes);

app.listen(config.server.port, (err) => {
    if (err) {
        console.log("Error in running server");
    } else {
        console.log(`Server is running on PORT:${config.server.port}`);
    };
});
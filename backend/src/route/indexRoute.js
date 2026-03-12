const express = require('express');
const router = express.Router();

const userData = require('./useRoute.js');


router.use('/user', userData);

module.exports = router;
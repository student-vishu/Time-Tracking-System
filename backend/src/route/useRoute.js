const express = require('express');
const router = express.Router();

const { createUser, login } = require('../controller/user.controller.js');

router.post('/createUser', createUser);
router.post('/loginUser', login);

module.exports = router;
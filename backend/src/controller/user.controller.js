const { insertData, selectData } = require('../db/queryHelper.js');
const bcrypt = require('bcrypt');
const config = require('../config/config.js');
const user = config.tables.user;
const { createUserSchema } = require('../utils/validation.js');

const createUser = async (req, res) => {
    try {
        const { error, value } = createUserSchema.validate(req.body, { abortEarly: false });
        if (error) {
            console.log('Invalid credentials in creating user.');
            return res.status(400).json({
                message: 'Invalid credentials in creating user.',
                details: error.details.map(err => err.message)
            });
        };

        const { name, email, password, role } = value;

        if (role === 'admin') {
            console.log('Admin already exist');
            return res.status(409).json({ message: 'Admin already exist' });
        };

        const existingUser = await selectData(user, ['email'], { email });
        console.log("existingUserForCheckEmail:", existingUser);
        if (existingUser.length) {
            console.log("This Email ID user already Exist.");
            return res.status(409).json({ message: "This Email ID user already Exist." });
        };

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await insertData(user, { name, email, password: hashPassword, role }, 'id, name, role');

        if (newUser) {
            console.log('User register success');
            return res.status(201).json({ message: 'User register success', user: newUser[0] });
        } else {
            console.log("User not register");
            return res.status(400).json({ message: "User not register." });
        };
    } catch (error) {
        console.error("Error inserting user:", error);
        return res.status(500).json({ message: "Error registering user" });
    }
}

module.exports = { createUser }
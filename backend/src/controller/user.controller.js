const { insertData, selectData } = require('../db/queryHelper.js');
const bcrypt = require('bcrypt');
const config = require('../config/config.js');
const user = config.tables.user;
const { createUserSchema, loginSchema } = require('../utils/validation.js');
const jwt = require('jsonwebtoken');

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

const login = async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body, { abortEarly: false });
        if (error) {
            console.log('Invalid Credentials in login');
            return res.status(400).json({
                message: "Invalid Credentials in login",
                details: error.details.map(err => err.message)
            });
        };

        const { email, password } = value;

        const existingUser = await selectData(user, { email });
        console.log("existingUserLogin:", existingUser[0]);

        if (!existingUser.length) {
            console.log("User not found.");
            return res.status(401).json({ message: "Invalid email or password." });
        };

        const users = existingUser[0];
        console.log('user:', users);

        //this is not use now , when admin not set password and email portion then use
        // if (!users.password) {
        //     return res.status(403).json({
        //         message: "Password is not set yet. Please set your password first."
        //     });
        // };

        const isMatchPassword = await bcrypt.compare(password, users.password);
        console.log("isMatchPasswordLogin", isMatchPassword);

        if (!isMatchPassword) {
            console.log("Please enter valid password.");
            return res.status(401).json({ message: "Please enter valid password." });
        };

        const token = jwt.sign(
            { id: users.id, email: users.email, role: users.role },
            config.jwt.secret,
            { expiresIn: config.jwt.expiry }
        );

        return res.status(200).json({
            message: "User Login Successfully",
            token,
            user: {
                id: users.id,
                name: users.name,
                email: users.email,
                role: users.role
            }
        });

    } catch (error) {
        console.error("Error in login user.", error);
        return res.status(500).json({ message: "Error in login user.", error: error.message });
    }
}

module.exports = { createUser, login }
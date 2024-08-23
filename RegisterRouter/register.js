const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../database'); // Ensure you have a database connection module

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, phone_number, address, password,roll_no,proper_roll} = req.body;
    try {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user data into the registerdata table
        const result = await pool.query(
            `INSERT INTO registerdatas (name, email, phone_number, address, password,roll_no,proper_roll) VALUES ($1, $2, $3, $4, $5,$6,$7) RETURNING *`,
            [name, email, phone_number, address, hashedPassword,roll_no,proper_roll]
        );

        // Get the newly created user data
        const user = result.rows;

        // Respond with the created user data
        res.status(201).json({ user });
    } catch (error) {
        if (error.code === '23505') {
            // Handle unique constraint violation (e.g., email already exists)
            res.status(400).json({ error: 'Email already in use' });
        } else {
            // Handle other errors
            res.status(500).json({ error });
        }
    }
});

module.exports = router;

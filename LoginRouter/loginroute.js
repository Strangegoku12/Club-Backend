const express = require('express');
const pool = require('../database');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(`SELECT * FROM registerdatas WHERE email = $1`, [email]);
        const user = result.rows[0];
        console.log(result.rows[0]);

        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Insert into logindatas including the role
            const result1 = await pool.query(
                `INSERT INTO logindatas (email, password, rolebased) VALUES ($1, $2, $3) RETURNING *`,
                [email, password, user.proper_roll]
            );
            res.status(200).json({ user, loginData: result1.rows[0] });
        } else {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM registerdatas`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

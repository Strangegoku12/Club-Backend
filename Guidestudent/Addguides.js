const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/', async (req, res) => {
    const { name, email, club, phone_no, department, gender, alloted_money } = req.body;

    try {
        // Check if a guide is already assigned to the specified club
        const result1 = await pool.query('SELECT * FROM guidedetails WHERE club = $1', [club]);
        if (result1.rows.length > 0) {
            return res.status(400).json({ message: "A guide is already assigned to this club." });
        }

        // Insert the new guide details into the database
        const result = await pool.query(
            `INSERT INTO guidedetails (name, email, club, phone_no, department, gender, alloted_money) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [name, email, club, phone_no, department, gender, alloted_money]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM guidedetails');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/deleteguide/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM guidedetails WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount > 0) {
            res.json({ message: 'Guide deleted successfully', deletedGuide: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Guide not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;

const express=require('express')
const router=express.Router();
const pool=require('../database')


router.post('/', async (req,res)=>{
    const {name, email, year, club, phone_no, designation, gender, branch}=req.body;

    try{
    const result= await pool.query(`INSERT INTO studentdetail (name, email, year, club, phone_no, designation, gender, branch) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`, [name, email, year, club, phone_no, designation, gender, branch]);
    res.json(result.rows[0])
    }catch(err){
        res.status('500').json({err})
    }

})

router.get('/', async (req,res)=>{
    try{
    const result= await pool.query(`SELECT * FROM studentdetail`)
    res.json(result.rows)
    }catch(err){
        res.status('500').json(err)
    }
})

router.delete('/deletestudent/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM studentdetail WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount > 0) {
            res.json({ message: 'Student deleted successfully', deletedGuide: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports=router;
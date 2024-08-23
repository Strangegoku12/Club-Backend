const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
app.use(cors())

// Middleware to parse JSON bodies
app.use(express.json());

// Database connection
const pool = require('./database'); // Ensure this module correctly exports your pool

// Routes
const registerRoutes = require('./RegisterRouter/register');
const loginRoutes=require('./LoginRouter/loginroute');
app.use('/login',loginRoutes)
// Use the register routes
app.use('/register', registerRoutes);

const addStudentRoutes=require('./Addstudent/Addstudent')
app.use('/addstudent',addStudentRoutes)

const addguidedetails=require('./Guidestudent/Addguides')
app.use('/addguides',addguidedetails)

app.get('/alloted_money',async (req,res)=>{
    try{
      const result1=await pool.query('SELECT SUM(alloted_money) AS total_alloted_money FROM guidedetails;');
      const user=result1.rows[0];
      res.send(user)

    }  catch(err){
         console.log(err)   
    }
})

app.post('/todolist',async(req,res)=>{
  const {appliances,amount}=req.body;
 try{
  const result1 = await pool.query(
    `INSERT INTO tododetails (appliances,amount) VALUES ($1, $2) RETURNING *`,
    [appliances,amount]
  );
    res.status(201).json(result1.rows[0])
 }catch(err){
  res.status(500).json({err})
 }
})

app.get('/showtodolist', async (req, res) => {
  try {
    const result1 = await pool.query('SELECT * FROM tododetails');
    const result2 = await pool.query('SELECT SUM(amount) as totalamount FROM tododetails');
    
    // Combine the results into a single response object
    res.json({
      todos: result1.rows,
      totalAmount: result2.rows[0].totalamount // Assuming only one row for the sum
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/deletetodo/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM tododetails WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount > 0) {
      res.json({ message: 'Todo deleted successfully', deletedTodo: result.rows[0] });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Start the server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

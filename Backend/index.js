const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "covidvaccinesystem"
});

// Registration endpoint for users
app.post('/register', [
  body('username').notEmpty(),
  body('password').notEmpty(),
 
], async (req, res) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id, username: user.username }, 'your_secret_key');
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id, username: user.username}, 'your_secret_key');
      res.json({ user, token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


let hospitals = [
  { id: 1, name: 'Stanley Hospital ', availableSlots: 5 },
  { id: 2, name: 'Apollo Hospital', availableSlots: 3 },
  { id: 3, name: 'Hospital C', availableSlots: 7 },
  { id: 4, name: 'Hospital D', availableSlots: 2 },
  { id: 5, name: 'Hospital E', availableSlots: 4 },
]

// Route to handle booking a slot
app.post('/bookSlot', (req, res) => {
  const { hospitalId } = req.body;

  const hospitalIndex = hospitals.findIndex((hospital) => hospital.id === hospitalId);

  if (hospitalIndex !== -1 && hospitals[hospitalIndex].availableSlots > 0) {
    // Reduce available slots
    hospitals[hospitalIndex].availableSlots -= 1;

    // Respond with updated hospital data
    res.json(hospitals);
  } else {
    // If hospital not found or no available slots, respond with an error
    res.status(400).json({ error: 'Invalid request' });
  }
});

// Other endpoints for managing slots, bookings, etc.

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

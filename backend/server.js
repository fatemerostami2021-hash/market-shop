// backend/server.js
require('dotenv').config({ quiet: true });
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');
const productRoutes = require('./routes/productRoutes'); // NEW

const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'Hypermarket backend is running' });
});

app.use('/api/products', productRoutes); // NEW

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`${GREEN}✓ [SERVER] Running on port ${PORT}${RESET}`);
  connectDB();
});
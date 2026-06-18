require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const portfolioRoutes = require('./routes/portfolio');

const app = express();
connectDB();

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api', limiter);

app.use('/api', portfolioRoutes);

app.get('/', (req, res) => res.json({ message: 'Portfolio API is running.' }));

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

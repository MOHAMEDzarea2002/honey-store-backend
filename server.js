const express = require('express');
const cors = require('cors');
const app = express();

// Config
require('dotenv').config();
require('./config/firebase');
// Routes
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/ProductRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/dashboard', dashboardRoutes);
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(` Server Running On Port ${PORT}`);
});

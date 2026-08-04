const express = require('express');
const cors = require('cors');
require('dotenv').config();

require('./config/firebase');

const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/ProductRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(` Server Running On Port ${PORT}`);
});

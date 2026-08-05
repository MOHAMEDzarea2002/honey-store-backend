// ProductRoutes.js

// import express and create a router
const express = require('express');

// create a router
const route = express.Router();
// import the controller functions
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,

} = require('../controllers/ProductController');
// import the auth middleware
const {
  verifyIdToken
} = require('../middleware/auth');

// the router for getting products
route.get('/', verifyIdToken, getProducts);
route.get('/:id', verifyIdToken, getProductById);
route.post('/', verifyIdToken, createProduct);
route.put('/:id', verifyIdToken, updateProduct);
route.delete('/:id', verifyIdToken, deleteProduct);

// export the router
module.exports = route

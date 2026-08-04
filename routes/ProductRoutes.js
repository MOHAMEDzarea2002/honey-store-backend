
const express = require('express');

const route = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,

} = require('../controllers/ProductController');
const {
  verifyIdToken
} = require('../middleware/auth');

route.get('/', verifyIdToken, getProducts);
route.get('/:id', verifyIdToken, getProductById);
route.post('/', verifyIdToken, createProduct);
route.put('/:id', verifyIdToken, updateProduct);
route.delete('/:id', verifyIdToken, deleteProduct);

module.exports = route

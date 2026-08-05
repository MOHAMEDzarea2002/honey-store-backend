// orderRoutes.js

// import express and create a router
const express = require('express');
// create a router instance
const router = express.Router();

// Controllers
const {
  createOrder,
  getOrders,
  getOrder,
  updateStatus,
  deleteOrder,
} = require('../controllers/orderController');

// the router for getting dashboard
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);
router.put('/:id', updateStatus);
router.delete('/:id', deleteOrder);

// Export the router
module.exports = router;

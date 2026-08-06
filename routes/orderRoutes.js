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

const { verifyIdToken } = require('../middleware/auth')
router.post('/', createOrder);
router.get('/', verifyIdToken, getOrders);
router.get('/:id', verifyIdToken, getOrder);
router.put('/:id', verifyIdToken,updateStatus);
router.delete('/:id', verifyIdToken,deleteOrder);

// Export the router
module.exports = router;

// import express
const express = require('express');

// create a router instance
const router = express.Router();

// import the controller
const { DashboardStatsController } = require('../controllers/dashboardController');
const { verifyIdToken }= require('../middleware/auth')
//  the route for getting dashboard stats
router.get('/', verifyIdToken,DashboardStatsController);

// export the router
module.exports = router;

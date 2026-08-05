// import express
const express = require('express');

// create a router instance
const router = express.Router();

// import the controller
const { DashboardStatsController } = require('../controllers/dashboardController');

//  the route for getting dashboard stats
router.get('/', DashboardStatsController);

// export the router
module.exports = router;

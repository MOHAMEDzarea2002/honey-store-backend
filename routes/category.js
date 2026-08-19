const express = require('express')

const route = express.Router()
const { getCategory } = require('../controllers/category')

route.get('/', getCategory)

module.exports = route

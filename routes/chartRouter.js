const express = require('express')
const router = express.Router()

const ControllerChart = require('../controllers/controllerChart')
const { authentication } = require('../midlewares/auth')

router.post('/add', authentication, ControllerChart.postAddChart)
router.get('/show', authentication, ControllerChart.showChart)

module.exports = router
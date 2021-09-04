var express = require('express');
var router = express.Router();
const driversController = require('../controllers/drivers.controller');

router.route('/:id')
  .get(driversController.getByIdOrName);

router.route('/bySeason/:year')
  .get(driversController.getByYear);

module.exports = router;

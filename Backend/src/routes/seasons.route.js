var express = require('express');
var router = express.Router();
const seasonsController = require('../controllers/seasons.controller');

router.route('/')
  .get(seasonsController.getTopThree);

module.exports = router;

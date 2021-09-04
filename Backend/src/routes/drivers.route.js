import { Router } from 'express';
var router = Router();
import driversController from '../controllers/drivers.controller.js';

router.route('/:id')
  .get(driversController.getByIdOrName);

router.route('/bySeason/:year')
  .get(driversController.getByYear);

export default router;

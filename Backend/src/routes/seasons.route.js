import { Router } from 'express';
var router = Router();
import seasonsController from '../controllers/seasons.controller.js';

router.route('/')
  .get(seasonsController.getTopThree);

export default router;

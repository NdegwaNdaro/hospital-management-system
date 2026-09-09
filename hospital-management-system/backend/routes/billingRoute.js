import express from 'express';
import {
  createBilling,
  getAllBillings,
  getBilling,
  updateBilling,
  markAsPaid
} from '../controllers/billingController.js';

const router = express.Router();

router.post('/', createBilling);
router.get('/', getAllBillings);
router.get('/:id', getBilling);
router.put('/:id', updateBilling);
router.patch('/:id/pay', markAsPaid);

export default router;
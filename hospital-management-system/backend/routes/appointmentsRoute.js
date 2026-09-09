import express from 'express';
import {
  createAppointment,
  getAllAppointments,
  getAppointment,
  updateAppointment,
  cancelAppointment
} from '../controllers/appointmentsController.js';

const router = express.Router();

router.post('/', createAppointment);
router.get('/', getAllAppointments);
router.get('/:id', getAppointment);
router.put('/:id', updateAppointment);
router.patch('/:id/cancel', cancelAppointment);

export default router;
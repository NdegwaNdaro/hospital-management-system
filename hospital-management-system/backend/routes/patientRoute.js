import express from 'express';
import {
  createPatient,
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient
} from '../controllers/patientController.js';

const router = express.Router();

router.post('/', createPatient);
router.get('/', getAllPatients);
router.get('/:id', getPatient);
router.put('/:id', updatePatient);
router.patch('/:id', deletePatient); // Soft delete

export default router;
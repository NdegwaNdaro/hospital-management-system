import express from 'express';
import {
  createDoctor,
  getAllDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor
} from '../controllers/doctorsController.js';

const router = express.Router();

router.post('/', createDoctor);
router.get('/', getAllDoctors);
router.get('/:id', getDoctor);
router.put('/:id', updateDoctor);
router.patch('/:id', deleteDoctor); // Soft delete

export default router;
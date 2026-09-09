import express from 'express';
import {
  createStaff,
  getAllStaff,
  getStaff,
  updateStaff,
  deleteStaff
} from '../controllers/staffController.js';

const router = express.Router();

router.post('/', createStaff);
router.get('/', getAllStaff);
router.get('/:id', getStaff);
router.put('/:id', updateStaff);
router.patch('/:id', deleteStaff); // Soft delete

export default router;
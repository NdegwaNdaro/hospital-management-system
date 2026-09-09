import express from 'express';
import {
  createDepartment,
  getAllDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment
} from '../controllers/departmentController.js';

const router = express.Router();

router.post('/', createDepartment);
router.get('/', getAllDepartments);
router.get('/:id', getDepartment);
router.put('/:id', updateDepartment);
router.patch('/:id', deleteDepartment);

export default router;
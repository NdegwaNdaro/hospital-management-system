import express from 'express';
import {
  createMedicalRecord,
  getPatientMedicalHistory,
  getMedicalRecord,
  updateMedicalRecord
} from '../controllers/medicalRecordsController.js';

const router = express.Router();

router.post('/', createMedicalRecord);
router.get('/patient/:patientId', getPatientMedicalHistory);
router.get('/:id', getMedicalRecord);
router.put('/:id', updateMedicalRecord);

export default router;
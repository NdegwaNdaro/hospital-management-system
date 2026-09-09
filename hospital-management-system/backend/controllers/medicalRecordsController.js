import MedicalRecord from '../data/medicalRecord.js';

// Create Medical Record
export const createMedicalRecord = async (req, res) => {
  try {
    const medicalRecord = new MedicalRecord(req.body);
    await medicalRecord.save();

    res.status(201).json({
      success: true,
      message: 'Medical record created successfully',
      data: medicalRecord
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get Patient's Medical History
export const getPatientMedicalHistory = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patient: req.params.patientId })
      .populate('doctor', 'firstName lastName specialization')
      .populate('appointment')
      .sort({ visitDate: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Single Record
export const getMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate('patient', 'firstName lastName')
      .populate('doctor', 'firstName lastName');

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Medical Record
export const updateMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Medical record updated successfully',
      data: record
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
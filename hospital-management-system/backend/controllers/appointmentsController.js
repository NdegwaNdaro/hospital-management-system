import Appointment from '../data/AppointmentSchema.js';

// Create Appointment
export const createAppointment = async (req, res) => {
  try {
    const { doctor, date, time } = req.body;

    // checking if the doctor is available
    const existingAppointment = await Appointment.findOne({
      doctor,
      date,
      time,
      status: { $nin: ['Cancelled', 'NoShow'] }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'Doctor is not available at this time'
      });
    }

    const appointment = new Appointment(req.body);
    await appointment.save();

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Appointments
export const getAllAppointments = async (req, res) => {
  try {
    const { doctor, patient, status, date } = req.query;

    let query = {};
    if (doctor) query.doctor = doctor;
    if (patient) query.patient = patient;
    if (status) query.status = status;
    if (date) query.date = new Date(date);

    const appointments = await Appointment.find(query)
      .populate('patient', 'firstName lastName patientId')
      .populate('doctor', 'firstName lastName specialization')
      .populate('department', 'name')
      .sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Single Appointment
export const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient')
      .populate('doctor')
      .populate('department');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Appointment
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Cancel Appointment
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'Cancelled' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
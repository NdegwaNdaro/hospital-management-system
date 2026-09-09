import Billing from '../data/billingSchema.js';

// Create Billing / Invoice
export const createBilling = async (req, res) => {
  try {
    const billing = new Billing(req.body);
    await billing.save();

    res.status(201).json({
      success: true,
      message: 'Billing record created successfully',
      data: billing
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Billings
export const getAllBillings = async (req, res) => {
  try {
    const { patient, paymentStatus } = req.query;

    let query = {};
    if (patient) query.patient = patient;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    const billings = await Billing.find(query)
      .populate('patient', 'firstName lastName patientId')
      .populate('appointment')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: billings.length,
      data: billings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Single Billing
export const getBilling = async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id)
      .populate('patient', 'firstName lastName')
      .populate('appointment');

    if (!billing) {
      return res.status(404).json({
        success: false,
        message: 'Billing record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: billing
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Billing (e.g., Mark as Paid)
export const updateBilling = async (req, res) => {
  try {
    const billing = await Billing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!billing) {
      return res.status(404).json({
        success: false,
        message: 'Billing record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Billing updated successfully',
      data: billing
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Mark as Paid
export const markAsPaid = async (req, res) => {
  try {
    const billing = await Billing.findByIdAndUpdate(
      req.params.id,
      { 
        paymentStatus: 'Paid',
        paymentDate: new Date(),
        paymentMethod: req.body.paymentMethod || 'Cash'
      },
      { new: true }
    );

    if (!billing) {
      return res.status(404).json({
        success: false,
        message: 'Billing record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment recorded successfully',
      data: billing
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
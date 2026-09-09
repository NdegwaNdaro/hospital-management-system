import Staff from '../data/staffSchema.js';

// Create Staff
export const createStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();

    res.status(201).json({
      success: true,
      message: 'Staff member created successfully',
      data: staff
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

//  All Staff members 
export const getAllStaff = async (req, res) => {
  try {
    const { role, department } = req.query;
    
    let query = {};
    if (role) query.role = role;
    if (department) query.department = department;

    const staff = await Staff.find(query)
      .populate('department', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: staff.length,
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Single Staff member
export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id)
      .populate('department', 'name');

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Staff
export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Staff updated successfully',
      data: staff
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// a soft staff member delete
export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Staff member deactivated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
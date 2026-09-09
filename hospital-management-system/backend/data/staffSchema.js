import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },

  role: { 
    type: String, 
    enum: ['Nurse', 'Admin', 'Technician', 'Receptionist', 'Pharmacist', 'LabTechnician', 'Other'], 
    required: true 
  },

  department: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department' 
  },

  contactNumber: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true 
  },

  // Enhanced Shift Management
  shifts: [{
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    shiftType: { 
      type: String, 
      enum: ['Morning', 'Evening', 'Night', 'General'] 
    },
    ward: String,                    // e.g., "ICU", "General Ward"
    isAssigned: { type: Boolean, default: true }
  }],

  qualifications: [{ type: String }],
  specialization: String,             // e.g., "Pediatric", "Cardiac"

  status: { 
    type: String, 
    enum: ['Active', 'Inactive', 'OnLeave'], 
    default: 'Active' 
  },
profilePicture: String,
isActive: { type: Boolean, default: true },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

export default mongoose.model('Staff', staffSchema);
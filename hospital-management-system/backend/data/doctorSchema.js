import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  // Personal Information
  firstName: { 
    type: String, 
    required: true,
    trim: true 
  },
  lastName: { 
    type: String, 
    required: true,
    trim: true 
  },

  // Professional Details
  specialization: { 
    type: String, 
    required: true,
    trim: true 
  },
  qualifications: [{ 
    type: String 
  }],
  experienceYears: { 
    type: Number, 
    min: 0,
    default: 0 
  },
  licenseNumber: { 
    type: String, 
    required: true, 
    unique: true,
    uppercase: true,
    trim: true
  },

  // Contact
  contactNumber: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },

  // Hospital Affiliation
  department: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department', 
    required: true 
  },

  // Availability Schedule
  availability: [{
    day: { 
      type: String, 
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true 
    },
    startTime: { type: String, required: true },   
    endTime: { type: String, required: true }      
  }],

  // Status
  status: { 
    type: String, 
    enum: ['Active', 'Inactive', 'OnLeave'], 
    default: 'Active' 
  },
  consultationFee: { type: Number, min: 0 },
profilePicture: String,
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
isActive: { type: Boolean, default: true },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
},

 { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export default mongoose.model('Doctor', doctorSchema);
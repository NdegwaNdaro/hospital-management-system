import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    uppercase: true
  },
  description: { 
    type: String,
    trim: true 
  },

  // Leadership
  head: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor' 
  },

  // Location & Contact
  location: { 
    type: String,
    trim: true 
  },
  contactNumber: String,
  email: { 
    type: String,
    lowercase: true,
    trim: true 
  },

  // Additional Info
  operatingHours: {
    startTime: String,
    endTime: String
  },

  isActive: { 
    type: Boolean, 
    default: true 
  },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
},{ 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export default mongoose.model('Department', departmentSchema);
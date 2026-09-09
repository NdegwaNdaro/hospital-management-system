import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
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
  dateOfBirth: { 
    type: Date, 
    required: true 
  },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Other'], 
    required: true 
  },
  bloodGroup: { 
    type: String, 
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] 
  },

  // Contact Information
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
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'Kenya' } 
  },
  emergencyContact: {
    name: String,
    relationship: String,
    contactNumber: String
  },
  insuranceDetails: {
    provider: String,
    policyNumber: String,
    expiryDate: Date
  },

  // Relationships
  medicalHistory: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'MedicalRecord' 
  }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export default  mongoose.model('Patient', patientSchema);
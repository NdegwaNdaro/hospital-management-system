import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  // References
  patient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient', 
    required: true 
  },
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor', 
    required: true 
  },
  appointment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Appointment' 
  },

  // Visit Details
  visitDate: { 
    type: Date, 
    default: Date.now 
  },

  // Clinical Information
  symptoms: [{ 
    type: String, 
    trim: true 
  }],
  diagnosis: [{ 
    type: String, 
    trim: true 
  }],
  treatment: { 
    type: String, 
    trim: true 
  },

  // Medications
  medications: [{
    name: { type: String, required: true },
    dosage: String,
    frequency: String,
    duration: String,
    notes: String
  }],

  // Additional
  notes: { 
    type: String, 
    trim: true 
  },
  attachments: [{ 
    type: String   // Cloudinary / AWS S3 URLs
  }],
  vitalSigns: {
    bloodPressure: String,   // e.g., "120/80"
    temperature: Number,
    heartRate: Number,
    weight: Number,
    height: Number
  },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export default mongoose.model('MedicalRecord', medicalRecordSchema);
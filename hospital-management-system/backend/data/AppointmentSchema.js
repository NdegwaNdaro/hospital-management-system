import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  // Core References
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
  department: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department' 
  },

  // Scheduling
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String, 
    required: true   // e.g., "10:30 AM"
  },
  duration: { 
    type: Number, 
    default: 30,     // in minutes
    min: 15 
  },

  // Status & Details
  status: { 
    type: String, 
    enum: [
      'Scheduled', 
      'Confirmed', 
      'InProgress', 
      'Completed', 
      'Cancelled', 
      'NoShow'
    ], 
    default: 'Scheduled' 
  },
  reason: { 
    type: String, 
    trim: true 
  },
  notes: { 
    type: String, 
    trim: true 
  },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for fast queries
appointmentSchema.index({ doctor: 1, date: 1 });
appointmentSchema.index({ patient: 1, date: 1 });

export default mongoose.model('Appointment', appointmentSchema);
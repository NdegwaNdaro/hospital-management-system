import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  // Authentication
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6 
  },

  // Role & Authorization
  role: { 
    type: String, 
    enum: [
      'Admin', 
      'Doctor', 
      'Nurse', 
      'Staff', 
      'Receptionist', 
      'Patient'
    ], 
    required: true 
  },

  // Link to Profile
  profileId: { 
    type: mongoose.Schema.Types.ObjectId 
  },
  profileModel: { 
    type: String, 
    enum: ['Patient', 'Doctor', 'Staff'] 
  },

  // Status
  isActive: { 
    type: Boolean, 
    default: true 
  },

  // Security
  lastLogin: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  profilePicture: String,
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
},
{ 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
);

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
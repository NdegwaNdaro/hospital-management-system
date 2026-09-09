import mongoose from 'mongoose';

const billingSchema = new mongoose.Schema({
  // References
  patient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient', 
    required: true 
  },
  appointment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Appointment' 
  },

  // Invoice Items
  items: [{
    description: { 
      type: String, 
      required: true,
      trim: true 
    },
    amount: { 
      type: Number, 
      required: true,
      min: 0 
    },
    quantity: { 
      type: Number, 
      default: 1,
      min: 1 
    }
  }],

  // Financials
  subtotal: { 
    type: Number,
    required: true 
  },
  discount: { 
    type: Number, 
    default: 0,
    min: 0 
  },
  tax: { 
    type: Number, 
    default: 0,
    min: 0 
  },
  finalAmount: { 
    type: Number,
    required: true 
  },

  // Payment
  paymentStatus: { 
    type: String, 
    enum: ['Pending', 'Paid', 'PartiallyPaid', 'Overdue', 'Cancelled'], 
    default: 'Pending' 
  },
  paymentMethod: { 
    type: String, 
    enum: ['Cash', 'Card', 'UPI', 'Insurance', 'Online', 'Other'] 
  },
  paymentDate: Date,

  invoiceNumber: { 
    type: String, 
    unique: true,
    required: true 
  },

  // Insurance
  insuranceClaim: {
    claimNumber: String,
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'] },
    amountCovered: Number
  },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Pre-save middleware to calculate totals
billingSchema.pre('save', function(next) {
  if (this.items && this.items.length > 0) {
    this.subtotal = this.items.reduce((sum, item) => {
      return sum + (item.amount * item.quantity);
    }, 0);
  }
  
  this.finalAmount = this.subtotal - this.discount + this.tax;
  next();
})
billingSchema.index({invoiceNumber:1,patient:1})
export default mongoose.model('Billing', billingSchema);
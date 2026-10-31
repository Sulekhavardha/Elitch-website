import mongoose from 'mongoose';

const pdfLeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Your Name is required'],
      trim: true,
      maxlength: [120, 'Name cannot exceed 120 characters']
    },
    email: {
      type: String,
      required: [true, 'Your Official Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    company: {
      type: String,
      trim: true,
      default: '',
      maxlength: [150, 'Company name cannot exceed 150 characters']
    },
    jobTitle: {
      type: String,
      trim: true,
      default: '',
      maxlength: [120, 'Job title cannot exceed 120 characters']
    },
    country: {
      type: String,
      trim: true,
      default: '',
      maxlength: [100, 'Country cannot exceed 100 characters']
    },
    phone: {
      type: String,
      trim: true,
      default: '',
      maxlength: [40, 'Phone number cannot exceed 40 characters']
    },
    industry: {
      type: String,
      trim: true,
      default: '',
      maxlength: [100, 'Industry cannot exceed 100 characters']
    },
    message: {
      type: String,
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
      default: ''
    },
    privacyAccepted: {
      type: Boolean,
      required: [true, 'Privacy policy acceptance is required'],
      default: true
    },
    source: {
      type: String,
      default: 'Panel Book Download Form',
      trim: true
    },
    downloadCount: {
      type: Number,
      default: 1
    },
    ipAddress: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Follow-up', 'Archived'],
      default: 'New'
    }
  },
  {
    timestamps: true
  }
);

// Indexes for fast searching and filtering in the admin panel
pdfLeadSchema.index({ email: 1 });
pdfLeadSchema.index({ createdAt: -1 });
pdfLeadSchema.index({ company: 1 });
pdfLeadSchema.index({ industry: 1 });
pdfLeadSchema.index({ country: 1 });

const PdfLead = mongoose.models.PdfLead || mongoose.model('PdfLead', pdfLeadSchema);
export default PdfLead;


const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  clientName: { type: String, required: true },
  clientPan: { type: String, required: true },
  taskType: {
    type: String,
    enum: ['GST_FILING', 'TDS_RETURN', 'INCOME_TAX', 'STATUTORY_AUDIT', 'COMPANY_ROC'],
    required: true
  },
  assignedToUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'UNDER_REVIEW', 'COMPLETED'],
    default: 'PENDING'
  },
  documents: [{
    fileName: String,
    storageProvider: { type: String, enum: ['S3', 'AZURE'], default: 'S3' },
    storageKey: String,
    fileSize: Number,
    lastModified: Date
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);

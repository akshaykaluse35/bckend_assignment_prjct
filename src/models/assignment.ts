import mongoose, { Schema, Document } from 'mongoose';

interface AssignmentDocument extends Document {
  userId: string;
  task: string;
  admin: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const assignmentSchema = new Schema({
  userId: { type: String, required: true },
  task: { type: String, required: true },
  admin: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

const AssignmentModel = mongoose.model<AssignmentDocument>('Assignment', assignmentSchema);

export default AssignmentModel;

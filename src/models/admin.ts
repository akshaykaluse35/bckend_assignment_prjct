import mongoose, { Schema, Document } from 'mongoose';

interface AdminDocument extends Document {
  adminName: string;
  password: string;
}

const adminSchema = new Schema({
  adminName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const AdminModel = mongoose.model<AdminDocument>('Admin', adminSchema);

export default AdminModel;

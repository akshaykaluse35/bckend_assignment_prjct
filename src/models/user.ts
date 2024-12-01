import mongoose, { Schema, Document } from 'mongoose';

interface UserDocument extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;

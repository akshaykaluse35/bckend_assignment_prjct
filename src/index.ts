import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from '../src/routes/user';
import adminRoutes from '../src/routes/admin';
import cors from 'cors';



dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI as string;


mongoose
  .connect(mongoURI, {
    dbName: 'backend_assignment', // Replace with your database name
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));


app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Assignment Submission Portal is running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

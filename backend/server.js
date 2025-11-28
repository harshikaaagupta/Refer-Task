import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import Config from './models/Config.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Initialize config
const initConfig = async () => {
  const existing = await Config.findOne({ key: 'referralReward' });
  if (!existing) {
    await Config.create({ key: 'referralReward', value: 100 });
    console.log('Config initialized with referralReward: 100');
  }
};

initConfig();

app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

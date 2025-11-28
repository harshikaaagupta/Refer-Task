import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  referralCode: {
    type: String,
    unique: true,
    required: true
  },
  coins: {
    type: Number,
    default: 0
  },
  referredBy: {
    type: String,
    default: null
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);

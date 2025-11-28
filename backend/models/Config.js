import mongoose from 'mongoose';

const configSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: Number,
    required: true
  }
});

export default mongoose.model('Config', configSchema);

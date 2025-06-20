import mongoose from 'mongoose';

const shelterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  capacity: { type: Number, default: 0 },
  supplies: { type: String, default: '' },
  address: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Shelter', shelterSchema);

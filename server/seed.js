import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Shelter from './models/Shelter.js';

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

const seedShelters = async () => {
  await Shelter.deleteMany({});
  await Shelter.insertMany([
    { name: 'Central Community Center', lat: 34.05, lon: -118.2437, capacity: 200, supplies: 'Water, Food', address: '123 Main St' },
    { name: 'Eastside Shelter',        lat: 34.0611, lon: -118.2345, capacity: 150, supplies: 'Blankets, Medical Aid', address: '456 East Ave' }
  ]);
  console.log('🌱 Database seeded');
  mongoose.disconnect();
};

seedShelters();

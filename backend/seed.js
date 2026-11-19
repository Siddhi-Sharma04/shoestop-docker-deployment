/**
 * ShoeStop - Database Seed Script
 * Run: node seed.js
 * Populates the database with sample shoe products
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const Product = require('./modal/productSchema');

const MONGO_URI = process.env.MONGO_URI || process.env.mongoURI || 'mongodb://admin:admin123@localhost:27017/shoestop?authSource=admin';

const sampleProducts = [
  {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    title: 'Nike Air Max 270',
    company: 'Nike',
    price: '8999'
  },
  {
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
    title: 'Adidas Ultraboost 22',
    company: 'Adidas',
    price: '12499'
  },
  {
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400',
    title: 'Puma RS-X',
    company: 'Puma',
    price: '6999'
  },
  {
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400',
    title: 'New Balance 574',
    company: 'New Balance',
    price: '7499'
  },
  {
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400',
    title: 'Reebok Classic Leather',
    company: 'Reebok',
    price: '5999'
  },
  {
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
    title: 'Converse Chuck Taylor',
    company: 'Converse',
    price: '3999'
  },
  {
    image: 'https://images.unsplash.com/photo-1584735175315-9d5df23be7be?w=400',
    title: 'Vans Old Skool',
    company: 'Vans',
    price: '4499'
  },
  {
    image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=400',
    title: 'Jordan 1 Retro High',
    company: 'Jordan',
    price: '14999'
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected! Seeding products...');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${inserted.length} products!`);

    inserted.forEach(p => console.log(`  ✓ ${p.title} - Rs.${p.price}`));

    mongoose.disconnect();
    console.log('\nDatabase seeding complete!');
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();

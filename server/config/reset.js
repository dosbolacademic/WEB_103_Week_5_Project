import dotenv from 'dotenv';
dotenv.config();  // Loads .env into process.env

import { pool } from './database.js';

async function resetDB() {
  try {
    // Create wheels_options table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS wheels_options (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image_url TEXT
      );
    `);

    // Create exteriors_options table (for colors)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS exteriors_options (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image_url TEXT
      );
    `);

    // Create custom_items table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS custom_items (
        id SERIAL PRIMARY KEY,
        wheels_id INTEGER REFERENCES wheels_options(id),
        exterior_id INTEGER REFERENCES exteriors_options(id),
        total_price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed wheels_options
    await pool.query(`
      INSERT INTO wheels_options (name, price, image_url)
      VALUES
        ('Standard Wheels', 0.00, 'https://via.placeholder.com/100?text=Standard+Wheels'),
        ('Alloy Wheels', 500.00, 'https://via.placeholder.com/100?text=Alloy+Wheels'),
        ('Gold Wheels', 1000.00, 'https://via.placeholder.com/100?text=Gold+Wheels')
      ON CONFLICT (id) DO NOTHING;
    `);

    // Seed exteriors_options
    await pool.query(`
      INSERT INTO exteriors_options (name, price, image_url)
      VALUES
        ('Red', 0.00, 'https://via.placeholder.com/300x200/ff0000/ffffff?text=Red+Car'),
        ('Blue', 1000.00, 'https://via.placeholder.com/300x200/0000ff/ffffff?text=Blue+Car'),
        ('Black', 500.00, 'https://via.placeholder.com/300x200/000000/ffffff?text=Black+Car')
      ON CONFLICT (id) DO NOTHING;
    `);

    console.log('Database reset and seeded successfully!');
  } catch (err) {
    console.error('Error resetting DB:', err);
  } finally {
    await pool.end();
  }
}

resetDB();
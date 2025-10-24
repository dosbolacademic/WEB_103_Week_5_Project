import dotenv from 'dotenv';
dotenv.config();

import { pool } from './database.js';

async function resetDB() {
  try {
    // Drop tables if they exist (for clean reset - optional, remove if you want to preserve data)
    await pool.query('DROP TABLE IF EXISTS custom_items CASCADE');
    await pool.query('DROP TABLE IF EXISTS wheels_options CASCADE');
    await pool.query('DROP TABLE IF EXISTS exteriors_options CASCADE');

    // Create wheels_options table
    await pool.query(`
      CREATE TABLE wheels_options (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image_url TEXT
      );
    `);

    // Create exteriors_options table
    await pool.query(`
      CREATE TABLE exteriors_options (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image_url TEXT
      );
    `);

    // Create custom_items table
    await pool.query(`
      CREATE TABLE custom_items (
        id SERIAL PRIMARY KEY,
        wheels_id INTEGER REFERENCES wheels_options(id),
        exterior_id INTEGER REFERENCES exteriors_options(id),
        total_price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed wheels_options
    await pool.query(`
      INSERT INTO wheels_options (name, price, image_url) VALUES
        ('Standard Wheels', 0.00, 'https://via.placeholder.com/100x100/808080/ffffff?text=Standard'),
        ('Alloy Wheels', 500.00, 'https://via.placeholder.com/100x100/c0c0c0/ffffff?text=Alloy'),
        ('Gold Wheels', 1000.00, 'https://via.placeholder.com/100x100/ffd700/000000?text=Gold');
    `);

    // Seed exteriors_options
    await pool.query(`
      INSERT INTO exteriors_options (name, price, image_url) VALUES
        ('Red', 0.00, 'https://via.placeholder.com/300x200/ff0000/ffffff?text=Red+Car'),
        ('Blue', 1000.00, 'https://via.placeholder.com/300x200/0000ff/ffffff?text=Blue+Car'),
        ('Black', 500.00, 'https://via.placeholder.com/300x200/000000/ffffff?text=Black+Car');
    `);

    console.log('✅ Database schema created and seeded successfully!');
    console.log('Tables: custom_items, wheels_options, exteriors_options');
    console.log('Seeds: 3 wheels options, 3 exterior options');
  } catch (err) {
    console.error('❌ Error resetting DB:', err.message);
    console.error('Full error:', err);
  } finally {
    await pool.end();
  }
}

resetDB();
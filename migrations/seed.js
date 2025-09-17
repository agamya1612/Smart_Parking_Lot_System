const { pool } = require('../src/config/db');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const seedSQL = fs.readFileSync(path.join(__dirname, '../migrations/seed_db.sql')).toString();
    await pool.query(seedSQL);
    console.log('Database seeded successfully');
  } catch (err) {
    console.error(' Error seeding database:', err);
  } finally {
    pool.end();
  }
})();

const { pool } = require('../migrations/db');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const schema = fs.readFileSync(path.join(__dirname, '../migrations/db.sql')).toString();
    await pool.query(schema);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('X Error initializing database:', err);
  } finally {
    pool.end();
  }
})();

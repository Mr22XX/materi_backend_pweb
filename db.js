const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'belajar_backend'
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi gagal:', err);
  } else {
    console.log('Terhubung ke MySQL ');
  }
});

module.exports = db;
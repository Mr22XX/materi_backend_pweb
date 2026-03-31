const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

app.use(express.static('public'));

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('API berjalan 🚀');
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;

  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: 'User berhasil ditambahkan',
      id: result.insertId
    });
  });
});

app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  const sql = 'UPDATE users SET name=?, email=? WHERE id=?';
  db.query(sql, [name, email, id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: 'User berhasil diupdate' });
  });
});

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM users WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: 'User berhasil dihapus' });
  });
});

app.listen(PORT, () => {
  console.log(`Server di http://localhost:${PORT}`);
});
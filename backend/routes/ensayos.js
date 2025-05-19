const express = require('express');
const router = express.Router();
const pool = require('../db'); // ← OJO: ruta relativa correcta

// Obtener todos los ensayos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ensayos ORDER BY fecha DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener ensayos');
  }
});

// Crear un nuevo ensayo
router.post('/', async (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO ensayos (titulo) VALUES ($1) RETURNING *',
      [titulo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear ensayo');
  }
});

module.exports = router;

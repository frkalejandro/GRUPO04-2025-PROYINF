const express = require('express');
const pool = require('./db'); // Conexión a PostgreSQL
const ensayosRoutes = require('./routes/ensayos'); // NUEVO: ruta de ensayos

const app = express();
const port = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Rutas reales del proyecto
app.use('/api/ensayos', ensayosRoutes);

// Rutas de prueba (las que ya tenías)
app.get('/save', async (req, res) => {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, content TEXT)');
    await pool.query('INSERT INTO messages (content) VALUES ($1)', ['Hola desde PostgreSQL!']);
    res.send('Mensaje guardado en la base de datos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

app.get('/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Bienvenido! Usa /save para guardar un mensaje, /messages para verlos o /api/ensayos para usar la API PAES.');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`App corriendo en http://localhost:${port}`);
});

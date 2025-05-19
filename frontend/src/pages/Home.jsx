import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Home() {
  const [ensayos, setEnsayos] = useState([]);
  const [nuevoTitulo, setNuevoTitulo] = useState('');

  useEffect(() => {
    api.get('/ensayos')
      .then(res => setEnsayos(res.data))
      .catch(err => console.error(err));
  }, []);

  const agregarEnsayo = () => {
    if (!nuevoTitulo.trim()) return;

    api.post('/ensayos', { titulo: nuevoTitulo })
      .then(res => {
        setEnsayos([...ensayos, res.data]);
        setNuevoTitulo('');
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Ensayos PAES</h1>
      <input
        value={nuevoTitulo}
        onChange={e => setNuevoTitulo(e.target.value)}
        placeholder="Título del ensayo"
      />
      <button onClick={agregarEnsayo}>Agregar</button>

      <ul>
        {ensayos.map(e => (
          <li key={e.id}>{e.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

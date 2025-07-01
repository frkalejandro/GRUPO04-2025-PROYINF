// src/ListaEnsayos.jsx
import React, { useEffect, useState } from 'react';
import API from './api';

function ListaEnsayos() {
  const [ensayos, setEnsayos] = useState([]);

  useEffect(() => {
    const fetchEnsayos = async () => {
      try {
        const res = await API.get('/ensayos');
        setEnsayos(res.data);
      } catch (err) {
        alert('❌ Error al obtener ensayos');
      }
    };
    fetchEnsayos();
  }, []);

  return (
    <div>
      <h2>Lista de Ensayos</h2>
      <ul>
        {ensayos.map((e) => (
          <li key={e.id}>
            <strong>ID:</strong> {e.id} — <strong>{e.titulo}</strong> – {e.materia} ({e.fecha?.slice(0, 10)})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaEnsayos;

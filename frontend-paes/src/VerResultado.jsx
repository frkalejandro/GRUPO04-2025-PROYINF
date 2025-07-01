import React, { useState } from 'react';
import API from './api';

function VerResultado() {
  const [usuarioId, setUsuarioId] = useState('');
  const [ensayoId, setEnsayoId] = useState('');
  const [resultado, setResultado] = useState(null);

  const buscarResultado = async () => {
    try {
      const res = await API.get(`/resultados/${usuarioId}/${ensayoId}`);
      setResultado(res.data);
    } catch (err) {
      alert('❌ Error al obtener el resultado');
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>Ver Resultado</h2>
      <input
        placeholder="ID del Usuario"
        value={usuarioId}
        onChange={e => setUsuarioId(e.target.value)}
      />
      <input
        placeholder="ID del Ensayo"
        value={ensayoId}
        onChange={e => setEnsayoId(e.target.value)}
      />
      <button onClick={buscarResultado}>Buscar Resultado</button>

      {resultado && (
        <div>
          <h3>Resultado</h3>
          <p><strong>Total Preguntas:</strong> {resultado.total}</p>
          <p><strong>Correctas:</strong> {resultado.correctas}</p>
          <p><strong>Puntaje:</strong> {resultado.puntaje}</p>
        </div>
      )}
    </div>
  );
}

export default VerResultado;

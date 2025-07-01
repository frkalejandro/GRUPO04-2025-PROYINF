import React, { useEffect, useState } from 'react';
import API from './api';

function ResponderEnsayo() {
  const [ensayoId, setEnsayoId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});

  const buscarPreguntas = async () => {
    try {
      const res = await API.get(`/preguntas/ensayo/${ensayoId}`);
      setPreguntas(res.data);
    } catch (err) {
      alert('❌ Error al obtener preguntas');
    }
  };

  const handleChange = (preguntaId, seleccionada) => {
    setRespuestas({ ...respuestas, [preguntaId]: seleccionada });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      usuarioId: parseInt(usuarioId),
      ensayoId: parseInt(ensayoId),
      respuestas: Object.entries(respuestas).map(([preguntaId, seleccionada]) => ({
        preguntaId: parseInt(preguntaId),
        seleccionada
      }))
    };
    try {
      await API.post('/respuestas', payload);
      alert('✅ Respuestas enviadas');
    } catch (err) {
      alert('❌ Error al enviar respuestas');
    }
  };

  return (
    <div>
      <h2>Responder Ensayo</h2>
      <input
        placeholder="ID del Ensayo"
        value={ensayoId}
        onChange={e => setEnsayoId(e.target.value)}
      />
      <input
        placeholder="ID del Usuario"
        value={usuarioId}
        onChange={e => setUsuarioId(e.target.value)}
      />
      <button onClick={buscarPreguntas}>Cargar Preguntas</button>

      <form onSubmit={handleSubmit}>
        {preguntas.map(p => (
          <div key={p.id}>
            <p><strong>{p.enunciado}</strong></p>
            {Object.entries(p.alternativas).map(([letra, texto]) => (
              <label key={letra}>
                <input
                  type="radio"
                  name={`pregunta_${p.id}`}
                  value={letra}
                  onChange={() => handleChange(p.id, letra)}
                  required
                />
                {letra}) {texto}
              </label>
            ))}
            <hr />
          </div>
        ))}
        {preguntas.length > 0 && <button type="submit">Enviar Respuestas</button>}
      </form>
    </div>
  );
}

export default ResponderEnsayo;

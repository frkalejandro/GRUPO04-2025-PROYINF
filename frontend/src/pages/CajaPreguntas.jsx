import React, { useState } from 'react';

const CajaPreguntas = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [enunciado, setEnunciado] = useState('');
  const [area, setArea] = useState('Matemática');
  const [alternativas, setAlternativas] = useState({ A: '', B: '', C: '', D: '' });
  const [respuestaCorrecta, setRespuestaCorrecta] = useState('A');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlternativas({ ...alternativas, [name]: value });
  };

  const guardarPregunta = () => {
    const nueva = {
      area,
      enunciado,
      alternativas,
      correcta: respuestaCorrecta
    };
    setPreguntas([...preguntas, nueva]);
    // Resetear formulario
    setEnunciado('');
    setAlternativas({ A: '', B: '', C: '', D: '' });
    setRespuestaCorrecta('A');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📦 Caja de Preguntas PAES – Docente</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Área temática:</label>
        <select value={area} onChange={(e) => setArea(e.target.value)}>
          <option>Matemática</option>
          <option>Lenguaje</option>
          <option>Ciencias</option>
          <option>Historia</option>
        </select>
      </div>

      <div>
        <label>Enunciado:</label><br />
        <textarea
          value={enunciado}
          onChange={(e) => setEnunciado(e.target.value)}
          rows="3"
          cols="60"
        />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>Alternativas:</label><br />
        {['A', 'B', 'C', 'D'].map((letra) => (
          <div key={letra}>
            {letra}) <input
              name={letra}
              value={alternativas[letra]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>Respuesta correcta:</label>
        <select value={respuestaCorrecta} onChange={(e) => setRespuestaCorrecta(e.target.value)}>
          {['A', 'B', 'C', 'D'].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <button onClick={guardarPregunta} style={{ marginTop: '1rem' }}>Guardar Pregunta</button>

      <hr />

      <h3>📑 Preguntas guardadas:</h3>
      <ul>
        {preguntas.map((p, idx) => (
          <li key={idx}>
            <strong>[{p.area}]</strong> {p.enunciado} <br />
            A) {p.alternativas.A} | B) {p.alternativas.B} | C) {p.alternativas.C} | D) {p.alternativas.D}  
            <br />✔ Correcta: {p.correcta}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CajaPreguntas;

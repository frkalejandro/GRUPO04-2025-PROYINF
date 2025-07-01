// src/CrearPregunta.jsx
import React, { useState } from 'react';
import API from './api';

function CrearPregunta() {
  const [form, setForm] = useState({
    enunciado: '',
    alternativaA: '',
    alternativaB: '',
    alternativaC: '',
    correcta: '',
    ensayoId: ''
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      enunciado: form.enunciado,
      alternativas: {
        a: form.alternativaA,
        b: form.alternativaB,
        c: form.alternativaC
      },
      correcta: form.correcta,
      ensayoId: form.ensayoId
    };

    try {
      const res = await API.post('/preguntas', payload);
      alert('✅ Pregunta creada: ' + res.data.enunciado);
    } catch (err) {
      alert('❌ Error al crear pregunta');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Pregunta</h2>
      <input name="enunciado" placeholder="Enunciado" onChange={handleChange} required />
      <input name="alternativaA" placeholder="Alternativa A" onChange={handleChange} required />
      <input name="alternativaB" placeholder="Alternativa B" onChange={handleChange} required />
      <input name="alternativaC" placeholder="Alternativa C" onChange={handleChange} required />
      <select name="correcta" onChange={handleChange} required>
        <option value="">-- Alternativa Correcta --</option>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
      </select>
      <input name="ensayoId" placeholder="ID del Ensayo" onChange={handleChange} required />
      <button type="submit">Crear Pregunta</button>
    </form>
  );
}

export default CrearPregunta;

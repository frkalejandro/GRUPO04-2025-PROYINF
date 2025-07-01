// src/CrearEnsayo.jsx
import React, { useState } from 'react';
import API from './api';

function CrearEnsayo() {
  const [form, setForm] = useState({
    titulo: '',
    fecha: '',
    materia: '',
    docenteId: '' // puedes obtenerlo desde login en el futuro
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/ensayos', form);
      alert('✅ Ensayo creado: ' + res.data.titulo);
    } catch (err) {
      alert('❌ Error al crear ensayo: ' + err.response?.data?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Ensayo</h2>
      <input name="titulo" placeholder="Título" onChange={handleChange} required />
      <input name="fecha" type="date" onChange={handleChange} required />
      <input name="materia" placeholder="Materia" onChange={handleChange} required />
      <input name="docenteId" placeholder="ID Docente" onChange={handleChange} required />
      <button type="submit">Crear Ensayo</button>
    </form>
  );
}

export default CrearEnsayo;

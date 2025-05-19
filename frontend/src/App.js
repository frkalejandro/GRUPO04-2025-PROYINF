import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CajaPreguntas from './pages/CajaPreguntas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docente" element={<CajaPreguntas />} />
      </Routes>
    </Router>
  );
}

export default App;

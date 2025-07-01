import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import CrearEnsayo from './CrearEnsayo';
import ListaEnsayos from './ListaEnsayos';
import CrearPregunta from './CrearPregunta';
import ResponderEnsayo from './ResponderEnsayo';
import VerResultado from './VerResultado';
import { useUser } from './UserContext';

function App() {
  const [view, setView] = useState('register');
  const { user, setUser } = useUser();

  const logout = () => {
    setUser(null);
    setView('login');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🧠 Plataforma de Ensayos PAES</h1>

      {user ? (
        <div style={{ marginBottom: '10px' }}>
          <p>
            Bienvenido/a <strong>{user.nombre}</strong> ({user.rol})
            <button onClick={logout} style={{ marginLeft: '15px' }}>🚪 Cerrar sesión</button>
          </p>
        </div>
      ) : (
        <p><em>Por favor inicia sesión o regístrate.</em></p>
      )}

      <div style={{ marginBottom: '20px' }}>
        {!user && (
          <>
            <button onClick={() => setView('register')}>📝 Registro</button>{' '}
            <button onClick={() => setView('login')}>🔐 Login</button>
          </>
        )}

        {user?.rol === 'docente' && (
          <>
            <button onClick={() => setView('crearEnsayo')}>📄 Crear Ensayo</button>{' '}
            <button onClick={() => setView('crearPregunta')}>❓ Crear Pregunta</button>
          </>
        )}

        {user && (
          <>
            <button onClick={() => setView('listarEnsayos')}>📋 Ver Ensayos</button>{' '}
            <button onClick={() => setView('responderEnsayo')}>🧪 Responder Ensayo</button>{' '}
            <button onClick={() => setView('verResultado')}>📊 Ver Resultados</button>
          </>
        )}
      </div>

      <hr />

      {view === 'register' && <Register />}
      {view === 'login' && <Login />}
      {view === 'crearEnsayo' && <CrearEnsayo />}
      {view === 'listarEnsayos' && <ListaEnsayos />}
      {view === 'crearPregunta' && <CrearPregunta />}
      {view === 'responderEnsayo' && <ResponderEnsayo />}
      {view === 'verResultado' && <VerResultado />}
    </div>
  );
}

export default App;

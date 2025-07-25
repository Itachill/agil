import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom'; // ✅ IMPORTAR

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <BrowserRouter> {/* ✅ Esto es clave */}
      <App />
    </BrowserRouter>
  </AuthProvider>
);

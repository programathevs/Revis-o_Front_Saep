import { useState, useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { authService } from '../services/authService';

export default function ProtectedRoute() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function verificarSessao() {
      try {
        const data = await authService.getMe();
        if (data?.usuario) {
          setUsuario(data.usuario);
        } else {
          setUsuario(null);
        }
      } catch {
        setUsuario(null);
      } finally {
        setCarregando(false);
      }
    }
    verificarSessao();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Erro ao encerrar sessão:', err);
    } finally {
      setUsuario(null);
      navigate('/login');
    }
  };

  if (carregando) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Verificando sessão segura...</span>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Navbar usuario={usuario} onLogout={handleLogout} />
      
      <main className="flex-grow-1">
        <Outlet context={{ usuario }} />
      </main>

      <footer className="bg-white border-top py-3 text-center text-muted small mt-auto">
        <span>AutoCare - Sistema de Gestão Automotiva &copy; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

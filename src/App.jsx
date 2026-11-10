// ========================================================
// CONFIGURAÇÃO EXCLUSIVA DE ROTAS DA APLICAÇÃO
// Arquivo: src/App.jsx
// Utiliza React Router com rotas públicas e protegidas
// ========================================================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ClientesPage from './pages/ClientesPage';
import VeiculosPage from './pages/VeiculosPage';
import AgendamentosPage from './pages/AgendamentosPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pública de Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas Privadas (Protegidas por Sessão HttpOnly) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/veiculos" element={<VeiculosPage />} />
          <Route path="/agendamentos" element={<AgendamentosPage />} />
        </Route>

        {/* Redirecionamento Padrão */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

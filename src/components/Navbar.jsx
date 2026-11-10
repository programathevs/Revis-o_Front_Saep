import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ usuario, onLogout }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid px-4">
        <Link to="/dashboard" className="navbar-brand fw-bold text-uppercase tracking-wider text-decoration-none">
          🔧 AutoCare
        </Link>

        {/* Menu de navegação para os recursos do sistema */}
        <div className="navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/dashboard"
                className={`nav-link ${isActive('/dashboard') ? 'active fw-bold text-white' : ''}`}
              >
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/clientes"
                className={`nav-link ${isActive('/clientes') ? 'active fw-bold text-white' : ''}`}
              >
                Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/veiculos"
                className={`nav-link ${isActive('/veiculos') ? 'active fw-bold text-white' : ''}`}
              >
                Veículos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/agendamentos"
                className={`nav-link ${isActive('/agendamentos') ? 'active fw-bold text-white' : ''}`}
              >
                Agendamentos
              </Link>
            </li>
          </ul>

          {/* Exibição do Nome do Usuário Logado e Logout */}
          <div className="d-flex align-items-center gap-3">
            <span className="text-light small">
              Usuário: <strong>{usuario?.nome || 'Usuário'}</strong>
            </span>
            <button
              onClick={onLogout}
              className="btn btn-outline-danger btn-sm px-3"
              title="Encerrar sessão"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

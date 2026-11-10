import { useOutletContext, Link } from 'react-router-dom';

export default function DashboardPage() {
  const { usuario } = useOutletContext();

  return (
    <div className="container py-4">
      {/* Exibição do Nome do Usuário Logado */}
      <div className="p-4 mb-4 bg-white rounded shadow-sm border-start border-4 border-primary">
        <h3 className="fw-bold mb-1">Bem-vindo(a), {usuario?.nome}!</h3>
        <p className="text-muted mb-0">Selecione um dos módulos abaixo para gerenciar os registros do sistema.</p>
      </div>

      {/* Cards de Acesso aos Recursos */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-3">
            <h5 className="fw-bold text-primary mb-2">Gerenciar Clientes</h5>
            <p className="text-muted small mb-3">Cadastro, busca e edição de dados de clientes.</p>
            <Link to="/clientes" className="btn btn-outline-primary btn-sm mt-auto">
              Acessar Clientes &rarr;
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-3">
            <h5 className="fw-bold text-success mb-2">Gerenciar Veículos</h5>
            <p className="text-muted small mb-3">Cadastro e listagem de veículos vinculados aos clientes.</p>
            <Link to="/veiculos" className="btn btn-outline-success btn-sm mt-auto">
              Acessar Veículos &rarr;
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-3">
            <h5 className="fw-bold text-warning mb-2">Agendamentos</h5>
            <p className="text-muted small mb-3">Listagem ordenada por data, novos agendamentos e alteração de data.</p>
            <Link to="/agendamentos" className="btn btn-outline-warning btn-sm mt-auto">
              Acessar Agendamentos &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

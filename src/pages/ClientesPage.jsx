import { useState, useEffect } from 'react';
import { clienteService } from '../services/clienteService';
import ClienteForm from '../components/ClienteForm';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [carregando, setCarregando] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  const carregarClientes = async (termo = '') => {
    setCarregando(true);
    try {
      const data = await clienteService.listar(termo);
      setClientes(data);
    } catch {
      setMensagem({ tipo: 'danger', texto: 'Erro ao carregar clientes do servidor.' });
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault();
    carregarClientes(termoBusca);
  };

  const handleLimparBusca = () => {
    setTermoBusca('');
    carregarClientes('');
  };

  const handleSalvarCliente = async (dadosCliente) => {
    try {
      if (clienteEditando) {
        await clienteService.atualizar(clienteEditando.id, dadosCliente);
        setMensagem({ tipo: 'success', texto: 'Dados do cliente atualizados com sucesso!' });
      } else {
        await clienteService.criar(dadosCliente);
        setMensagem({ tipo: 'success', texto: 'Cliente cadastrado com sucesso!' });
      }
      setClienteEditando(null);
      carregarClientes(termoBusca);
    } catch (err) {
      setMensagem({ tipo: 'danger', texto: err.response?.data?.error || 'Erro ao salvar cliente.' });
    }
  };

  const handleCancelarEdicao = () => {
    setClienteEditando(null);
  };

  return (
    <div className="container py-4">
      <div className="mb-3">
        <h3 className="fw-bold mb-0">Gerenciamento de Clientes</h3>
      </div>

      {mensagem.texto && (
        <div className={`alert alert-${mensagem.tipo} alert-dismissible fade show`} role="alert">
          {mensagem.texto}
          <button type="button" className="btn-close" onClick={() => setMensagem({ tipo: '', texto: '' })}></button>
        </div>
      )}

      {/* Busca com inserção e confirmação */}
      <div className="card p-3 mb-4 border-0 shadow-sm">
        <form onSubmit={handleBuscar} className="row g-2 align-items-center">
          <div className="col-auto">
            <label className="col-form-label fw-semibold">Buscar Cliente:</label>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Digite o termo (nome ou e-mail)..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>
          <div className="col-auto d-flex gap-2">
            <button type="submit" className="btn btn-primary fw-semibold">
              Buscar
            </button>
            {termoBusca && (
              <button type="button" className="btn btn-outline-secondary" onClick={handleLimparBusca}>
                Limpar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Formulário Componentizado de Cadastro e Edição */}
      <ClienteForm
        clienteEditando={clienteEditando}
        onSalvar={handleSalvarCliente}
        onCancelar={handleCancelarEdicao}
      />

      {/* Listagem dos Clientes */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Nome do Cliente</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th>E-mail</th>
                  <th className="text-center" style={{ width: '120px' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">Carregando dados...</td>
                  </tr>
                ) : clientes.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">Nenhum cliente encontrado para o termo pesquisado.</td>
                  </tr>
                ) : (
                  clientes.map((c) => (
                    <tr key={c.id}>
                      <td className="fw-semibold">{c.nome}</td>
                      <td className="fw-semibold">{c.cpf}</td>
                      <td>{c.telefone}</td>
                      <td>{c.email}</td>
                      <td className="text-center">
                        <button
                          onClick={() => setClienteEditando(c)}
                          className="btn btn-outline-primary border btn-sm fw-semibold"
                          title="Editar dados do cliente"
                        >
                          ✏️ Editar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

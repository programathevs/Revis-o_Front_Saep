import { useState, useEffect } from 'react';
import { agendamentoService } from '../services/agendamentoService';
import { veiculoService } from '../services/veiculoService';
import AgendamentoForm from '../components/AgendamentoForm';
import AlterarDataModal from '../components/AlterarDataModal';

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [carregando, setCarregando] = useState(false);
  const [agendamentoModal, setAgendamentoModal] = useState(null);

  const carregarAgendamentos = async () => {
    setCarregando(true);
    try {
      const data = await agendamentoService.listar();
      setAgendamentos(data);
    } catch {
      setMensagem({ tipo: 'danger', texto: 'Erro ao carregar agendamentos do servidor.' });
    } finally {
      setCarregando(false);
    }
  };

  const carregarVeiculos = async () => {
    try {
      const dataV = await veiculoService.listar();
      setVeiculos(dataV);
    } catch {
      // Silencioso
    }
  };

  useEffect(() => {
    carregarAgendamentos();
    carregarVeiculos();
  }, []);

  const handleCriarAgendamento = async (dadosAgendamento) => {
    try {
      const dataFormatada = dadosAgendamento.data_agendamento.replace('T', ' ') + ':00';
      await agendamentoService.criar({
        ...dadosAgendamento,
        data_agendamento: dataFormatada
      });

      setMensagem({ tipo: 'success', texto: 'Agendamento cadastrado com sucesso!' });
      carregarAgendamentos();
    } catch (err) {
      setMensagem({ tipo: 'danger', texto: err.response?.data?.error || 'Erro ao agendar serviço.' });
    }
  };

  const handleSalvarNovaData = async (novaData) => {
    try {
      const dataFormatada = novaData.replace('T', ' ') + ':00';
      await agendamentoService.atualizarData(agendamentoModal.id, dataFormatada);

      setMensagem({ tipo: 'success', texto: 'Data do agendamento atualizada com sucesso!' });
      setAgendamentoModal(null);
      carregarAgendamentos();
    } catch (err) {
      setMensagem({ tipo: 'danger', texto: err.response?.data?.error || 'Erro ao atualizar data.' });
    }
  };

  return (
    <div className="container py-4">
      <div className="mb-3">
        <h3 className="fw-bold mb-0">Gerenciamento de Agendamentos</h3>
      </div>

      {mensagem.texto && (
        <div className={`alert alert-${mensagem.tipo} alert-dismissible fade show`} role="alert">
          {mensagem.texto}
          <button type="button" className="btn-close" onClick={() => setMensagem({ tipo: '', texto: '' })}></button>
        </div>
      )}

      {/* Formulário de Novo Agendamento */}
      <AgendamentoForm
        veiculos={veiculos}
        onSalvar={handleCriarAgendamento}
      />

      {/* Listagem de Agendamentos (Ordenada por dia de agendamento) */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h6 className="fw-bold mb-0">Agendamentos Cadastrados (Ordenados por Data)</h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Data e Horário</th>
                  <th>Serviço / Status</th>
                  <th>Dados do Cliente</th>
                  <th>Dados do Veículo</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">Carregando agendamentos...</td>
                  </tr>
                ) : agendamentos.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">Nenhum agendamento encontrado.</td>
                  </tr>
                ) : (
                  agendamentos.map((ag) => (
                    <tr key={ag.id}>
                      <td>
                        <div className="fw-bold text-dark">
                          {new Date(ag.data_agendamento).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="small text-muted">
                          {new Date(ag.data_agendamento).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td>
                        <div className="fw-semibold">{ag.descricao_servico}</div>
                        <span className="badge bg-info text-dark">{ag.status}</span>
                      </td>

                      {/* Todos os dados do cliente */}
                      <td>
                        <div className="fw-bold text-primary">👤 {ag.cliente_nome}</div>
                        <div className="small text-muted">CPF: {ag.cliente_cpf}</div>
                        <div className="small text-muted">Tel: {ag.cliente_telefone}</div>
                        <div className="small text-muted">E-mail: {ag.cliente_email}</div>
                      </td>

                      {/* Todos os dados do veículo */}
                      <td>
                        <div className="fw-bold text-success">🚗 {ag.veiculo_modelo} ({ag.veiculo_ano})</div>
                        <div className="small text-muted">Placa: <span className="badge bg-secondary">{ag.veiculo_placa}</span></div>
                        <div className="small text-muted">Marca: {ag.veiculo_marca}</div>
                      </td>

                      <td className="text-center">
                        <button
                          onClick={() => setAgendamentoModal(ag)}
                          className="btn btn-outline-primary btn-sm fw-semibold"
                          title="Remarcar atendimento"
                        >
                          📅 Alterar Data
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

      {/* Modal de Alteração de Data */}
      <AlterarDataModal
        isOpen={!!agendamentoModal}
        agendamento={agendamentoModal}
        onSalvar={handleSalvarNovaData}
        onFechar={() => setAgendamentoModal(null)}
      />
    </div>
  );
}

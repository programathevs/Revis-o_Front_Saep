import { useState, useEffect } from 'react';
import { veiculoService } from '../services/veiculoService';
import { clienteService } from '../services/clienteService';
import VeiculoForm from '../components/VeiculoForm';

export default function VeiculosPage() {
  const [veiculos, setVeiculos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [carregando, setCarregando] = useState(false);

  const carregarDados = async () => {
    setCarregando(true);
    try {
      const [dataV, dataC] = await Promise.all([
        veiculoService.listar(),
        clienteService.listar()
      ]);
      setVeiculos(dataV);
      setClientes(dataC);
    } catch {
      setMensagem({ tipo: 'danger', texto: 'Erro ao carregar dados dos veículos.' });
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleSalvarVeiculo = async (novoVeiculo) => {
    try {
      await veiculoService.criar(novoVeiculo);
      setMensagem({ tipo: 'success', texto: 'Veículo cadastrado e associado ao cliente com sucesso!' });
      carregarDados();
    } catch (err) {
      setMensagem({ tipo: 'danger', texto: err.response?.data?.error || 'Erro ao cadastrar veículo.' });
    }
  };

  return (
    <div className="container py-4">
      <div className="mb-3">
        <h3 className="fw-bold mb-0">Gerenciamento de Veículos</h3>
      </div>

      {mensagem.texto && (
        <div className={`alert alert-${mensagem.tipo} alert-dismissible fade show`} role="alert">
          {mensagem.texto}
          <button type="button" className="btn-close" onClick={() => setMensagem({ tipo: '', texto: '' })}></button>
        </div>
      )}

      <VeiculoForm
        clientes={clientes}
        onSalvar={handleSalvarVeiculo}
      />

      {/* Tabela de Listagem de Veículos */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h6 className="fw-bold mb-0">Veículos Cadastrados no Sistema</h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Placa</th>
                  <th>Modelo</th>
                  <th>Marca</th>
                  <th>Ano</th>
                  <th>Cliente Proprietário</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">Carregando veículos...</td>
                  </tr>
                ) : veiculos.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">Nenhum veículo cadastrado.</td>
                  </tr>
                ) : (
                  veiculos.map((v) => (
                    <tr key={v.id}>
                      <td><span className="badge bg-dark fs-6">{v.placa}</span></td>
                      <td className="fw-semibold">{v.modelo}</td>
                      <td>{v.marca}</td>
                      <td>{v.ano}</td>
                      <td>
                        <span className="text-primary fw-semibold">👤 {v.cliente_nome}</span>
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

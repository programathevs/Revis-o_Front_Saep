import { useState } from 'react';

export default function AgendamentoForm({ veiculos, onSalvar }) {
  const [formData, setFormData] = useState({
    veiculo_id: '',
    data_agendamento: '',
    descricao_servico: '',
    status: 'Agendado'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(formData);

    setFormData({
      veiculo_id: '',
      data_agendamento: '',
      descricao_servico: '',
      status: 'Agendado'
    });
  };

  return (
    <div className="card p-4 mb-4 border-0 shadow-sm border-top border-4 border-success">
      <h5 className="fw-bold mb-3 text-dark">📅 Novo Agendamento</h5>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Veículo do Atendimento *</label>
            <select
              className="form-select"
              value={formData.veiculo_id}
              onChange={(e) => setFormData({ ...formData, veiculo_id: e.target.value })}
              required
            >
              <option value="">Selecione o Veículo</option>
              {veiculos.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.modelo} - {v.placa} (Proprietário: {v.cliente_nome})
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Data e Horário *</label>
            <input
              type="datetime-local"
              className="form-control"
              value={formData.data_agendamento}
              onChange={(e) => setFormData({ ...formData, data_agendamento: e.target.value })}
              required
            />
          </div>

          <div className="col-md-12">
            <label className="form-label fw-semibold">Descrição do Serviço / Reparo *</label>
            <textarea
              className="form-control"
              rows="2"
              placeholder="Ex: Troca de óleo e filtro, alinhamento, balanceamento..."
              value={formData.descricao_servico}
              onChange={(e) => setFormData({ ...formData, descricao_servico: e.target.value })}
              required
            ></textarea>
          </div>
        </div>

        <div className="mt-3 text-end">
          <button type="submit" className="btn btn-success fw-semibold">
            Confirmar Agendamento
          </button>
        </div>
      </form>
    </div>
  );
}


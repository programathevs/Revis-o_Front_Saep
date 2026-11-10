import { useState, useEffect } from 'react';

export default function AlterarDataModal({ isOpen, agendamento, onSalvar, onFechar }) {
  const [novaData, setNovaData] = useState('');

  useEffect(() => {
    if (agendamento && agendamento.data_agendamento) {
      const d = new Date(agendamento.data_agendamento);
      const tzOffset = d.getTimezoneOffset() * 60000;
      const localISOTime = new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
      setNovaData(localISOTime);
    } else {
      setNovaData('');
    }
  }, [agendamento]);

  if (!isOpen || !agendamento) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!novaData) return;
    onSalvar(novaData);
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content shadow border-0">
          <div className="modal-header bg-warning bg-opacity-25">
            <h5 className="modal-title fw-bold text-dark">
              📅 Alterar Data do Agendamento
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onFechar}
              aria-label="Fechar"
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body py-4">
              <div className="mb-3 p-3 bg-light rounded border">
                <div className="small text-muted mb-1">Dados do Atendimento:</div>
                <div className="fw-semibold text-primary">👤 Cliente: {agendamento.cliente_nome}</div>
                <div className="fw-semibold text-dark">🚗 Veículo: {agendamento.veiculo_modelo} ({agendamento.veiculo_placa})</div>
                <div className="small text-muted mt-1">Serviço: {agendamento.descricao_servico}</div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Nova Data e Horário:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={novaData}
                  onChange={(e) => setNovaData(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="modal-footer bg-light">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onFechar}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-warning fw-semibold"
              >
                Salvar Nova Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

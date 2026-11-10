import { useState } from 'react';

export default function VeiculoForm({ clientes, onSalvar }) {
  const [formData, setFormData] = useState({
    placa: '',
    modelo: '',
    marca: '',
    ano: new Date().getFullYear(),
    cliente_id: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(formData);

    // Reseta o formulário após salvar
    setFormData({
      placa: '',
      modelo: '',
      marca: '',
      ano: new Date().getFullYear(),
      cliente_id: ''
    });
  };

  return (
    <div className="card p-4 mb-4 border-0 shadow-sm border-top border-4 border-success">
      <h5 className="fw-bold mb-3 text-success">🚗 Cadastrar Novo Veículo</h5>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label fw-semibold">Placa do Veículo</label>
            <input
              type="text"
              className="form-control text-uppercase"
              placeholder="Ex: ABC-1D23"
              value={formData.placa}
              onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Modelo</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Civic, Corolla, Onix"
              value={formData.modelo}
              onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Marca / Fabricante</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Honda, Toyota, Chevrolet"
              value={formData.marca}
              onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Ano</label>
            <input
              type="number"
              className="form-control"
              value={formData.ano}
              onChange={(e) => setFormData({ ...formData, ano: e.target.value })}
              required
            />
          </div>

          {/* Seleção do Cliente via Lista Suspensa (Select) */}
          <div className="col-md-12">
            <label className="form-label fw-semibold">
              Proprietário do Veículo (Cliente) *
            </label>
            <select
              className="form-select"
              value={formData.cliente_id}
              onChange={(e) => setFormData({ ...formData, cliente_id: e.target.value })}
              required
            >
              <option value="">Selecione o Cliente</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome} (CPF: {c.cpf})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 text-end">
          <button type="submit" className="btn btn-success fw-semibold">
            Salvar Veículo
          </button>
        </div>
      </form>
    </div>
  );
}

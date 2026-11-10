import { useState, useEffect } from 'react';

export default function ClienteForm({ clienteEditando, onSalvar, onCancelar }) {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: ''
  });

  useEffect(() => {
    if (clienteEditando) {
      setFormData({
        nome: clienteEditando.nome || '',
        cpf: clienteEditando.cpf || '',
        telefone: clienteEditando.telefone || '',
        email: clienteEditando.email || ''
      });
    } else {
      setFormData({ nome: '', cpf: '', telefone: '', email: '' });
    }
  }, [clienteEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(formData);
  };

  return (
    <div className={`card p-4 mb-4 border-0 shadow-sm border-top border-4 ${clienteEditando ? 'border-warning' : 'border-success'}`}>
      <h5 className={`fw-bold mb-3 ${clienteEditando ? 'text-warning' : 'text-success'}`}>
        {clienteEditando ? `✏️ Editar Cliente: ${clienteEditando.nome}` : 'Cadastrar Novo Cliente'}
      </h5>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nome Completo</label>
            <input
              type="text"
              name="nome"
              className="form-control"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">CPF</label>
            <input
              type="text"
              name="cpf"
              className="form-control"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Telefone</label>
            <input
              type="text"
              name="telefone"
              className="form-control"
              placeholder="(00) 00000-0000"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mt-3 text-end">
          {clienteEditando && (
            <button type="button" className="btn btn-secondary me-2" onClick={onCancelar}>
              Cancelar
            </button>
          )}
          <button type="submit" className={`btn ${clienteEditando ? 'btn-warning fw-semibold' : 'btn-success'}`}>
            Salvar Cliente
          </button>
        </div>
      </form>
    </div>
  );
}

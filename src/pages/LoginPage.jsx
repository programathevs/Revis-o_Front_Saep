import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await authService.login(email, senha);
      navigate('/dashboard');
    } catch (err) {
      const mensagemErro = err.response?.data?.error || 'Falha ao autenticar. Verifique suas credenciais.';
      setErro(mensagemErro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">AutoCare</h2>
          <p className="text-muted small">Sistema de Gestão Automotiva</p>
        </div>

        {erro && (
          <div className="alert alert-danger py-2 small" role="alert">
            <strong>Erro: </strong>{erro}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">E-mail</label>
            <input
              type="email"
              className="form-control"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
            disabled={carregando}
          >
            {carregando ? 'Autenticando...' : 'Entrar no Sistema'}
          </button>
        </form>
      </div>
    </div>
  );
}

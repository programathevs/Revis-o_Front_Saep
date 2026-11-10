import api from './api';

export const clienteService = {
  async listar(termo = '') {
    const params = termo && termo.trim() !== '' ? { termo: termo.trim() } : {};
    const response = await api.get('/clientes', { params });
    return response.data;
  },

  async criar(clienteData) {
    const response = await api.post('/clientes', clienteData);
    return response.data;
  },

  async atualizar(id, clienteData) {
    const response = await api.put(`/clientes/${id}`, clienteData);
    return response.data;
  }
};

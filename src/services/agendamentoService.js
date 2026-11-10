import api from './api';

export const agendamentoService = {
  async listar() {
    const response = await api.get('/agendamentos');
    return response.data;
  },

  async criar(agendamentoData) {
    const response = await api.post('/agendamentos', agendamentoData);
    return response.data;
  },

  async atualizarData(id, nova_data) {
    const response = await api.patch(`/agendamentos/${id}/data`, { nova_data });
    return response.data;
  }
};

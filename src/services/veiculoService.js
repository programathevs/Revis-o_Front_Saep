import api from './api';

export const veiculoService = {
  async listar() {
    const response = await api.get('/veiculos');
    return response.data;
  },

  async criar(veiculoData) {
    const response = await api.post('/veiculos', veiculoData);
    return response.data;
  }
};

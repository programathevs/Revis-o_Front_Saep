import api from './api';

export const authService = {
  async login(email, senha) {
    const response = await api.post('/auth/login', { email, senha });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async logout() {
    localStorage.removeItem('token');
  },

  async getMe() {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

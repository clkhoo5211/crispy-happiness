import { api } from '../lib/api';

// Mock user data for local development
const MOCK_USERS = [
  {
    id: 'sysadmin1',
    username: 'admin',
    password: 'password',
    role: 'system-admin',
    name: 'System Admin',
    email: 'admin@nbn.com',
    token: 'mock-token-admin'
  },
  {
    id: 't3admin1',
    username: 't3admin',
    password: 'password',
    role: 't3-admin',
    name: 'T3 Admin User',
    email: 't3@nbn.com',
    token: 'mock-token-t3'
  },
  {
    id: 'merchant1',
    username: 'merchant',
    password: 'password',
    role: 'merchant',
    name: 'Food Merchant Sdn Bhd',
    email: 'merchant@food.com',
    token: 'mock-token-merchant'
  },
  {
    id: 'agent1',
    username: 'agent',
    password: 'password',
    role: 'agent',
    name: 'Agent Smith',
    email: 'agent@nbn.com',
    token: 'mock-token-agent'
  }
];

export const authService = {
  login: async (username, password) => {
    if (api.config.useMock) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = MOCK_USERS.find(u => u.username === username && u.password === password);

      if (user) {
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('token', user.token);
        return userWithoutPassword;
      }
      throw new Error('Invalid credentials');
    } else {
      // Real API call
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      return response.user;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

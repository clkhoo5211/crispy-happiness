export const systemService = {
  getStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      totalMerchants: 124,
      activeAgents: 45,
      totalUsers: 1234,
      totalVolume: 1200000
    };
  },

  getLogs: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 1, type: 'INFO', message: 'New merchant registered', timestamp: '2025-11-24T10:00:00' },
      { id: 2, type: 'WARNING', message: 'High transaction volume detected', timestamp: '2025-11-24T09:45:00' },
      { id: 3, type: 'ERROR', message: 'Failed login attempt', timestamp: '2025-11-24T09:30:00' },
    ];
  }
};

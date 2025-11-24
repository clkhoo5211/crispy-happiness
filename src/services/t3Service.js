export const t3Service = {
  getStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      incoming: 6000,
      outgoing: 4000,
      monthlyIncoming: 2000,
      monthlyOutgoing: 2000
    };
  },

  getWithdrawals: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 'ap123451', merchant: 'Food Merchant', amount: 10000, date: '2025-11-01', status: 'Pending' },
      { id: 'ap123452', merchant: 'Tech Gadgets', amount: 5500, date: '2025-11-02', status: 'Approved' },
    ];
  }
};

export const merchantService = {
  getStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      bonusAvailable: 10.1234,
      todayVolume: 100.5,
      monthVolume: 1000.60,
      totalVolume: 12450.00
    };
  },

  getTransactions: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 'tx1', type: 'Payment', amount: 599.00, status: 'Completed', time: '30 mins ago', wallet: 'u4v5...y8x9' },
      { id: 'tx2', type: 'Payment', amount: 120.50, status: 'Completed', time: '2 hours ago', wallet: 'a1b2...c3d4' },
      { id: 'tx3', type: 'Payment', amount: 1000.00, status: 'Completed', time: '5 hours ago', wallet: 'e5f6...g7h8' },
    ];
  }
};

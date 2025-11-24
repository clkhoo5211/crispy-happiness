export const agentService = {
  getStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      bonusAvailable: 10.1234,
      todayVolume: 100.5,
      teamL1: 24,
      teamL2: 100
    };
  },

  getTeam: async (level) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const members = [
      { id: 'u7p8....q9r0', joinDate: '2025-11-15 16:30', referrals: 2, bonus: 150.00, volume: 14000.00, level: 'L1' },
      { id: 'u7p8....q9r1', joinDate: '2025-11-16 10:30', referrals: 5, bonus: 350.00, volume: 24000.00, level: 'L1' },
      { id: 'u7p8....q9r2', joinDate: '2025-11-17 09:15', referrals: 0, bonus: 50.00, volume: 4000.00, level: 'L2' },
    ];
    return level ? members.filter(m => m.level === level) : members;
  }
};

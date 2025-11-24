import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Calendar } from 'lucide-react';
import { StatCard, DataTable, PageHeader, Tabs, ConfirmDialog } from '../../components/ui';

export default function BonusManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('claim');
  const [approveConfirm, setApproveConfirm] = useState({ isOpen: false, item: null });
  const [selectedMonth, setSelectedMonth] = useState('2025-11'); // Format: YYYY-MM

  // Generate month options for the past 12 months
  const getMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      options.push({ value, label });
    }
    return options;
  };

  const monthOptions = getMonthOptions();
  const selectedMonthLabel = monthOptions.find(m => m.value === selectedMonth)?.label || 'Nov 2025';

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    console.log('Month changed to:', e.target.value);
    // TODO: Fetch bonus data for selected month
  };

  const stats = [
    { label: 'Total Bonus Distributed', value: '100,000.00 USDT', lastUpdate: '17-11-2025' },
    { label: 'Total Bonus Claim', value: '100,000.00 USDT', lastUpdate: '17-11-2025' },
    { label: 'Total Bonus Unclaim', value: '100,000.00 USDT', lastUpdate: '17-11-2025' },
  ];

  const monthlyData = [
    { member: 'System', distributed: '10,000.00 U', claim: '5,000.00 U', unclaim: '5,000.00 U' },
    { member: 'Partner', distributed: '10,010.00 U', claim: '10,000.00 U', unclaim: '10.00 U' },
    { member: 'Agent', distributed: '10,000.00 U', claim: '7,000.00 USDT', unclaim: '3,000.00 U' },
    { member: 'Merchant', distributed: '10,000.00 U', claim: '9,000.00 U', unclaim: '1,000.00 U' },
    { member: 'User', distributed: '10,000.00 U', claim: '10,000.00 USDT', unclaim: '0.00 U' },
    { member: 'Total', distributed: '50,010.00 U', claim: '41,000.00 U', unclaim: '9,010.00 U', isTotal: true },
  ];

  const claimList = [
    { id: 'tx-a1b2c3d4', wallet: '0xF3A....12345', bonus: '10,000.00 U', fees: '10.00 USDT', net: '10.00 USDT', time: '01-11-2025 13:00', status: 'Success' },
    { id: 'tx-e5f6g7h8', wallet: '0xF4B....67890', bonus: '15,500.00 U', fees: '20.00 USDT', net: '20.00 USDT', time: '02-12-2025 14:30', status: 'Success' },
    { id: 'tx-i9j0k1l2', wallet: '0xF5C....13579', bonus: '25,750.00 U', fees: '50.00 USDT', net: '50.00 USDT', time: '03-13-2025 15:45', status: 'Success' },
  ];

  const unclaimList = [
    { id: 'U000001', bonus: '10,000.00 U', update: '01-11-2025 13:00', status: 'Pending' },
    { id: 'U000002', bonus: '15,500.00 U', update: '02-11-2025 14:30', status: 'Pending' },
    { id: 'U000003', bonus: '7,250.00 U', update: '03-11-2025 09:45', status: 'Pending' },
  ];

  const handleApprove = (item) => {
    console.log('Approving bonus:', item.id);
    // TODO: api.bonus.approve(item.id);
  };

  const claimColumns = [
    { key: 'id', label: 'Trans. ID' },
    { key: 'wallet', label: 'Wallet ID', render: (val) => <span className="font-mono text-xs">{val}</span> },
    { key: 'bonus', label: 'Bonus' },
    { key: 'fees', label: 'Fees' },
    { key: 'net', label: 'Net Bonus' },
    { key: 'time', label: 'Time' },
    { key: 'status', label: 'Status' },
  ];

  const unclaimColumns = [
    { key: 'id', label: 'U.ID' },
    { key: 'bonus', label: 'Bonus' },
    { key: 'update', label: 'Last Update' },
    { key: 'status', label: 'Status' },
  ];

  const claimActions = [
    {
      icon: <Eye size={16} />,
      onClick: (row) => navigate(`/system-admin/bonus/${row.id}`),
      tooltip: 'View Details',
    },
  ];

  const unclaimActions = [
    {
      icon: <Eye size={16} />,
      onClick: (row) => setApproveConfirm({ isOpen: true, item: row }),
      tooltip: 'Approve',
      variant: 'success',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bonus Management"
        description="Overview the Details of Bonus Information"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Monthly Bonus Info */}
      <div className="bg-card rounded-xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Monthly Bonus Information</h2>
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="flex items-center gap-2 px-3 py-2 pr-8 border rounded-lg text-sm bg-background cursor-pointer appearance-none"
              style={{ backgroundImage: 'none' }}
            >
              {monthOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-muted-foreground font-medium border-b">
              <tr>
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Bonus Distributed</th>
                <th className="px-4 py-3">Bonus Claim</th>
                <th className="px-4 py-3">Bonus Unclaim</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {monthlyData.map((row, i) => (
                <tr key={i} className={`hover:bg-accent/50 ${row.isTotal ? 'font-bold bg-secondary/20' : ''}`}>
                  <td className="px-4 py-4">{row.member}</td>
                  <td className="px-4 py-4">{row.distributed}</td>
                  <td className="px-4 py-4">{row.claim}</td>
                  <td className="px-4 py-4">{row.unclaim}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabs for Claim/Unclaim Lists */}
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <Tabs
          tabs={[
            { id: 'claim', label: 'Bonus Claim List' },
            { id: 'unclaim', label: 'Bonus Unclaim List' },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="p-6">
          {activeTab === 'claim' ? (
            <DataTable
              columns={claimColumns}
              data={claimList}
              actions={claimActions}
            />
          ) : (
            <DataTable
              columns={unclaimColumns}
              data={unclaimList}
              actions={unclaimActions}
            />
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={approveConfirm.isOpen}
        onClose={() => setApproveConfirm({ isOpen: false, item: null })}
        onConfirm={() => handleApprove(approveConfirm.item)}
        title="Approve Bonus"
        message={`Are you sure you want to approve bonus ${approveConfirm.item?.id}?`}
        confirmText="Approve"
        variant="info"
      />
    </div>
  );
}

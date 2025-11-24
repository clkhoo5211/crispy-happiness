import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Settings, Trash2 } from 'lucide-react';
import { StatCard, DataTable, SearchBar, PageHeader, ConfirmDialog } from '../../components/ui';

export default function FeesManagement() {
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, item: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const allTransactions = [
    { id: 'tx-a1b2c3d4', wallet: '0xF3A....12345', amount: '10,000.00 U', fees: '10.00 USDT', time: '01-11-2025 13:00', status: 'Success' },
    { id: 'tx-e5f6g7h8', wallet: '0xF4B....67890', amount: '15,500.00 U', fees: '20.00 USDT', time: '02-12-2025 14:30', status: 'Success' },
    { id: 'tx-i9j0k1l2', wallet: '0xF5C....13579', amount: '25,750.00 U', fees: '50.00 USDT', time: '03-13-2025 15:45', status: 'Success' },
    { id: 'tx-m3n4o5p6', wallet: '0xF6D....24680', amount: '30,000.00 U', fees: '100.00 USDT', time: '04-14-2025 10:15', status: 'Success' },
    { id: 'tx-q7r8s9t0', wallet: '0xF7E....35791', amount: '5,000.00 U', fees: '5.00 USDT', time: '05-15-2025 11:00', status: 'Success' },
  ];

  // Filter transactions based on search term
  const transactions = allTransactions.filter(t => {
    if (searchTerm === '') return true;
    const searchLower = searchTerm.toLowerCase();
    return t.id.toLowerCase().includes(searchLower) ||
      t.wallet.toLowerCase().includes(searchLower) ||
      t.status.toLowerCase().includes(searchLower);
  });

  const stats = [
    { label: 'Total Fees Collect', value: '100,000.00 USDT', lastUpdate: '17-11-2025' },
    { label: 'Monthly Fees Collect', value: '100,000.00 USDT', lastUpdate: '17-11-2025' },
  ];

  const columns = [
    { key: 'id', label: 'Trans. ID' },
    {
      key: 'wallet',
      label: 'Wallet ID',
      render: (value) => <span className="font-mono text-xs">{value}</span>
    },
    { key: 'amount', label: 'Amount' },
    { key: 'fees', label: 'Fees' },
    { key: 'time', label: 'Time' },
    { key: 'status', label: 'Status' },
  ];

  const handleDelete = (transaction) => {
    console.log('Deleting transaction:', transaction.id);
    // TODO: api.transaction.delete(transaction.id);
  };

  const actions = [
    {
      icon: <Eye size={16} />,
      onClick: (row) => navigate(`/system-admin/transactions/${row.id}`),
      tooltip: 'View Details',
    },
    {
      icon: <Trash2 size={16} />,
      onClick: (row) => setDeleteConfirm({ isOpen: true, item: row }),
      variant: 'danger',
      tooltip: 'Delete',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fees Management"
        description="Overview the Details of Fees Information"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold mb-4">Fees Collect List</h2>
          <SearchBar
            placeholder="Search Agent..."
            value={searchTerm}
            onChange={setSearchTerm}
            className="max-w-sm"
          />
        </div>

        <DataTable
          columns={columns}
          data={transactions}
          actions={actions}
          pagination={{
            currentPage,
            totalPages: 3,
            onPageChange: setCurrentPage,
          }}
        />
      </div>

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, item: null })}
        onConfirm={() => handleDelete(deleteConfirm.item)}
        title="Delete Transaction"
        message={`Are you sure you want to delete transaction ${deleteConfirm.item?.id}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}

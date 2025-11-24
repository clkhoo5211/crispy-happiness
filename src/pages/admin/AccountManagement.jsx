import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Settings, Trash2, Plus } from 'lucide-react';
import { StatCard, DataTable, SearchBar, PageHeader, Modal } from '../../components/ui';

export default function AccountManagement() {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const allAccounts = [
    { id: '001', username: 'finance1', character: 'Finance', lastLogin: '2 hours ago', created: '01-11-2025 13:00', status: 'Active' },
    { id: '002', username: 'finance2', character: 'Finance', lastLogin: '3 hours ago', created: '01-11-2025 14:00', status: 'Active' },
    { id: '003', username: 'finance3', character: 'Finance', lastLogin: '4 hours ago', created: '01-11-2025 15:00', status: 'Inactive' },
  ];

  // Filter accounts based on search term
  const accounts = allAccounts.filter(a => {
    if (searchTerm === '') return true;
    const searchLower = searchTerm.toLowerCase();
    return a.id.toLowerCase().includes(searchLower) ||
      a.username.toLowerCase().includes(searchLower) ||
      a.character.toLowerCase().includes(searchLower) ||
      a.status.toLowerCase().includes(searchLower);
  });

  const stats = [
    { label: 'Total Account User', value: '2', lastUpdate: '17-11-2025' },
  ];

  const columns = [
    { key: 'id', label: 'Admin ID' },
    { key: 'username', label: 'Username' },
    { key: 'character', label: 'Character' },
    { key: 'lastLogin', label: 'Last Login' },
    { key: 'created', label: 'Create On' },
    { key: 'status', label: 'Status' },
  ];

  const actions = [
    {
      icon: <Eye size={16} />,
      onClick: (row) => navigate(`/t3-admin/accounts/${row.id}`),
      tooltip: 'View Details',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Account Management"
        description="Manage, creating and assigning finance accounts."
        action={
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:bg-primary/90"
          >
            <Plus size={18} />
            Create New Finance
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Admin List</h2>
          <SearchBar
            placeholder="Search..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>

        <DataTable
          columns={columns}
          data={accounts}
          actions={actions}
        />
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="New Finance"
        size="md"
        footer={
          <>
            <button onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-accent">
              Cancel
            </button>
            <button
              onClick={() => {
                // TODO: Implement create account logic
                console.log('Creating finance account...');
                setShowCreateModal(false);
              }}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Create Account
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input type="text" className="w-full px-3 py-2 rounded-md border bg-background" placeholder="Insert username" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" className="w-full px-3 py-2 rounded-md border bg-background" placeholder="Insert password" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full px-3 py-2 rounded-md border bg-background" placeholder="Insert email" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Wallet Address</label>
            <input type="text" className="w-full px-3 py-2 rounded-md border bg-background" placeholder="Insert wallet address" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

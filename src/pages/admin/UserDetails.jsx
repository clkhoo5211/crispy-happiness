import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye } from 'lucide-react';
import { InfoSection, Card, DataTable, SearchBar, Button } from '../../components/ui';

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Determine base path from current location
  const basePath = window.location.pathname.includes('system-admin') ? '/system-admin' : '/t3-admin';

  const userInfo = [
    { label: "User's ID", value: 'A00002' },
    { label: 'Join Date', value: '01-11-2025 13:00' },
    { label: 'Sponsor By', value: 'A00001' },
    { label: 'Current Unclaim Funds', value: '100 U' },
    { label: 'Total Claimed Funds', value: '1000 U' },
    { label: 'Total Incoming Funds', value: '1100 U' },
    { label: 'Wallet Address', value: <span className="font-mono text-xs">0xF3A1B2C3D4E5F67890123456789ABCDEF012345</span> },
    { label: 'Status', value: <span className="text-green-600 font-medium">Active</span> },
  ];

  const allTransactions = [
    { id: 'tx-a1b2c3d4', type: 'Incoming', total: '500.00 U', fees: '10.00 U', net: '490.00 U', date: '01-11-2025 13:00', status: 'Active' },
    { id: 'tx-b2c3d4e5', type: 'Outgoing', total: '500.00 U', fees: '10.00 U', net: '490.00 U', date: '01-11-2025 13:00', status: 'Active' },
    { id: 'tx-c3d4e5f6', type: 'Incoming', total: '500.00 U', fees: '10.00 U', net: '490.00 U', date: '01-11-2025 13:00', status: 'Active' },
  ];

  // Filter transactions based on search term
  const transactions = allTransactions.filter(t => {
    if (searchTerm === '') return true;
    const searchLower = searchTerm.toLowerCase();
    return t.id.toLowerCase().includes(searchLower) ||
      t.type.toLowerCase().includes(searchLower) ||
      t.status.toLowerCase().includes(searchLower);
  });

  const columns = [
    { key: 'id', label: 'Trans. ID' },
    { key: 'type', label: 'Type' },
    { key: 'total', label: 'Total Volume' },
    { key: 'fees', label: 'Fees' },
    { key: 'net', label: 'Net Volume' },
    { key: 'date', label: 'Trans Date' },
    { key: 'status', label: 'Status' },
  ];

  const actions = [
    {
      icon: <Eye size={16} />,
      onClick: (row) => navigate(`${basePath}/transactions/${row.id}`),
      tooltip: 'View',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} />
        <div>
          <h1 className="text-2xl font-bold">User Details</h1>
          <p className="text-muted-foreground">Overview the Details of User Information</p>
        </div>
      </div>

      <InfoSection title="User's Information Funds" items={userInfo} columns={2} />

      <Card title="Transaction History">
        <div className="mb-4">
          <SearchBar placeholder="Search Transaction..." value={searchTerm} onChange={setSearchTerm} className="max-w-sm" />
        </div>
        <DataTable columns={columns} data={transactions} actions={actions} />
      </Card>
    </div>
  );
}

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye } from 'lucide-react';
import { StatCard, InfoSection, Card, DataTable, SearchBar, Button } from '../../components/ui';

export default function MerchantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Total Transaction', value: '1,000.00 USDT', lastUpdate: '17-11-2025' },
    { label: 'Total Net Profit', value: '900.00 USDT', lastUpdate: '17-11-2025' },
    { label: 'Total Fees Contributed', value: '88.10 USDT', lastUpdate: '17-11-2025' },
  ];

  const businessInfo = [
    { label: "Merchant's Group", value: 'T3' },
    { label: 'Company Name', value: 'Food Merchant Sdn Bhd' },
    { label: 'SSM Number', value: '202591231345' },
    { label: "Merchant's Type", value: 'F&B' },
    { label: 'Sponsor By', value: 'A000001' },
    { label: 'Status', value: <span className="px-3 py-1 rounded-md bg-green-100 text-green-700 text-sm font-medium">Active</span> },
  ];

  const accountInfo = [
    { label: 'Email', value: 'f&b@gmail.com' },
    { label: 'Wallet Address', value: <span className="font-mono text-xs">0xF3A1B2C3D4E5F67890123456789ABCDEF012345</span> },
    { label: 'Address Line 1', value: '11, Pusat Bandar Puchong, IOI Boulevard' },
    { label: 'Postcode', value: '47100' },
    { label: 'City', value: 'Puchong' },
    { label: 'State', value: 'Selangor' },
    { label: 'Country', value: 'Malaysia' },
  ];

  const allTransactions = [
    { id: 'tx-a1b2c3d4', type: 'Payment', amount: '100.00 U', net: '99.00 U', bonus: '0.5 U', time: '01-11-2025 13:00', status: 'Success' },
    { id: 'tx-e5f6g7h8', type: 'Payment', amount: '250.00 U', net: '245.00 U', bonus: '5.0 U', time: '02-12-2025 09:30', status: 'Pending' },
    { id: 'tx-i9j0k1l2', type: 'Payment', amount: '150.00 U', net: '148.00 U', bonus: '2.0 U', time: '03-01-2026 15:45', status: 'Failed' },
    { id: 'tx-m3n4o5p6', type: 'Payment', amount: '300.00 U', net: '295.00 U', bonus: '5.0 U', time: '04-02-2026 10:15', status: 'Success' },
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
    { key: 'amount', label: 'Amount' },
    { key: 'net', label: 'Net Profit' },
    { key: 'bonus', label: 'Bonus' },
    { key: 'time', label: 'Time' },
    { key: 'status', label: 'Status' },
  ];

  const actions = [
    {
      icon: <Eye size={16} />,
      onClick: (row) => {
        const path = window.location.pathname;
        const basePath = path.includes('system-admin') ? '/system-admin' : '/t3-admin';
        navigate(`${basePath}/transactions/${row.id}`);
      },
      tooltip: 'View',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} />
        <div>
          <h1 className="text-2xl font-bold">Merchant Details</h1>
          <p className="text-muted-foreground">Overview the Details of Merchant Information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoSection
          title="Business Information"
          items={businessInfo}
          columns={1}
        />
        <InfoSection
          title="Merchant's Account"
          items={accountInfo}
          columns={1}
        />
      </div>

      <Card title="Transaction List">
        <div className="mb-4">
          <SearchBar
            placeholder="Search Transaction..."
            value={searchTerm}
            onChange={setSearchTerm}
            className="max-w-sm"
          />
        </div>
        <DataTable
          columns={columns}
          data={transactions}
          actions={actions}
        />
      </Card>
    </div>
  );
}

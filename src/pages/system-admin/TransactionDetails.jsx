import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { InfoSection, Button } from '../../components/ui';

export default function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const transactionInfo = [
    { label: 'Transaction ID', value: id || 'tx-a1b2c3d4' },
    { label: 'Wallet Address', value: <span className="font-mono text-xs">0xF3A....12345</span> },
    { label: 'Amount', value: '10,000.00 USDT' },
    { label: 'Fees', value: '10.00 USDT' },
    { label: 'Net Amount', value: '9,990.00 USDT' },
    { label: 'Time', value: '01-11-2025 13:00' },
    { label: 'Status', value: <span className="px-3 py-1 rounded-md bg-green-100 text-green-700 text-sm font-medium">Success</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} />
        <div>
          <h1 className="text-2xl font-bold">Transaction Details</h1>
          <p className="text-muted-foreground">View transaction information</p>
        </div>
      </div>

      <InfoSection title="Transaction Information" items={transactionInfo} columns={2} />
    </div>
  );
}

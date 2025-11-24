import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { InfoSection, Button } from '../../components/ui';

export default function WithdrawalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const withdrawalInfo = [
    { label: 'Application ID', value: id || 'ap123455551' },
    { label: 'Merchant Order No.', value: 'mo12345' },
    { label: 'Amount', value: '10,000.00 U' },
    { label: 'Wallet Address', value: <span className="font-mono text-xs">0xF3A....12345</span> },
    { label: 'Application Time', value: '01-11-2025 13:00' },
    { label: 'Reference', value: 'Test123' },
    { label: 'Status', value: <span className="px-3 py-1 rounded-md bg-yellow-100 text-yellow-700 text-sm font-medium">Pending</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} />
        <div>
          <h1 className="text-2xl font-bold">Withdrawal Details</h1>
          <p className="text-muted-foreground">View withdrawal application information</p>
        </div>
      </div>

      <InfoSection title="Withdrawal Information" items={withdrawalInfo} columns={2} />
    </div>
  );
}

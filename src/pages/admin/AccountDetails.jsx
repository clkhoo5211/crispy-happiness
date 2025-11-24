import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { InfoSection, Button } from '../../components/ui';

export default function AccountDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const accountInfo = [
    { label: 'Admin ID', value: id || '001' },
    { label: 'Username', value: 'finance1' },
    { label: 'Character', value: 'Finance' },
    { label: 'Email', value: 'finance1@nbn.com' },
    { label: 'Last Login', value: '2 hours ago' },
    { label: 'Created On', value: '01-11-2025 13:00' },
    { label: 'Status', value: <span className="px-3 py-1 rounded-md bg-green-100 text-green-700 text-sm font-medium">Active</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} />
        <div>
          <h1 className="text-2xl font-bold">Account Details</h1>
          <p className="text-muted-foreground">View finance account information</p>
        </div>
      </div>

      <InfoSection title="Account Information" items={accountInfo} columns={2} />
    </div>
  );
}

import React, { useState } from 'react';
import { Copy, RefreshCw, Save } from 'lucide-react';
import { Card, FormField, Button, PageHeader } from '../../components/ui';

export default function APISettings() {
  const [keys, setKeys] = useState({
    apiKey: 'prod_****************ab12',
    secretKey: 'XyZ123!@#456',
    merchantKey: 'XyZ123!@#456',
    callbackUrl: 'https://your-website.com/api/callback'
  });

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // TODO: Show toast notification
    console.log('Copied to clipboard:', text);
  };

  const handleCreateNewKey = () => {
    // TODO: Call API to generate new keys
    console.log('Creating new API keys...');
    const newKeys = {
      ...keys,
      apiKey: 'prod_' + Math.random().toString(36).substr(2, 16),
      secretKey: Math.random().toString(36).substr(2, 12),
      merchantKey: Math.random().toString(36).substr(2, 12),
    };
    setKeys(newKeys);
  };

  const handleSave = () => {
    // TODO: Call API to save callback URL
    console.log('Saving API settings...', keys);
  };

  const logs = [
    { date: '01-11-2025 13:00', endpoint: 'POST /api/v1/transactions', status: '200 OK', ip: '192.168.1.1' },
    { date: '01-11-2025 13:05', endpoint: 'POST /api/v1/users', status: '201 Created', ip: '192.168.1.2' },
    { date: '01-11-2025 13:10', endpoint: 'GET /api/v1/orders', status: '404 Not Found', ip: '192.168.1.3' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="API Setting & Logs" description="Overview of all merchants-related configurations and activity logs." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Key's Information">
          <div className="space-y-4">
            <FormField label="API Key">
              <div className="flex gap-2">
                <input type="text" value={keys.apiKey} readOnly className="flex-1 px-3 py-2 rounded-md bg-secondary/50 border-none font-mono text-sm" />
                <button onClick={() => copyToClipboard(keys.apiKey)} className="p-2 hover:bg-accent rounded-md"><Copy size={18} /></button>
              </div>
            </FormField>

            <FormField label="Backed URL">
              <input
                type="text"
                value={keys.callbackUrl}
                onChange={(e) => setKeys({ ...keys, callbackUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-md border bg-background"
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Secret Key">
                <div className="flex gap-2">
                  <input type="text" value={keys.secretKey} readOnly className="flex-1 px-3 py-2 rounded-md bg-secondary/50 border-none font-mono text-sm" />
                  <button onClick={() => copyToClipboard(keys.secretKey)} className="p-2 hover:bg-accent rounded-md"><Copy size={18} /></button>
                </div>
              </FormField>
              <FormField label="Merchant Key">
                <div className="flex gap-2">
                  <input type="text" value={keys.merchantKey} readOnly className="flex-1 px-3 py-2 rounded-md bg-secondary/50 border-none font-mono text-sm" />
                  <button onClick={() => copyToClipboard(keys.merchantKey)} className="p-2 hover:bg-accent rounded-md"><Copy size={18} /></button>
                </div>
              </FormField>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleCreateNewKey} variant="secondary" icon={<RefreshCw size={18} />} className="flex-1">Create New Key</Button>
              <Button onClick={handleSave} icon={<Save size={18} />} className="flex-1">Save</Button>
            </div>
          </div>
        </Card>

        <Card title="Example JSON Response">
          <pre className="bg-secondary/50 p-4 rounded-lg text-xs font-mono overflow-x-auto">
            {`{
  "status": 200,
  "data": {
    "transaction_id": "tx_123456",
    "amount": 100.00,
    "currency": "USDT",
    "status": "completed"
  }
}`}
          </pre>
          <button
            onClick={() => copyToClipboard(`{\n  "status": 200,\n  "data": {\n    "transaction_id": "tx_123456",\n    "amount": 100.00,\n    "currency": "USDT",\n    "status": "completed"\n  }\n}`)}
            className="mt-4 text-sm text-primary hover:underline flex items-center gap-1"
          >
            <Copy size={14} /> Copy JSON
          </button>
        </Card>
      </div>

      <Card title="API Logs">
        <table className="w-full text-sm text-left">
          <thead className="bg-secondary/50 text-muted-foreground font-medium">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Endpoint</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {logs.map((log, i) => (
              <tr key={i} className="hover:bg-accent/50">
                <td className="px-6 py-4">{log.date}</td>
                <td className="px-6 py-4 font-mono text-xs">{log.endpoint}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${log.status.startsWith('2') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

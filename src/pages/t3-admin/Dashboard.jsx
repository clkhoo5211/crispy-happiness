import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownLeft, ArrowUpRight, Wallet, Activity, Eye } from 'lucide-react';
import { Card, Button } from '../../components/ui';

export default function T3AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Incoming Funds', amount: '6,000.00 USDT', subtext: 'Monthly: 2,000.00 USDT', type: 'incoming' },
    { title: 'Total Outgoing Funds', amount: '4,000.00 USDT', subtext: 'Monthly: 2,000.00 USDT', type: 'outgoing' },
  ];

  const weeklyData = [
    { day: 'Mon', in: 60, out: 40 },
    { day: 'Tue', in: 80, out: 30 },
    { day: 'Wed', in: 45, out: 60 },
    { day: 'Thu', in: 90, out: 50 },
    { day: 'Fri', in: 75, out: 45 },
    { day: 'Sat', in: 50, out: 30 },
    { day: 'Sun', in: 65, out: 40 },
  ];

  const recentWithdrawals = [
    { id: 'ap123451', merchant: 'Food Merchant', amount: '10,000.00 USDT', status: 'Pending' },
    { id: 'ap123452', merchant: 'Tech Gadgets', amount: '5,500.00 USDT', status: 'Approved' },
    { id: 'ap123453', merchant: 'Bakery Delight', amount: '2,250.00 USDT', status: 'Rejected' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">T3 Dashboard</h1>
        <Button icon={<Wallet size={16} />}>Connect Wallet</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-card p-6 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.type === 'incoming' ? 'bg-green-500' : 'bg-red-500'}`}>
                {stat.type === 'incoming' ? <ArrowDownLeft size={24} className="text-white" /> : <ArrowUpRight size={24} className="text-white" />}
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-muted-foreground text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold mt-1">{stat.amount}</p>
            <p className="text-xs text-muted-foreground mt-2">{stat.subtext}</p>
          </div>
        ))}

        <div className="bg-card p-6 rounded-xl border shadow-sm lg:col-span-2">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Activity size={18} />
            Weekly Funds Overview
          </h3>
          <div className="h-24 flex items-end justify-between gap-4">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end gap-1 h-full group relative">
                <div className="w-full bg-green-500/80 rounded-t-sm" style={{ height: `${d.in}%` }}></div>
                <div className="w-full bg-red-500/80 rounded-t-sm" style={{ height: `${d.out}%` }}></div>
                <span className="text-[10px] text-center text-muted-foreground mt-1">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card title="Recent Withdrawals">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">App ID</th>
                <th className="px-4 py-3">Merchant</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentWithdrawals.map((row, i) => (
                <tr key={i} className="hover:bg-secondary/20">
                  <td className="px-4 py-3 font-medium">{row.id}</td>
                  <td className="px-4 py-3">{row.merchant}</td>
                  <td className="px-4 py-3">{row.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      row.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/t3-admin/withdrawals/${row.id}`)}
                      className="p-2 hover:bg-accent rounded-md text-muted-foreground hover:text-foreground transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

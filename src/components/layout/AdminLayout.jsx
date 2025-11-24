import React from 'react';
import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import Sidebar from './Sidebar';
import Header from './Header';
import { LayoutDashboard, Users, FileText, Settings, CreditCard, Activity, Database } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getCurrentUser();

  if (!user || (user.role !== 'system-admin' && user.role !== 't3-admin')) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const getNavItems = () => {
    if (user.role === 'system-admin') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/system-admin' },
        { icon: Users, label: 'Merchant Management', path: '/system-admin/merchants' },
        { icon: Users, label: 'Agent Management', path: '/system-admin/agents' },
        { icon: Users, label: 'User Management', path: '/system-admin/users' },
        { icon: CreditCard, label: 'Bonus Management', path: '/system-admin/bonus' },
        { icon: Activity, label: 'Fees Management', path: '/system-admin/fees', includesPaths: ['/system-admin/transactions'] },
        { icon: FileText, label: 'System Logs', path: '/system-admin/logs' },
      ];
    } else {
      // T3 Admin
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/t3-admin' },
        { icon: Users, label: 'Merchant Management', path: '/t3-admin/merchants' },
        { icon: Users, label: 'User Management', path: '/t3-admin/users' },
        { icon: CreditCard, label: 'Withdrawal Management', path: '/t3-admin/withdrawals' },
        { icon: Database, label: 'Account Management', path: '/t3-admin/accounts' },
        { icon: Settings, label: 'API Settings', path: '/t3-admin/api-settings' },
      ];
    }
  };

  const navItems = getNavItems();
  const currentTitle = navItems.find(i => i.path === location.pathname)?.label || 'Dashboard';

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        title={user.role === 'system-admin' ? 'System Admin' : 'T3 Admin'}
        subtitle="Management Portal"
        navItems={navItems}
        user={user}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={currentTitle} walletAddress={user.role === 'system-admin' ? "0xSys...Admin" : "0xT3...Admin"} />
        <main className="flex-1 overflow-y-auto p-6 bg-secondary/20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

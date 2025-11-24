import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { authService } from '../../services/authService';

const SidebarItem = ({ icon: Icon, label, path, active }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(path)}
      className={cn(
        "flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors rounded-lg mb-1",
        active ? "bg-primary text-primary-foreground" : "hover:bg-accent text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </div>
  );
};

export default function Sidebar({ title, subtitle, navItems, user, onLogout }) {
  const location = useLocation();

  return (
    <div className="w-64 border-r bg-card flex flex-col h-full">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        <p className="text-xs text-muted-foreground mt-1 capitalize">{subtitle}</p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {navItems.map((item) => {
          // Exact match or child route match
          // Dashboard should only be active on exact match
          const isDashboard = item.path.endsWith('/system-admin') || item.path.endsWith('/t3-admin') || item.path.endsWith('/merchant') || item.path.endsWith('/agent');

          // Check if current path matches this item
          let isActive = isDashboard
            ? location.pathname === item.path
            : location.pathname === item.path || location.pathname.startsWith(item.path + '/');

          // Also check includesPaths if defined (for special cases like transactions under Fees Management)
          if (!isActive && item.includesPaths) {
            isActive = item.includesPaths.some(path => location.pathname.startsWith(path));
          }

          return (
            <SidebarItem
              key={item.path}
              {...item}
              active={isActive}
            />
          );
        })}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User size={16} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors text-sm font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

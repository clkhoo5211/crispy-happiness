import React from 'react';
import { Wallet } from 'lucide-react';

export default function Header({ title, walletAddress }) {
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold">
        {title}
      </h2>
      <div className="flex items-center gap-4">
        {walletAddress && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full text-sm font-medium">
            <Wallet size={16} className="text-primary" />
            <span>{walletAddress}</span>
          </div>
        )}
      </div>
    </header>
  );
}

'use client';
/* eslint-disable tailwindcss/classnames-order */

import { type ReactNode, useState } from 'react';

import { Sidebar } from '@/components/dashboard/Sidebar';
import { cn } from '@/lib/utils';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-white">
      <div className="fixed inset-0 pointer-events-none hero-gradient opacity-60" />
      <div className="fixed inset-0 pointer-events-none noise-overlay opacity-50" />

      <Sidebar isCollapsed={collapsed} onToggleCollapse={() => setCollapsed((prev) => !prev)} />

      <main
        className={cn(
          'relative z-10 px-4 pb-8 pt-20 transition-all duration-300 ease-in-out md:px-8 md:py-8',
          collapsed ? 'md:pl-[112px]' : 'md:pl-[296px]',
        )}
      >
        {children}
      </main>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Menu,
  PlayCircle,
  PlusSquare,
  Settings,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type SidebarProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/upcoming', label: 'Upcoming', icon: CalendarClock },
  { href: '/personal-room', label: 'Personal Room', icon: Users },
  { href: '/recordings', label: 'Recordings', icon: PlayCircle },
  { href: '/previous', label: 'History', icon: PlusSquare },
];

function NavLinks({ isCollapsed, closeMobile }: { isCollapsed: boolean; closeMobile?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={href}
            onClick={closeMobile}
            className={cn(
              'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300 ease-in-out',
              isActive
                ? 'bg-[#17314D]/65 text-white shadow-[0_0_24px_rgba(77,162,255,0.35)]'
                : 'text-white/70 hover:bg-white/5 hover:text-white',
            )}
          >
            <span
              className={cn(
                'absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full transition-all duration-300 ease-in-out',
                isActive ? 'bg-[#66B6FF] shadow-[0_0_12px_rgba(102,182,255,0.8)]' : 'bg-transparent',
              )}
            />
            <Icon className={cn('size-[18px] shrink-0', isActive ? 'text-[#9ED0FF]' : 'text-white/60')} />
            {!isCollapsed && <span>{label}</span>}
          </Link>
        );
      })}
    </div>
  );
}

export function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="fixed left-4 top-4 z-50 md:hidden">
        <Button variant="secondary" size="icon" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
          <Menu className="size-5" />
        </Button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="fixed inset-y-0 left-0 z-50 w-[280px] border-r border-white/10 bg-[#0C1220]/90 p-4 backdrop-blur-2xl md:hidden"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-display text-lg text-white">Fenix</p>
                <p className="text-xs text-white/55">Meeting control center</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close navigation">
                <X className="size-5" />
              </Button>
            </div>

            <NavLinks isCollapsed={false} closeMobile={() => setMobileOpen(false)} />
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <motion.aside
        animate={{ width: isCollapsed ? 88 : 272 }}
        transition={{ duration: 0.32, ease: 'easeInOut' }}
        className="fixed inset-y-0 left-0 hidden border-r border-white/10 bg-[#0C1220]/75 p-4 backdrop-blur-2xl md:block"
      >
        <div className="mb-6 flex items-center justify-between gap-2">
          {!isCollapsed && (
            <div>
              <p className="font-display text-xl text-white">Fenix</p>
              <p className="text-xs text-white/55">Real-time dashboard</p>
            </div>
          )}

          <Button variant="ghost" size="icon" onClick={onToggleCollapse} aria-label="Collapse sidebar">
            {isCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </Button>
        </div>

        <NavLinks isCollapsed={isCollapsed} />

        <div className="mt-6 border-t border-white/10 pt-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">
            <Settings className="size-[18px]" />
            {!isCollapsed && <span>Settings</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

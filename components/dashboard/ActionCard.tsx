'use client';

import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

import { GlassPanel } from '@/components/ui/GlassPanel';
import { cn } from '@/lib/utils';

type ActionCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: 'blue' | 'purple' | 'orange';
  featured?: boolean;
  onClick?: () => void;
};

const toneStyles = {
  blue: {
    glow: 'shadow-[0_0_45px_rgba(77,162,255,0.28)]',
    ring: 'group-hover:border-[#4DA2FF]/70',
    icon: 'text-[#8BCAFF]',
  },
  purple: {
    glow: 'shadow-[0_0_45px_rgba(145,91,255,0.25)]',
    ring: 'group-hover:border-[#A174FF]/65',
    icon: 'text-[#CAB0FF]',
  },
  orange: {
    glow: 'shadow-[0_0_45px_rgba(255,157,80,0.25)]',
    ring: 'group-hover:border-[#FFA154]/65',
    icon: 'text-[#FFD4AA]',
  },
};

export function ActionCard({ title, description, icon: Icon, tone, featured, onClick }: ActionCardProps) {
  const toneStyle = toneStyles[tone];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className={cn('group relative w-full text-left', featured ? 'lg:col-span-2' : '')}
    >
      <GlassPanel
        glow={tone}
        className={cn(
          'relative overflow-hidden border-white/15 p-5 transition-all duration-300 ease-in-out md:p-6',
          toneStyle.glow,
          toneStyle.ring,
          featured ? 'min-h-[220px]' : 'min-h-[180px]',
        )}
      >
        <span className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-white/5 blur-2xl transition-transform duration-300 ease-in-out group-hover:scale-125" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className={cn('inline-flex size-11 items-center justify-center rounded-xl border border-white/20 bg-white/10', toneStyle.icon)}
          >
            <Icon className="size-5" />
          </motion.div>

          <div className="mt-6">
            <h3 className={cn('font-display text-xl text-white', featured ? 'md:text-2xl' : 'md:text-xl')}>{title}</h3>
            <p className="mt-2 max-w-sm text-sm text-white/65">{description}</p>
          </div>
        </div>
      </GlassPanel>
    </motion.button>
  );
}

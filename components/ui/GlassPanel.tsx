import * as React from 'react';

import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

type GlassPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  glow?: 'blue' | 'purple' | 'orange' | 'none';
};

const glowMap = {
  blue: 'shadow-[0_0_42px_rgba(38,132,255,0.22)]',
  purple: 'shadow-[0_0_42px_rgba(145,91,255,0.22)]',
  orange: 'shadow-[0_0_42px_rgba(255,145,77,0.22)]',
  none: '',
};

export function GlassPanel({ className, glow = 'none', ...props }: GlassPanelProps) {
  return (
    <Card
      className={cn(
        'border-white/15 bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-2xl',
        glowMap[glow],
        className,
      )}
      {...props}
    />
  );
}

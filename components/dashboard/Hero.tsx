'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, Sparkles } from 'lucide-react';

import { GlassPanel } from '@/components/ui/GlassPanel';

type HeroProps = {
  userName: string;
  nextMeeting: {
    title: string;
    startsAt: Date;
  };
};

function getGreeting(hour: number) {
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

export function Hero({ userName, nextMeeting }: HeroProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const greeting = useMemo(() => getGreeting(now.getHours()), [now]);
  const time = useMemo(
    () =>
      now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    [now],
  );

  const date = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
      }).format(now),
    [now],
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0D1422] px-5 py-8 md:px-8 md:py-10"
    >
      <div className="hero-gradient absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 noise-overlay" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B0F19] to-transparent" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#98D1FF]">
            <Sparkles className="size-3.5" />
            Live Collaboration
          </p>

          <h1 className="font-display text-3xl leading-tight text-white md:text-4xl xl:text-5xl">
            {greeting}, {userName}
          </h1>

          <p className="max-w-xl text-sm text-white/70 md:text-base">
            Fenix gives you a live control layer for meetings, recordings, and follow-ups.
          </p>

          <div className="space-y-2">
            <p className="font-display text-4xl font-semibold tracking-tight text-white md:text-6xl">{time}</p>
            <p className="text-sm text-[#AFC8E8] md:text-base">{date}</p>
          </div>
        </div>

        <GlassPanel glow="blue" className="w-full max-w-sm p-4 md:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Upcoming Meeting</p>
              <h2 className="mt-2 text-lg font-semibold text-white">{nextMeeting.title}</h2>
              <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#98D1FF]">
                <CalendarClock className="size-4" />
                {nextMeeting.startsAt.toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
            <span className="pulse-dot" />
          </div>
        </GlassPanel>
      </div>
    </motion.section>
  );
}

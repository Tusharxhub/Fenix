'use client';

import { motion } from 'framer-motion';
import { Clock3, Dot, Users } from 'lucide-react';

import { GlassPanel } from '@/components/ui/GlassPanel';

type MeetingItem = {
  id: string;
  title: string;
  time: string;
  attendees: number;
  status: 'live' | 'scheduled';
};

type ActivityPanelProps = {
  meetings: MeetingItem[];
};

export function ActivityPanel({ meetings }: ActivityPanelProps) {
  return (
    <GlassPanel className="h-full p-5 md:p-6" glow="purple">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg text-white">Activity Feed</h3>
        <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-xs text-white/65">
          {meetings.length} events
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {meetings.map((meeting, index) => (
          <motion.div
            key={meeting.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: index * 0.05, ease: 'easeInOut' }}
            className="rounded-xl border border-white/10 bg-white/5 p-3.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">{meeting.title}</p>
                <p className="mt-1 inline-flex items-center gap-2 text-xs text-white/60">
                  <Clock3 className="size-3.5" />
                  {meeting.time}
                </p>
              </div>

              <p
                className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] uppercase tracking-[0.12em] ${
                  meeting.status === 'live'
                    ? 'bg-[#ff7f6b1f] text-[#FF9F8B]'
                    : 'bg-[#4da2ff1f] text-[#9FCDFF]'
                }`}
              >
                <Dot className="size-4" />
                {meeting.status}
              </p>
            </div>

            <p className="mt-3 inline-flex items-center gap-2 text-xs text-white/65">
              <Users className="size-3.5" />
              {meeting.attendees} attendees
            </p>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}

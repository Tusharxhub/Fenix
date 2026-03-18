"use client";

import { CalendarPlus, Link2, PlaySquare, Video } from 'lucide-react';

import { ActionCard } from '@/components/dashboard/ActionCard';
import { ActivityPanel } from '@/components/dashboard/ActivityPanel';
import { Hero } from '@/components/dashboard/Hero';

const actions = [
  {
    title: 'New Meeting',
    description: 'Start a secure room instantly with one click and share invitation links in real time.',
    icon: Video,
    tone: 'blue' as const,
    featured: true,
  },
  {
    title: 'Join Meeting',
    description: 'Enter with a room ID or personal invite code and jump directly into the conversation.',
    icon: Link2,
    tone: 'purple' as const,
  },
  {
    title: 'Schedule Meeting',
    description: 'Plan collaborative sessions with timezone-friendly slots and reminders.',
    icon: CalendarPlus,
    tone: 'orange' as const,
  },
  {
    title: 'View Recordings',
    description: 'Review your sessions, key moments, and call insights from your media archive.',
    icon: PlaySquare,
    tone: 'blue' as const,
  },
];

const activity = [
  { id: 'm1', title: 'Design Sprint Sync', time: '10:30 AM', attendees: 7, status: 'live' as const },
  { id: 'm2', title: 'Weekly Product Review', time: '1:00 PM', attendees: 12, status: 'scheduled' as const },
  { id: 'm3', title: 'Customer Deep-Dive', time: '3:45 PM', attendees: 5, status: 'scheduled' as const },
  { id: 'm4', title: 'Engineering Standup', time: '5:15 PM', attendees: 9, status: 'scheduled' as const },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      <Hero
        userName="User"
        nextMeeting={{
          title: 'Q1 Strategy Call',
          startsAt: new Date(Date.now() + 1000 * 60 * 45),
        }}
      />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
          {actions.map((action, index) => (
            <ActionCard
              key={action.title}
              title={action.title}
              description={action.description}
              icon={action.icon}
              tone={action.tone}
              featured={index === 0 ? action.featured : false}
            />
          ))}
        </div>

        <div className="floating-panel">
          <ActivityPanel meetings={activity} />
        </div>
      </section>
    </div>
  );
}

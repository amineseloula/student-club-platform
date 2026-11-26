// Demo figures for the board dashboard (page 29).
import { getEvents } from '../../../mocks/events';

export const stats = [
  { id: 'members',      icon: 'users',    tone: 'green',  label: 'Active members',  value: '284',               hint: '+18 this month' },
  { id: 'applications', icon: 'file',     tone: 'yellow', label: 'Applications',    value: '7',                 hint: 'To review' },
  { id: 'events',       icon: 'calendar', tone: 'blue',   label: 'Upcoming events', value: '6',                 hint: 'This quarter' },
  { id: 'attendance',   icon: 'check',    tone: 'green',  label: 'Attendance rate', value: '87%',               hint: '+4% vs March' },
  { id: 'balance',      icon: 'wallet',   tone: 'navy',   label: 'Club balance',    value: '184,250', unit: 'DZD', hint: 'Updated yesterday' },
];

export const monthlySignups = [
  { month: 'Nov', value: 105 },
  { month: 'Dec', value: 155 },
  { month: 'Jan', value: 138 },
  { month: 'Feb', value: 215 },
  { month: 'Mar', value: 250 },
  { month: 'Apr', value: 292, current: true },
];

export const recentActivity = [
  { id: 1, icon: 'user',      tone: 'green',  title: 'Nadia Ait joined the club',          time: '12 min ago' },
  { id: 2, icon: 'calendar',  tone: 'blue',   title: 'Lac Noir Trip published',            time: '1 h ago' },
  { id: 3, icon: 'wallet',    tone: 'yellow', title: '1,500 DZD membership fee received',  time: '3 h ago' },
  { id: 4, icon: 'megaphone', tone: 'red',    title: 'New announcement published',         time: 'Yesterday at 6:20 PM' },
];

export function getUpcomingEvents() {
  return getEvents()
    .filter((event) => event.status === 'open' || event.status === 'full')
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);
}

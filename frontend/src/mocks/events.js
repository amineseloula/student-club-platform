// Fake API for events: demo data kept in memory (resets on page refresh).
// TODO: replace these functions with calls to the backend.
import lacNoirThumb from '../assets/member/lac-noir-thumb.jpg';
import volleyballThumb from '../assets/member/volleyball-thumb.jpg';
import soireeThumb from '../assets/member/soiree-thumb.jpg';

// TODO: confirm the categories with the team (only "Outing & discovery" is in the Figma).
export const EVENT_CATEGORIES = [
  { value: 'outing',  label: 'Outing & discovery' },
  { value: 'sport',   label: 'Sport' },
  { value: 'culture', label: 'Culture & music' },
  { value: 'contest', label: 'Contest' },
  { value: 'other',   label: 'Other' },
];

let events = [
  {
    id: 1, name: 'Lac Noir Trip', image: lacNoirThumb, category: 'outing', price: 1200,
    description: 'A day hike to the Lac Noir in the Akfadou forest.',
    date: '2025-04-26', startTime: '06:30', returnTime: '19:00',
    location: 'Akfadou', meetingPoint: 'ESTIN campus main entrance',
    capacity: 50, registered: 32, deadline: '2025-04-24T23:59', waitlist: true,
    status: 'open', createdBy: 'Amine M.',
  },
  {
    id: 2, name: 'Volleyball Tournament', image: volleyballThumb, category: 'sport', price: 0,
    description: '', date: '2025-05-03', startTime: '09:00', returnTime: '',
    location: 'ESTIN campus', meetingPoint: '',
    capacity: 48, registered: 48, deadline: '', waitlist: true,
    status: 'full', createdBy: 'Amine M.',
  },
  {
    id: 3, name: 'Music & Campfire Night', image: soireeThumb, category: 'culture', price: 0,
    description: '', date: '2025-05-10', startTime: '', returnTime: '',
    location: 'ESTIN campus', meetingPoint: '',
    capacity: 40, registered: 26, deadline: '', waitlist: true,
    status: 'open', createdBy: 'Amine M.',
  },
  {
    id: 4, name: 'Drawing Contest', image: null, category: 'contest', price: 0,
    description: '', date: '2025-05-17', startTime: '', returnTime: '',
    location: '', meetingPoint: '',
    capacity: 35, registered: 20, deadline: '', waitlist: false,
    status: 'draft', createdBy: 'Amine M.',
  },
  {
    id: 5, name: 'Winter Hike', image: null, category: 'outing', price: 800,
    description: '', date: '2025-02-22', startTime: '', returnTime: '',
    location: '', meetingPoint: '',
    capacity: 45, registered: 38, deadline: '', waitlist: false,
    status: 'past', createdBy: 'Amine M.',
  },
  {
    id: 6, name: 'Beach Volleyball Day', image: null, category: 'sport', price: 0,
    description: '', date: '2025-03-08', startTime: '', returnTime: '',
    location: '', meetingPoint: '',
    capacity: 30, registered: 30, deadline: '', waitlist: false,
    status: 'past', createdBy: 'Amine M.',
  },
];

export function getEvents() {
  return events;
}

export function getEventById(id) {
  return events.find((event) => event.id === Number(id)) ?? null;
}

export function saveEvent(data) {
  if (data.id) {
    events = events.map((event) => (event.id === data.id ? { ...event, ...data } : event));
    return getEventById(data.id);
  }

  const id = Math.max(0, ...events.map((event) => event.id)) + 1;
  const created = { registered: 0, createdBy: 'Amine M.', ...data, id };
  events = [...events, created];
  return created;
}

export function duplicateEvent(id) {
  const original = getEventById(id);
  if (!original) return null;
  return saveEvent({
    ...original,
    id: undefined,
    name: `${original.name} (copy)`,
    status: 'draft',
    registered: 0,
  });
}

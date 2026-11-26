// Fake API for announcements: demo data kept in memory (resets on page refresh).
// TODO: replace these functions with calls to the backend.
// TODO: confirm the audiences ("All registered participants" of which event?).
export const AUDIENCES = [
  { value: 'all',        label: 'All members' },
  { value: 'active',     label: 'Active members' },
  { value: 'registered', label: 'All registered participants' },
];

let announcements = [
  {
    id: 1, title: 'Early departure for Lac Noir', audience: 'registered',
    message: 'The bus will leave at 06:00 instead of 06:30. Please be at the main entrance on time.',
    status: 'published', pinned: true, dateLabel: 'Today, 10:24', reads: 186, attachmentName: '',
  },
  {
    id: 2, title: 'Membership fees — 2025 season', audience: 'all',
    message: 'The 2025 membership fee is 1,500 DZD. You can pay it to the treasurer.',
    status: 'published', pinned: false, dateLabel: 'Yesterday, 18:20', reads: 162, attachmentName: '',
  },
  {
    id: 3, title: 'SmashIT registrations are open', audience: 'all',
    message: '', status: 'published', pinned: false, dateLabel: 'Apr 18, 09:15', reads: 138, attachmentName: '',
  },
  {
    id: 4, title: 'Call for musicians', audience: 'active',
    message: '', status: 'draft', pinned: false, dateLabel: 'Apr 15, 16:40', reads: null, attachmentName: '',
  },
];

export function getAnnouncements() {
  return announcements;
}

export function getAnnouncementById(id) {
  return announcements.find((item) => item.id === Number(id)) ?? null;
}

export function saveAnnouncement(data) {
  if (data.id) {
    announcements = announcements.map((item) => (item.id === data.id ? { ...item, ...data } : item));
    return getAnnouncementById(data.id);
  }

  const id = Math.max(0, ...announcements.map((item) => item.id)) + 1;
  const created = { reads: null, ...data, id };
  announcements = [created, ...announcements]; // newest first
  return created;
}

export function duplicateAnnouncement(id) {
  const original = getAnnouncementById(id);
  if (!original) return null;
  return saveAnnouncement({
    ...original,
    id: undefined,
    title: `${original.title} (copy)`,
    status: 'draft',
    pinned: false,
    reads: null,
    dateLabel: 'Just now',
  });
}

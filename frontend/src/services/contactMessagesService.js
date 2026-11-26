// Shared Contact Message Service for Page 8 (Contact) and Page 52 (Board Inbox).
// Supports REST API when VITE_API_URL is configured and falls back cleanly to localStorage + mock data.
import { INITIAL_CONTACT_MESSAGES } from '../mocks/contactMessages';

const STORAGE_KEY = 'ldc_contact_messages_v1';
const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/contact-messages` : '';

function readStore() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Fallback to initial seed in restricted storage environments
  }
  const seeded = [...INITIAL_CONTACT_MESSAGES];
  writeStore(seeded);
  return seeded;
}

function writeStore(messages) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // Ignore quota errors in private browsing
  }
}

export async function listContactMessages() {
  if (API_BASE) {
    try {
      const response = await fetch(API_BASE);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) return data;
      }
    } catch {
      // Fall back to local mock store when backend endpoint is not yet running
    }
  }

  const messages = readStore();
  return [...messages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function submitContactMessage({ fullName, email, subject, message, consentAccepted }) {
  const payload = {
    fullName: fullName.trim(),
    email: email.trim(),
    subject,
    message: message.trim(),
    consentAccepted: Boolean(consentAccepted),
  };

  if (API_BASE) {
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fall back to shared local store
    }
  }

  const current = readStore();
  const nextId = current.reduce((max, item) => Math.max(max, Number(item.id) || 0), 100) + 1;
  const created = {
    id: nextId,
    ...payload,
    createdAt: new Date().toISOString(),
    isRead: false,
  };
  writeStore([created, ...current]);
  return created;
}

export async function setContactMessageReadStatus(id, isRead) {
  if (API_BASE) {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead }),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fall back to shared local store
    }
  }

  const current = readStore();
  let updatedItem = null;
  const next = current.map((msg) => {
    if (msg.id === id) {
      updatedItem = { ...msg, isRead };
      return updatedItem;
    }
    return msg;
  });
  writeStore(next);
  return updatedItem;
}

// A one-time message that survives one page change
// (e.g. the event form saves, then the events list shows "Event published").
let pendingMessage = null;

export function setFlash(message) {
  pendingMessage = message;
}

export function peekFlash() {
  return pendingMessage;
}

export function clearFlash() {
  pendingMessage = null;
}

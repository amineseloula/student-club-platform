import { useCallback, useEffect, useMemo, useState } from 'react';
import Avatar from '../../../components/Avatar/Avatar';
import Button from '../../../components/Button/Button';
import EmptyState from '../../../components/EmptyState/EmptyState';
import InfoBanner from '../../../components/InfoBanner/InfoBanner';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Panel from '../../../components/Panel/Panel';
import SearchInput from '../../../components/SearchInput/SearchInput';
import SegmentedControl from '../../../components/SegmentedControl/SegmentedControl';
import StatCard from '../../../components/StatCard/StatCard';
import StatusBadge from '../../../components/StatusBadge/StatusBadge';
import Toolbar from '../../../components/Toolbar/Toolbar';
import {
  listContactMessages,
  setContactMessageReadStatus,
} from '../../../services/contactMessagesService';
import styles from './ContactMessagesPage.module.css';

const FILTER_TABS = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'read', label: 'Read' },
];

const shortTimestamp = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const fullTimestamp = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

function formatMessageDate(iso, long = false) {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return long ? fullTimestamp.format(date) : shortTimestamp.format(date);
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState(null);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listContactMessages();
      setMessages(data);
      setSelectedId((prev) => {
        if (prev && data.some((item) => item.id === prev)) return prev;
        return data[0]?.id ?? null;
      });
    } catch {
      setError('Unable to load contact messages right now. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    listContactMessages()
      .then((data) => {
        if (!active) return;
        setMessages(data);
        setSelectedId((prev) => {
          if (prev && data.some((item) => item.id === prev)) return prev;
          return data[0]?.id ?? null;
        });
        setError('');
      })
      .catch(() => {
        if (!active) return;
        setError('Unable to load contact messages right now. Please try again.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const unreadCount = useMemo(() => messages.filter((m) => !m.isRead).length, [messages]);
  const readCount = messages.length - unreadCount;

  const filteredMessages = useMemo(() => {
    const query = search.trim().toLowerCase();
    return messages.filter((msg) => {
      const matchesStatus =
        filter === 'all' ||
        (filter === 'unread' && !msg.isRead) ||
        (filter === 'read' && msg.isRead);
      const matchesQuery =
        !query ||
        msg.fullName.toLowerCase().includes(query) ||
        msg.email.toLowerCase().includes(query) ||
        msg.subject.toLowerCase().includes(query) ||
        msg.message.toLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  }, [messages, filter, search]);

  const selectedMessage = useMemo(
    () =>
      filteredMessages.find((m) => m.id === selectedId) ||
      filteredMessages[0] ||
      null,
    [filteredMessages, selectedId]
  );

  const handleToggleRead = async (msg, nextRead) => {
    try {
      const updated = await setContactMessageReadStatus(msg.id, nextRead);
      setMessages((prev) =>
        prev.map((item) => (item.id === msg.id ? updated || { ...item, isRead: nextRead } : item))
      );
      setFeedback({
        tone: 'success',
        title: nextRead
          ? `Message from ${msg.fullName} marked as read.`
          : `Message from ${msg.fullName} marked as unread.`,
      });
    } catch {
      setFeedback({
        tone: 'danger',
        title: 'Could not update message status. Please try again.',
      });
    }
  };

  const handleSelectMessage = (msg) => {
    setSelectedId(msg.id);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="Contact messages"
        subtitle="Inbox for inquiries submitted through the public Contact page."
        actions={
          <Button variant="secondary" href="#/contact">
            View public contact page
          </Button>
        }
      />

      {feedback && (
        <InfoBanner
          tone={feedback.tone}
          icon={feedback.tone === 'danger' ? 'info' : 'check'}
          title={feedback.title}
          onDismiss={() => setFeedback(null)}
        />
      )}

      {/* Summary Counters */}
      <section className={styles.statsGrid} aria-label="Inbox summary">
        <StatCard
          icon="bell"
          tone="navy"
          label="Total messages"
          value={messages.length}
          hint="All public inquiries"
        />
        <StatCard
          icon="info"
          tone="yellow"
          label="Unread"
          value={unreadCount}
          hint={unreadCount > 0 ? 'Awaiting board review' : 'Inbox caught up'}
        />
        <StatCard
          icon="check"
          tone="green"
          label="Read"
          value={readCount}
          hint="Reviewed by board"
        />
      </section>

      {/* Search & Filter Toolbar */}
      <Toolbar>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search sender, e-mail, subject or message…"
          label="Search contact messages"
        />
        <SegmentedControl
          options={FILTER_TABS}
          value={filter}
          onChange={setFilter}
          label="Filter messages by read status"
        />
      </Toolbar>

      {/* Loading / Error / Empty / Split Inbox */}
      {loading ? (
        <Panel>
          <div className={styles.stateBox} role="status">
            <p className={styles.stateTitle}>Loading messages…</p>
            <p className={styles.stateText}>Fetching messages from the shared contact inbox.</p>
          </div>
        </Panel>
      ) : error ? (
        <Panel>
          <EmptyState
            icon="info"
            title="Could not load inbox"
            action={<Button onClick={loadMessages}>Retry</Button>}
          >
            {error}
          </EmptyState>
        </Panel>
      ) : filteredMessages.length === 0 ? (
        <Panel>
          <EmptyState
            icon="bell"
            title={search || filter !== 'all' ? 'No matching messages' : 'No contact messages yet'}
            action={
              (search || filter !== 'all') && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearch('');
                    setFilter('all');
                  }}
                >
                  Reset filters
                </Button>
              )
            }
          >
            {search || filter !== 'all'
              ? 'Try another search query or switch the status filter.'
              : 'Messages submitted from the Contact form will appear here automatically.'}
          </EmptyState>
        </Panel>
      ) : (
        <div className={styles.inboxGrid}>
          {/* Left: Messages List */}
          <Panel title="Inbox" subtitle={`${filteredMessages.length} message(s)`} flush>
            <ul className={styles.messageList} aria-label="Contact messages list">
              {filteredMessages.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id;
                return (
                  <li key={msg.id}>
                    <button
                      type="button"
                      className={`${styles.messageRow} ${isSelected ? styles.messageRowSelected : ''} ${
                        !msg.isRead ? styles.messageRowUnread : ''
                      }`}
                      onClick={() => handleSelectMessage(msg)}
                    >
                      <div className={styles.rowTop}>
                        <div className={styles.senderGroup}>
                          {!msg.isRead && <span className={styles.unreadDot} aria-label="Unread" />}
                          <strong className={styles.senderName}>{msg.fullName}</strong>
                        </div>
                        <span className={styles.rowDate}>{formatMessageDate(msg.createdAt)}</span>
                      </div>

                      <div className={styles.rowSubjectRow}>
                        <span className={styles.rowSubject}>{msg.subject}</span>
                        <StatusBadge tone={msg.isRead ? 'neutral' : 'warning'}>
                          {msg.isRead ? 'Read' : 'Unread'}
                        </StatusBadge>
                      </div>

                      <p className={styles.rowPreview}>{msg.message}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Panel>

          {/* Right: Selected Message Details */}
          <Panel title="Message details" subtitle={selectedMessage ? selectedMessage.subject : undefined}>
            {selectedMessage && (
              <div className={styles.detailView}>
                <header className={styles.detailHeader}>
                  <div className={styles.detailSender}>
                    <Avatar name={selectedMessage.fullName} tone={selectedMessage.isRead ? 'blue' : 'green'} size="lg" />
                    <div>
                      <h3 className={styles.detailName}>{selectedMessage.fullName}</h3>
                      <a href={`mailto:${selectedMessage.email}`} className={styles.detailEmail}>
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>

                  <StatusBadge tone={selectedMessage.isRead ? 'neutral' : 'warning'}>
                    {selectedMessage.isRead ? 'Read' : 'Unread'}
                  </StatusBadge>
                </header>

                <dl className={styles.metaGrid}>
                  <div>
                    <dt>Subject</dt>
                    <dd>{selectedMessage.subject}</dd>
                  </div>
                  <div>
                    <dt>Submitted on</dt>
                    <dd>{formatMessageDate(selectedMessage.createdAt, true)}</dd>
                  </div>
                </dl>

                <div className={styles.messageBody}>
                  <p>{selectedMessage.message}</p>
                </div>

                <div className={styles.detailActions}>
                  <Button
                    href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                      `Re: ${selectedMessage.subject} — LDC ESTIN`
                    )}`}
                    icon="arrowRight"
                  >
                    Reply by email
                  </Button>

                  <Button
                    variant="secondary"
                    icon={selectedMessage.isRead ? 'bell' : 'check'}
                    onClick={() => handleToggleRead(selectedMessage, !selectedMessage.isRead)}
                  >
                    {selectedMessage.isRead ? 'Mark as unread' : 'Mark as read'}
                  </Button>
                </div>
              </div>
            )}
          </Panel>
        </div>
      )}
    </div>
  );
}

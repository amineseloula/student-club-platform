import { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import DataTable from '../../../components/DataTable/DataTable';
import IconButton from '../../../components/IconButton/IconButton';
import InfoBanner from '../../../components/InfoBanner/InfoBanner';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Panel from '../../../components/Panel/Panel';
import SearchInput from '../../../components/SearchInput/SearchInput';
import SegmentedControl from '../../../components/SegmentedControl/SegmentedControl';
import StatusBadge from '../../../components/StatusBadge/StatusBadge';
import Toolbar from '../../../components/Toolbar/Toolbar';
import { AUDIENCES, duplicateAnnouncement, getAnnouncements } from '../../../mocks/announcements';
import { clearFlash, peekFlash } from '../../../utils/flash';
import styles from './AnnouncementsListPage.module.css';

const STATUS_TABS = [
  { value: 'all',       label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'draft',     label: 'Drafts' },
];

function getStatusBadge(item) {
  if (item.status === 'draft') return { label: 'Draft', tone: 'neutral' };
  if (item.status === 'scheduled') return { label: 'Scheduled', tone: 'info' };
  if (item.pinned) return { label: 'Pinned', tone: 'warning' };
  return { label: 'Published', tone: 'success' };
}

function getAudienceLabel(value) {
  return AUDIENCES.find((audience) => audience.value === value)?.label ?? '—';
}

export default function AnnouncementsListPage() {
  const [announcements, setAnnouncements] = useState(getAnnouncements);
  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState('all');

  // Show the message left by the previous page (e.g. "Event published") once, then clear it.
  const [message, setMessage] = useState(peekFlash);
  useEffect(() => clearFlash(), []);

  const query = search.trim().toLowerCase();
  const rows = announcements.filter((item) => {
    const matchesTab =
      statusTab === 'all' ||
      (statusTab === 'draft' ? item.status === 'draft' : item.status !== 'draft');
    return matchesTab && item.title.toLowerCase().includes(query);
  });

  const handleDuplicate = (item) => {
    const copy = duplicateAnnouncement(item.id);
    setAnnouncements(getAnnouncements());
    setMessage({ tone: 'success', title: `“${copy.title}” was created as a draft.` });
  };

  const columns = [
    { key: 'title', header: 'Title', render: (item) => <span className={styles.title}>{item.title}</span> },
    { key: 'audience', header: 'Audience', muted: true, render: (item) => getAudienceLabel(item.audience) },
    {
      key: 'status',
      header: 'Status',
      render: (item) => {
        const badge = getStatusBadge(item);
        return <StatusBadge tone={badge.tone}>{badge.label}</StatusBadge>;
      },
    },
    { key: 'dateLabel', header: 'Date', muted: true },
    { key: 'reads', header: 'Reads', muted: true, render: (item) => item.reads ?? '—' },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <div className={styles.actions}>
          <IconButton icon="pencil" label={`Edit — ${item.title}`} href={`#/bureau/annonces/${item.id}/modifier`} />
          <IconButton icon="copy" label={`Duplicate — ${item.title}`} onClick={() => handleDuplicate(item)} />
          {/* TODO: the "…" menu is not designed yet in Figma. */}
          <IconButton icon="more" label={`More actions — ${item.title}`} />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <PageHeader
        title="Announcements"
        subtitle="Inform members and target the right audience."
        actions={
          <Button icon="plus" href="#/bureau/annonces/nouvelle">
            New announcement
          </Button>
        }
      />

      {message && (
        <InfoBanner tone={message.tone} icon="check" title={message.title} onDismiss={() => setMessage(null)} />
      )}

      <Panel flush>
        <Toolbar inset>
          <SearchInput value={search} onChange={setSearch} placeholder="Search…" label="Search announcements" />
          <SegmentedControl
            options={STATUS_TABS}
            value={statusTab}
            onChange={setStatusTab}
            label="Filter announcements by status"
          />
        </Toolbar>
        <DataTable
          columns={columns}
          rows={rows}
          emptyMessage={query ? `No announcements match “${search.trim()}”.` : 'No announcements in this category yet.'}
        />
      </Panel>
    </div>
  );
}

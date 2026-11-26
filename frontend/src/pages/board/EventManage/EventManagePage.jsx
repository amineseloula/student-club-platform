import { useState } from 'react';
import Button from '../../../components/Button/Button';
import DataTable from '../../../components/DataTable/DataTable';
import EmptyState from '../../../components/EmptyState/EmptyState';
import Icon from '../../../components/Icon/Icon';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Panel from '../../../components/Panel/Panel';
import PersonCell from '../../../components/PersonCell/PersonCell';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import SearchInput from '../../../components/SearchInput/SearchInput';
import StatCard from '../../../components/StatCard/StatCard';
import StatusBadge from '../../../components/StatusBadge/StatusBadge';
import Tabs from '../../../components/Tabs/Tabs';
import Toolbar from '../../../components/Toolbar/Toolbar';
import { getEventById } from '../../../mocks/events';
import { sampleParticipants, sampleWaitlist } from '../../../mocks/participants';
import { downloadCsv } from '../../../utils/csv';
import { formatDateLong, shortName } from '../../../utils/format';
import styles from './EventManagePage.module.css';

const PARTICIPANT_STATUS = {
  present:   { label: 'Present',   tone: 'success' },
  confirmed: { label: 'Confirmed', tone: 'info' },
  absent:    { label: 'Absent',    tone: 'danger' },
  waitlist:  { label: 'Waiting',   tone: 'warning' },
};

const CSV_COLUMNS = [
  { header: 'Name',    value: (p) => p.name },
  { header: 'E-mail',  value: (p) => p.email },
  { header: 'Program', value: (p) => p.program },
  { header: 'Status',  value: (p) => (p.position ? `Waiting #${p.position}` : PARTICIPANT_STATUS[p.status].label) },
];

const TABLE_COLUMNS = [
  { key: 'member', header: 'Member', render: (p) => <PersonCell name={p.name} tone={p.tone} /> },
  { key: 'email', header: 'E-mail', muted: true },
  { key: 'program', header: 'Program', muted: true },
  {
    key: 'status',
    header: 'Status',
    render: (p) => (
      <StatusBadge tone={PARTICIPANT_STATUS[p.status].tone}>
        {p.position ? `Waiting #${p.position}` : PARTICIPANT_STATUS[p.status].label}
      </StatusBadge>
    ),
  },
  {
    key: 'action',
    header: 'Action',
    render: (p) =>
      p.memberId ? (
        <a href={`#/bureau/membres/${p.memberId}`} className={styles.link}>
          View<span className="visually-hidden"> {p.name}</span>
        </a>
      ) : (
        <span className={styles.muted}>Not a member yet</span>
      ),
  },
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function EventManagePage({ params = {} }) {
  const event = getEventById(params.id);
  const [tab, setTab] = useState('participants');
  const [search, setSearch] = useState('');

  if (!event) {
    return (
      <Panel>
        <EmptyState
          title="Event not found"
          action={<Button variant="secondary" href="#/bureau/evenements">Back to events</Button>}
        >
          This event doesn’t exist or was deleted.
        </EmptyState>
      </Panel>
    );
  }

  const participants = sampleParticipants;
  const waitlist = event.waitlist ? sampleWaitlist : [];
  const present = participants.filter((p) => p.status === 'present');

  const tabs = [
    { value: 'participants', label: 'Participants', count: event.registered, rows: participants },
    { value: 'waitlist',     label: 'Waiting list', count: waitlist.length,  rows: waitlist },
    { value: 'attendance',   label: 'Attendance',   count: present.length,   rows: present },
  ];

  const currentTab = tabs.find((t) => t.value === tab);
  const query = search.trim().toLowerCase();
  const rows = currentTab.rows.filter((p) =>
    [p.name, p.email, p.program].some((text) => text.toLowerCase().includes(query))
  );

  const exportRows = (list, suffix) =>
    downloadCsv(`${slugify(event.name)}-${suffix}.csv`, CSV_COLUMNS, list);

  return (
    <div className={styles.page}>
      <PageHeader
        title={event.name}
        subtitle={`${formatDateLong(event.date)} · ${event.location || 'Location to be confirmed'} · ${event.registered} participants of ${event.capacity}`}
        actions={
          <>
            <Button variant="secondary" icon="pencil" href={`#/bureau/evenements/${event.id}/modifier`}>
              Edit
            </Button>
            <Button variant="dark" icon="download" onClick={() => exportRows(participants, 'participants')}>
              Export
            </Button>
          </>
        }
      />

      <section className={styles.stats} aria-label="Event figures">
        <StatCard label="Registered" value={`${event.registered} / ${event.capacity}`}>
          <div className={styles.statBar}>
            <ProgressBar value={event.registered} max={event.capacity} label="Places taken" />
          </div>
        </StatCard>
        <StatCard
          label="Waiting list"
          value={waitlist.length}
          hint={waitlist.length > 0 ? `Next: ${shortName(waitlist[0].name)}` : 'Nobody is waiting'}
        />
        <StatCard label="Attendance" value={`${present.length} / ${event.registered}`} hint="Check-in in progress" />

        {/* TODO: the QR scanner screen is not designed yet, so "Open" does nothing for now. */}
        <article className={styles.qrCard}>
          <span className={styles.qrIcon}>
            <Icon name="scan" size={30} />
          </span>
          <div className={styles.qrText}>
            <p className={styles.qrTitle}>QR check-in</p>
            <p className={styles.qrHint}>Scan tickets at the entrance</p>
          </div>
          <Button>Open</Button>
        </article>
      </section>

      <Tabs
        tabs={tabs}
        value={tab}
        onChange={(value) => {
          setTab(value);
          setSearch('');
        }}
        label="Participant lists"
      />

      <Panel flush>
        <Toolbar inset>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Name, e-mail or program…"
            label="Search participants"
          />
          <Button variant="secondary" icon="download" onClick={() => exportRows(rows, tab)}>
            Export CSV
          </Button>
        </Toolbar>
        <DataTable
          columns={TABLE_COLUMNS}
          rows={rows}
          emptyMessage={query ? `Nobody matches “${search.trim()}”.` : 'Nobody in this list yet.'}
        />
      </Panel>
    </div>
  );
}

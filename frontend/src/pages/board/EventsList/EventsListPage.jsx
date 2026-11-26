import { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import EventsTable from '../../../components/EventsTable/EventsTable';
import InfoBanner from '../../../components/InfoBanner/InfoBanner';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Pagination from '../../../components/Pagination/Pagination';
import Panel from '../../../components/Panel/Panel';
import SearchInput from '../../../components/SearchInput/SearchInput';
import SegmentedControl from '../../../components/SegmentedControl/SegmentedControl';
import Toolbar from '../../../components/Toolbar/Toolbar';
import { duplicateEvent, getEvents } from '../../../mocks/events';
import { clearFlash, peekFlash } from '../../../utils/flash';
import styles from './EventsListPage.module.css';

const PAGE_SIZE = 4;

const STATUS_TABS = [
  { value: 'all',       label: 'All',       statuses: ['open', 'full', 'draft', 'past'] },
  { value: 'published', label: 'Published', statuses: ['open', 'full'] },
  { value: 'draft',     label: 'Drafts',    statuses: ['draft'] },
  { value: 'past',      label: 'Past',      statuses: ['past'] },
];

export default function EventsListPage() {
  const [events, setEvents] = useState(getEvents);
  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState('all');
  const [page, setPage] = useState(1);

  // Show the message left by the previous page (e.g. "Event published") once, then clear it.
  const [message, setMessage] = useState(peekFlash);
  useEffect(() => clearFlash(), []);

  const allowedStatuses = STATUS_TABS.find((tab) => tab.value === statusTab).statuses;
  const query = search.trim().toLowerCase();

  const filteredEvents = events.filter(
    (event) => allowedStatuses.includes(event.status) && event.name.toLowerCase().includes(query)
  );

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageEvents = filteredEvents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleTabChange = (value) => {
    setStatusTab(value);
    setPage(1);
  };

  const handleDuplicate = (event) => {
    const copy = duplicateEvent(event.id);
    setEvents(getEvents());
    setMessage({ tone: 'success', title: `“${copy.name}” was created as a draft.` });
  };

  const summary =
    filteredEvents.length === 0
      ? 'No events'
      : `Showing ${pageEvents.length} of ${filteredEvents.length} events`;

  return (
    <div className={styles.page}>
      <PageHeader
        title="Events"
        subtitle="Create, publish and track all club events."
        actions={
          <Button icon="plus" href="#/bureau/evenements/nouveau">
            New event
          </Button>
        }
      />

      {message && (
        <InfoBanner tone={message.tone} icon="check" title={message.title} onDismiss={() => setMessage(null)} />
      )}

      <Toolbar>
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for an event…"
          label="Search for an event"
        />
        <SegmentedControl
          options={STATUS_TABS}
          value={statusTab}
          onChange={handleTabChange}
          label="Filter events by status"
        />
        {/* TODO: the filters panel is not designed yet in Figma. */}
        <Button variant="secondary" icon="filter">
          Filters
        </Button>
      </Toolbar>

      {/* TODO: the "…" menu is not designed yet in Figma. */}
      <Panel flush>
        <EventsTable
          events={pageEvents}
          showCreatedBy
          showAllActions
          onDuplicate={handleDuplicate}
          emptyMessage={query ? `No events match “${search.trim()}”.` : 'No events in this category yet.'}
        />
        <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} summary={summary} />
      </Panel>
    </div>
  );
}

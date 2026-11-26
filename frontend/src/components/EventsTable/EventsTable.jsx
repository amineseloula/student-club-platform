import DataTable from '../DataTable/DataTable';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import ProgressBar from '../ProgressBar/ProgressBar';
import StatusBadge from '../StatusBadge/StatusBadge';
import { formatDate } from '../../utils/format';
import styles from './EventsTable.module.css';

const EVENT_STATUS = {
  open:  { label: 'Open',  tone: 'success' },
  full:  { label: 'Full',  tone: 'neutral' },
  draft: { label: 'Draft', tone: 'neutral' },
  past:  { label: 'Past',  tone: 'info' },
};

export default function EventsTable({
  events,
  showCreatedBy = false,
  showAllActions = false,
  onDuplicate,
  emptyMessage = 'No events to show.',
}) {
  const columns = [
    {
      key: 'event',
      header: 'Event',
      render: (event) => (
        <div className={styles.eventCell}>
          {event.image ? (
            <img src={event.image} alt="" className={styles.thumb} />
          ) : (
            <span className={`${styles.thumb} ${styles.thumbPlaceholder}`}>
              <Icon name="calendar" size={18} />
            </span>
          )}
          <span className={styles.eventName}>{event.name}</span>
        </div>
      ),
    },
    { key: 'date', header: 'Date', muted: true, render: (event) => formatDate(event.date) },
    {
      key: 'registrations',
      header: 'Registrations',
      render: (event) => (
        <div className={styles.capacityCell}>
          <span className={styles.capacityText}>
            {event.registered} / {event.capacity}
          </span>
          <ProgressBar value={event.registered} max={event.capacity} label={`Registrations for ${event.name}`} />
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (event) => (
        <StatusBadge tone={EVENT_STATUS[event.status].tone}>{EVENT_STATUS[event.status].label}</StatusBadge>
      ),
    },
    showCreatedBy && { key: 'createdBy', header: 'Created by', muted: true },
    {
      key: 'actions',
      header: 'Actions',
      render: (event) => (
        <div className={styles.actions}>
          <IconButton icon="users" label={`View participants — ${event.name}`} href={`#/bureau/evenements/${event.id}`} />
          <IconButton icon="pencil" label={`Edit — ${event.name}`} href={`#/bureau/evenements/${event.id}/modifier`} />
          {showAllActions && (
            <>
              <IconButton icon="copy" label={`Duplicate — ${event.name}`} onClick={() => onDuplicate?.(event)} />
              <IconButton icon="more" label={`More actions — ${event.name}`} />
            </>
          )}
        </div>
      ),
    },
  ].filter(Boolean); // removes the "Created by" column when showCreatedBy is false

  return <DataTable columns={columns} rows={events} emptyMessage={emptyMessage} />;
}

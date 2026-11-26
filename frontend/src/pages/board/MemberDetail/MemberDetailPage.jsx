import { useState } from 'react';
import Avatar from '../../../components/Avatar/Avatar';
import BackLink from '../../../components/BackLink/BackLink';
import Button from '../../../components/Button/Button';
import EmptyState from '../../../components/EmptyState/EmptyState';
import { Select } from '../../../components/Form/Form';
import IconTile from '../../../components/IconTile/IconTile';
import InfoBanner from '../../../components/InfoBanner/InfoBanner';
import Panel from '../../../components/Panel/Panel';
import StatusBadge from '../../../components/StatusBadge/StatusBadge';
import { ROLE_BADGE } from '../../../constants/memberDisplay';
import { getMemberById, PROGRAMS, ROLES, updateMember } from '../../../mocks/members';
import { formatDateLong } from '../../../utils/format';
import styles from './MemberDetailPage.module.css';

const STATUS_PILL = {
  active:   { label: 'Active member',   tone: 'success' },
  inactive: { label: 'Inactive member', tone: 'danger' },
};

const FEE_PILL = {
  paid:    { label: 'Fee paid',    tone: 'info' },
  pending: { label: 'Fee pending', tone: 'warning' },
  unpaid:  { label: 'Fee unpaid',  tone: 'danger' },
};

const ATTENDANCE_BADGE = {
  present: { label: 'Present', tone: 'success' },
  absent:  { label: 'Absent',  tone: 'danger' },
};

function formatYear(year) {
  const suffix = { 1: 'st', 2: 'nd', 3: 'rd' }[year] ?? 'th';
  return `${year}${suffix} year`;
}

export default function MemberDetailPage({ params = {} }) {
  const [member, setMember] = useState(() => getMemberById(params.id));
  const [isConfirming, setIsConfirming] = useState(false);
  const [message, setMessage] = useState(null);

  if (!member) {
    return (
      <div className={styles.page}>
        <BackLink href="#/bureau/membres">All members</BackLink>
        <Panel>
          <EmptyState title="Member not found">This member doesn’t exist or was removed.</EmptyState>
        </Panel>
      </div>
    );
  }

  const handleRoleChange = (e) => {
    const updated = updateMember(member.id, { role: e.target.value });
    setMember(updated);
    setMessage(`${updated.name} is now “${ROLE_BADGE[updated.role].label}”.`);
  };

  const handleStatusChange = (status) => {
    const updated = updateMember(member.id, { status });
    setMember(updated);
    setIsConfirming(false);
    setMessage(status === 'inactive' ? `${updated.name} was deactivated.` : `${updated.name} was reactivated.`);
  };

  const { events, attended } = member.stats;
  const attendanceRate = events > 0 ? Math.round((attended / events) * 100) : 0;
  const isActive = member.status === 'active';

  const infoRows = [
    { label: 'Student ID', value: member.studentId },
    { label: 'Program', value: PROGRAMS[member.program] ?? member.program },
    { label: 'Year', value: formatYear(member.year) },
    { label: 'Phone', value: member.phone },
    { label: 'Joined', value: formatDateLong(member.joined) },
    { label: 'Last activity', value: member.lastActivity },
  ];

  return (
    <div className={styles.page}>
      <BackLink href="#/bureau/membres">All members</BackLink>

      {message && <InfoBanner tone="success" icon="check" title={message} onDismiss={() => setMessage(null)} />}

      <Panel>
        <div className={styles.profile}>
          <Avatar name={member.name} tone={member.tone} size="xl" />

          <div className={styles.identity}>
            <h1 className={styles.name}>{member.name}</h1>
            <p className={styles.meta}>
              {member.email} · {member.clubId}
            </p>
            <div className={styles.pills}>
              <StatusBadge tone={STATUS_PILL[member.status].tone}>{STATUS_PILL[member.status].label}</StatusBadge>
              <StatusBadge tone={FEE_PILL[member.fee].tone}>{FEE_PILL[member.fee].label}</StatusBadge>
            </div>
          </div>

          <div className={styles.controls}>
            <div className={styles.roleRow}>
              <label htmlFor="role" className={styles.roleLabel}>
                Role
              </label>
              <div className={styles.roleSelect}>
                <Select id="role" options={ROLES} value={member.role} onChange={handleRoleChange} />
              </div>
            </div>

            {isActive ? (
              <Button variant="danger" onClick={() => setIsConfirming(true)}>
                Deactivate
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => handleStatusChange('active')}>
                Reactivate
              </Button>
            )}
          </div>
        </div>

        {isConfirming && (
          <div className={styles.confirm} role="alert">
            <p>
              Deactivate <strong>{member.name}</strong>? They will lose access to member features until they are
              reactivated.
            </p>
            <div className={styles.confirmButtons}>
              <Button variant="ghost" onClick={() => setIsConfirming(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => handleStatusChange('inactive')}>
                Yes, deactivate
              </Button>
            </div>
          </div>
        )}
      </Panel>

      <div className={styles.columns}>
        <Panel title="Information">
          <dl className={styles.infoList}>
            {infoRows.map((row) => (
              <div key={row.label} className={styles.infoRow}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel title="Activity summary">
          <dl className={styles.summary}>
            <div className={styles.summaryItem}>
              <dt>Events</dt>
              <dd>{events}</dd>
            </div>
            <div className={styles.summaryItem}>
              <dt>Attended</dt>
              <dd>{attended}</dd>
            </div>
            <div className={styles.summaryItem}>
              <dt>Attendance</dt>
              <dd>{attendanceRate}%</dd>
            </div>
          </dl>
        </Panel>
      </div>

      <Panel title="Events attended">
        {member.history.length === 0 ? (
          <p className={styles.emptyText}>No events yet.</p>
        ) : (
          <ul className={styles.history}>
            {member.history.map((item) => (
              <li key={item.id} className={styles.historyItem}>
                <IconTile icon="calendar" tone="green" />
                <div className={styles.historyText}>
                  <p className={styles.historyName}>{item.name}</p>
                  <p className={styles.historyDate}>{formatDateLong(item.date)}</p>
                </div>
                <StatusBadge tone={ATTENDANCE_BADGE[item.status].tone}>{ATTENDANCE_BADGE[item.status].label}</StatusBadge>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

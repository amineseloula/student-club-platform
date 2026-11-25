import { useState } from 'react';
import Button from '../../../components/Button/Button';
import DataTable from '../../../components/DataTable/DataTable';
import FilterSelect from '../../../components/FilterSelect/FilterSelect';
import Icon from '../../../components/Icon/Icon';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Pagination from '../../../components/Pagination/Pagination';
import Panel from '../../../components/Panel/Panel';
import PersonCell from '../../../components/PersonCell/PersonCell';
import SearchInput from '../../../components/SearchInput/SearchInput';
import StatusBadge from '../../../components/StatusBadge/StatusBadge';
import Toolbar from '../../../components/Toolbar/Toolbar';
import { FEE_BADGE, ROLE_BADGE, STATUS_BADGE } from '../../../constants/memberDisplay';
import { getMembers, ROLES } from '../../../mocks/members';
import { downloadCsv } from '../../../utils/csv';
import styles from './MembersListPage.module.css';

const PAGE_SIZE = 6; // the Figma shows 6 members per page

const ROLE_FILTERS = [{ value: 'all', label: 'all' }, ...ROLES.map((r) => ({ value: r.value, label: r.label.toLowerCase() }))];
const STATUS_FILTERS = [
  { value: 'all', label: 'all' },
  { value: 'active', label: 'active' },
  { value: 'inactive', label: 'inactive' },
];
const FEE_FILTERS = [
  { value: 'all', label: 'all' },
  { value: 'paid', label: 'paid' },
  { value: 'pending', label: 'pending' },
  { value: 'unpaid', label: 'unpaid' },
];

const CSV_COLUMNS = [
  { header: 'Name',       value: (m) => m.name },
  { header: 'E-mail',     value: (m) => m.email },
  { header: 'Student ID', value: (m) => m.studentId },
  { header: 'Role',       value: (m) => ROLE_BADGE[m.role].label },
  { header: 'Status',     value: (m) => STATUS_BADGE[m.status].label },
  { header: 'Fee 2025',   value: (m) => FEE_BADGE[m.fee].label },
];

const TABLE_COLUMNS = [
  { key: 'member', header: 'Member', render: (m) => <PersonCell name={m.name} tone={m.tone} /> },
  { key: 'email', header: 'E-mail', muted: true },
  { key: 'role', header: 'Role', render: (m) => <StatusBadge tone={ROLE_BADGE[m.role].tone}>{ROLE_BADGE[m.role].label}</StatusBadge> },
  { key: 'status', header: 'Status', render: (m) => <StatusBadge tone={STATUS_BADGE[m.status].tone}>{STATUS_BADGE[m.status].label}</StatusBadge> },
  { key: 'fee', header: 'Fee 2025', render: (m) => <StatusBadge tone={FEE_BADGE[m.fee].tone}>{FEE_BADGE[m.fee].label}</StatusBadge> },
  {
    key: 'actions',
    header: 'Actions',
    render: (m) => (
      <a href={`#/bureau/membres/${m.id}`} className={styles.profileLink}>
        View profile<span className="visually-hidden"> of {m.name}</span> <Icon name="arrowRight" size={14} />
      </a>
    ),
  },
];

export default function MembersListPage() {
  const members = getMembers();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ role: 'all', status: 'all', fee: 'all' });
  const [page, setPage] = useState(1);

  const query = search.trim().toLowerCase();
  const filteredMembers = members.filter(
    (m) =>
      (filters.role === 'all' || m.role === filters.role) &&
      (filters.status === 'all' || m.status === filters.status) &&
      (filters.fee === 'all' || m.fee === filters.fee) &&
      [m.name, m.email, m.studentId].some((text) => text.toLowerCase().includes(query))
  );

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const firstIndex = (currentPage - 1) * PAGE_SIZE;
  const pageMembers = filteredMembers.slice(firstIndex, firstIndex + PAGE_SIZE);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterChange = (name) => (value) => {
    setFilters((previous) => ({ ...previous, [name]: value }));
    setPage(1);
  };

  const summary =
    filteredMembers.length === 0
      ? 'No members'
      : `${firstIndex + 1}–${firstIndex + pageMembers.length} of ${filteredMembers.length} members`;

  return (
    <div className={styles.page}>
      <PageHeader
        title="Members"
        subtitle={`${members.length} registered members · 2025 season`}
        actions={
          <>
            {/* TODO: the import screen is not designed yet in Figma. */}
            <Button variant="secondary" icon="upload">
              Import
            </Button>
            <Button
              variant="dark"
              icon="download"
              onClick={() => downloadCsv('ldc-members.csv', CSV_COLUMNS, filteredMembers)}
            >
              Export
            </Button>
          </>
        }
      />

      <Toolbar>
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder="Name, e-mail or student ID…"
          label="Search members"
        />
        <FilterSelect label="Role" value={filters.role} options={ROLE_FILTERS} onChange={handleFilterChange('role')} />
        <FilterSelect label="Status" value={filters.status} options={STATUS_FILTERS} onChange={handleFilterChange('status')} />
        <FilterSelect label="Fee" value={filters.fee} options={FEE_FILTERS} onChange={handleFilterChange('fee')} />
      </Toolbar>

      <Panel flush>
        <DataTable columns={TABLE_COLUMNS} rows={pageMembers} emptyMessage="No members match your search or filters." />
        <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} summary={summary} />
      </Panel>
    </div>
  );
}

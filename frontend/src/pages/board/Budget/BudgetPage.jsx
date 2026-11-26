import Icon from '../../../components/Icon/Icon';
import IconTile from '../../../components/IconTile/IconTile';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Panel from '../../../components/Panel/Panel';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import StatCard from '../../../components/StatCard/StatCard';
import StatusBadge from '../../../components/StatusBadge/StatusBadge';
import { budget } from '../../../mocks/budget';
import { formatDate, formatMoney, formatNumber, formatSignedMoney } from '../../../utils/format';
import styles from './BudgetPage.module.css';

function EventBudgetRow({ item }) {
  const percent = Math.round((item.spent / item.planned) * 100);
  const isOver = item.spent > item.planned;

  return (
    <li className={styles.budgetRow}>
      <div className={styles.budgetText}>
        <p className={styles.budgetName}>{item.name}</p>
        <p className={styles.budgetAmounts}>
          {formatNumber(item.spent)} / {formatMoney(item.planned)}
        </p>
      </div>
      <div className={styles.budgetBar}>
        <ProgressBar
          value={item.spent}
          max={item.planned}
          tone={isOver ? 'danger' : 'success'}
          label={`${item.name}: ${percent}% of the budget used`}
        />
      </div>
      <span className={`${styles.percent} ${isOver ? styles.percentOver : ''}`}>
        {percent}%{isOver && <span className="visually-hidden"> — over budget</span>}
      </span>
    </li>
  );
}

function TransactionRow({ item }) {
  const isIncome = item.amount > 0;

  return (
    <li className={styles.transaction}>
      <IconTile icon={isIncome ? 'plus' : 'file'} tone={isIncome ? 'green' : 'red'} />
      <div className={styles.transactionText}>
        <p className={styles.transactionTitle}>{item.title}</p>
        <p className={styles.transactionMeta}>
          {item.category} · {formatDate(item.date)}
        </p>
      </div>
      <span className={`${styles.amount} ${isIncome ? styles.income : styles.expense}`}>
        {formatSignedMoney(item.amount)}
      </span>
    </li>
  );
}

export default function BudgetPage() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Budget"
        subtitle="Read-only view · Data managed by the treasurer."
        actions={<StatusBadge tone="info">Read-only</StatusBadge>}
      />

      <section className={styles.hero} aria-label="Current balance">
        <div>
          <p className={styles.heroLabel}>Current balance</p>
          <p className={styles.heroValue}>
            {formatNumber(budget.balance)} <span className={styles.heroUnit}>DZD</span>
          </p>
          <p className={styles.heroHint}>Updated on {budget.updatedAt}</p>
        </div>
        <span className={styles.heroIcon}>
          <Icon name="wallet" size={46} strokeWidth={1.8} />
        </span>
      </section>

      <section className={styles.stats} aria-label="This month">
        {budget.summary.map((item) => (
          <StatCard
            key={item.id}
            size="lg"
            label={item.label}
            value={formatNumber(item.amount)}
            unit="DZD"
            hint={item.hint}
            hintTone={item.hintTone}
          />
        ))}
      </section>

      <div className={styles.columns}>
        <Panel title="Budget per event">
          <ul className={styles.list}>
            {budget.eventBudgets.map((item) => (
              <EventBudgetRow key={item.id} item={item} />
            ))}
          </ul>
        </Panel>

        <Panel title="Recent transactions">
          <ul className={styles.list}>
            {budget.transactions.map((item) => (
              <TransactionRow key={item.id} item={item} />
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

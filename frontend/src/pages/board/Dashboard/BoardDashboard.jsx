import Button from '../../../components/Button/Button';
import EventsTable from '../../../components/EventsTable/EventsTable';
import Icon from '../../../components/Icon/Icon';
import IconTile from '../../../components/IconTile/IconTile';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Panel from '../../../components/Panel/Panel';
import StatCard from '../../../components/StatCard/StatCard';
import { stats, monthlySignups, recentActivity, getUpcomingEvents } from './dashboardData';
import styles from './BoardDashboard.module.css';

function SignupsChart({ data, max = 300, ticks = [0, 100, 200, 300] }) {
  const summary = data.map((d) => `${d.month}: ${d.value}`).join(', ');

  return (
    <div className={styles.chart} role="img" aria-label={`Sign-ups per month — ${summary}`}>
      <div className={styles.chartPlot}>
        {ticks.map((tick) => (
          <div key={tick} className={styles.gridLine} style={{ bottom: `${(tick / max) * 100}%` }}>
            <span className={styles.tickLabel}>{tick}</span>
          </div>
        ))}

        <div className={styles.bars}>
          {data.map((d) => (
            <div key={d.month} className={styles.barSlot}>
              <div
                className={`${styles.bar} ${d.current ? styles.barCurrent : ''}`}
                style={{ height: `${(d.value / max) * 100}%` }}
                title={`${d.month}: ${d.value} sign-ups`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.monthLabels} aria-hidden="true">
        {data.map((d) => (
          <span key={d.month}>{d.month}</span>
        ))}
      </div>
    </div>
  );
}

function ActivityList({ items }) {
  return (
    <ul className={styles.activityList}>
      {items.map((item) => (
        <li key={item.id} className={styles.activityItem}>
          <IconTile icon={item.icon} tone={item.tone} />
          <div>
            <p className={styles.activityTitle}>{item.title}</p>
            <p className={styles.activityTime}>{item.time}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function BoardDashboard() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Overview"
        subtitle="Hello Amine, here’s what’s happening in the club today."
        actions={
          <Button icon="plus" href="#/bureau/evenements/nouveau">
            Create event
          </Button>
        }
      />

      <section className={styles.statsGrid} aria-label="Key figures">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            icon={stat.icon}
            tone={stat.tone}
            label={stat.label}
            value={stat.value}
            unit={stat.unit}
            hint={stat.hint}
          />
        ))}
      </section>

      <div className={styles.middleGrid}>
        <Panel title="Sign-ups this season" subtitle="Monthly trend">
          <SignupsChart data={monthlySignups} />
        </Panel>

        <Panel
          title="Recent activity"
          action={
            <a href="#/bureau/activite" className={styles.panelLink}>
              See all
            </a>
          }
        >
          <ActivityList items={recentActivity} />
        </Panel>
      </div>

      <Panel
        title="Upcoming events"
        subtitle="Quick capacity overview"
        flush
        action={
          <a href="#/bureau/evenements" className={styles.panelLink}>
            Manage events <Icon name="arrowRight" size={14} />
          </a>
        }
      >
        <EventsTable events={getUpcomingEvents()} />
      </Panel>
    </div>
  );
}

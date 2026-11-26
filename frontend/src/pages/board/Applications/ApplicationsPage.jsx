import { useState } from 'react';
import Avatar from '../../../components/Avatar/Avatar';
import Button from '../../../components/Button/Button';
import EmptyState from '../../../components/EmptyState/EmptyState';
import InfoBanner from '../../../components/InfoBanner/InfoBanner';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Panel from '../../../components/Panel/Panel';
import { decideApplication, getApplications } from '../../../mocks/applications';
import styles from './ApplicationsPage.module.css';

function ApplicationCard({ application, onApprove, onReject }) {
  return (
    <article className={styles.card} aria-labelledby={`application-${application.id}`}>
      <header className={styles.cardHeader}>
        <Avatar name={application.name} tone={application.tone} />
        <div className={styles.identity}>
          <h2 id={`application-${application.id}`} className={styles.name}>
            {application.name}
          </h2>
          <p className={styles.email}>{application.email}</p>
        </div>
        <p className={styles.time}>{application.sentAt}</p>
      </header>

      <dl className={styles.details}>
        <div>
          <dt>Student ID</dt>
          <dd>{application.studentId}</dd>
        </div>
        <div>
          <dt>Program</dt>
          <dd>{application.program}</dd>
        </div>
      </dl>

      <div className={styles.actions}>
        <Button variant="danger" icon="x" onClick={() => onReject(application)}>
          Reject
        </Button>
        <Button icon="check" onClick={() => onApprove(application)}>
          Approve
        </Button>
      </div>
    </article>
  );
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(getApplications);
  const [message, setMessage] = useState(null);

  // TODO: the sidebar badge ("7") is still hard-coded; it should show applications.length.
  const decide = (application, decision) => {
    decideApplication(application.id);
    setApplications(getApplications());
    setMessage(
      decision === 'approve'
        ? { tone: 'success', title: `${application.name} was approved and is now a member.` }
        : { tone: 'info', title: `${application.name}’s application was rejected.` }
    );
  };

  const count = applications.length;

  return (
    <div className={styles.page}>
      <PageHeader
        title="Applications"
        subtitle={count === 1 ? '1 request waiting for approval.' : `${count} requests waiting for approval.`}
      />

      {message && (
        <InfoBanner
          tone={message.tone}
          icon={message.tone === 'success' ? 'check' : 'info'}
          title={message.title}
          onDismiss={() => setMessage(null)}
        />
      )}

      {count > 0 && (
        <InfoBanner title="Verification recommended">
          Check the ESTIN e-mail address and the student ID before approving.
        </InfoBanner>
      )}

      {count === 0 ? (
        <Panel>
          <EmptyState icon="check" title="All caught up">
            There are no pending applications right now.
          </EmptyState>
        </Panel>
      ) : (
        <div className={styles.grid}>
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onApprove={(a) => decide(a, 'approve')}
              onReject={(a) => decide(a, 'reject')}
            />
          ))}
        </div>
      )}
    </div>
  );
}

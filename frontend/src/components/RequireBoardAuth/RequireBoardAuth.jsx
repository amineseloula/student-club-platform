import { useAuth } from '../../context/useAuth';
import Button from '../Button/Button';
import Panel from '../Panel/Panel';
import styles from './RequireBoardAuth.module.css';

export default function RequireBoardAuth({ onOpenLogin, children }) {
  const { user, isAuthenticated, isBoardMember, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className={styles.guardShell}>
        <Panel>
          <div className={styles.guardCard}>
            <span className={styles.badge}>Protected Area · Board Only</span>
            <h1 className={styles.title}>Board authentication required</h1>
            <p className={styles.desc}>
              The Contact Messages Inbox and board management tools are restricted to authorized LDC board members
              (President, Board, Treasurer).
            </p>
            <div className={styles.actions}>
              <Button onClick={onOpenLogin}>Sign in with board account</Button>
              <Button variant="secondary" href="#/">
                Back to public site
              </Button>
            </div>
          </div>
        </Panel>
      </div>
    );
  }

  if (!isBoardMember) {
    return (
      <div className={styles.guardShell}>
        <Panel>
          <div className={styles.guardCard}>
            <span className={`${styles.badge} ${styles.badgeDanger}`}>403 · Access Restricted</span>
            <h1 className={styles.title}>Board authorization required</h1>
            <p className={styles.desc}>
              You are signed in as <strong>{user.name}</strong> ({user.role}). Only authorized board members can view
              and manage contact messages.
            </p>
            <div className={styles.actions}>
              <Button variant="secondary" href="#/">
                Return to Home Page
              </Button>
              <Button
                onClick={() => {
                  logout();
                  onOpenLogin?.();
                }}
              >
                Switch to board account
              </Button>
            </div>
          </div>
        </Panel>
      </div>
    );
  }

  return children;
}

import Icon from '../Icon/Icon';
import styles from './BackLink.module.css';

export default function BackLink({ href, children }) {
  return (
    <a href={href} className={styles.link}>
      <Icon name="arrowLeft" size={14} />
      {children}
    </a>
  );
}

import Icon from '../Icon/Icon';
import styles from './IconButton.module.css';

export default function IconButton({ icon, label, href, onClick }) {
  if (href) {
    return (
      <a href={href} className={styles.button} aria-label={label} title={label}>
        <Icon name={icon} size={18} />
      </a>
    );
  }

  return (
    <button type="button" className={styles.button} onClick={onClick} aria-label={label} title={label}>
      <Icon name={icon} size={18} />
    </button>
  );
}

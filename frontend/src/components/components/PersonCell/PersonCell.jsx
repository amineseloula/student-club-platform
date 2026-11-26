import Avatar from '../Avatar/Avatar';
import styles from './PersonCell.module.css';

export default function PersonCell({ name, tone, subtitle }) {
  return (
    <div className={styles.cell}>
      <Avatar name={name} tone={tone} />
      <div className={styles.text}>
        <span className={styles.name}>{name}</span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </div>
    </div>
  );
}

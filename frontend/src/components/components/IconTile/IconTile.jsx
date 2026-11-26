import Icon from '../Icon/Icon';
import styles from './IconTile.module.css';

export default function IconTile({ icon, tone = 'green', size = 'md' }) {
  return (
    <span className={`${styles.tile} ${styles[tone]} ${styles[size]}`}>
      <Icon name={icon} size={size === 'lg' ? 22 : 20} />
    </span>
  );
}

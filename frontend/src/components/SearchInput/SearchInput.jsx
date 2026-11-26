import Icon from '../Icon/Icon';
import styles from './SearchInput.module.css';

export default function SearchInput({ value, onChange, placeholder = 'Search…', label = 'Search' }) {
  return (
    <label className={styles.wrapper}>
      <span className="visually-hidden">{label}</span>
      <Icon name="search" size={18} className={styles.icon} />
      <input
        type="search"
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

import styles from './Avatar.module.css';

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export default function Avatar({ name, tone = 'green', size = 'md' }) {
  return (
    <span className={`${styles.avatar} ${styles[tone]} ${styles[size]}`} aria-hidden="true">
      {getInitials(name)}
    </span>
  );
}

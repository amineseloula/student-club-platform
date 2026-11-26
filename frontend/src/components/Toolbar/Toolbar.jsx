import styles from './Toolbar.module.css';

export default function Toolbar({ inset = false, children }) {
  return <div className={`${styles.toolbar} ${inset ? styles.inset : ''}`}>{children}</div>;
}

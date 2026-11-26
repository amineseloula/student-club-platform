import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './PublicLayout.module.css';

export default function PublicLayout({
  activePath = '/',
  onLoginClick,
  onJoinClick,
  children,
}) {
  return (
    <div className={styles.shell}>
      <Navbar
        activePath={activePath}
        onLoginClick={onLoginClick}
        onJoinClick={onJoinClick}
      />
      <main className={styles.main}>{children}</main>
      <Footer
        onLoginClick={onLoginClick}
        onJoinClick={onJoinClick}
      />
    </div>
  );
}

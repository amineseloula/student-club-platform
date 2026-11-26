import Icon from '../Icon/Icon';
import styles from './Button.module.css';

// variant: 'primary' (yellow) | 'secondary' (white) | 'dark' (navy) | 'ghost' (text only) | 'danger' (soft red)
// Renders a link when `href` is given, otherwise a <button>.
export default function Button({
  variant = 'primary',
  icon,
  href,
  onClick,
  type = 'button',
  form,
  disabled = false,
  children,
}) {
  const className = `${styles.button} ${styles[variant]}`;
  const content = (
    <>
      {icon && <Icon name={icon} size={18} strokeWidth={2.2} />}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} form={form} className={className} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}

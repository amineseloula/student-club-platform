import { useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './FileDropzone.module.css';

export default function FileDropzone({
  id,
  variant = 'large',
  accept,
  title,
  hint,
  fileName = '',
  previewUrl,
  onFileSelect,
  error,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const openPicker = () => inputRef.current?.click();

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    e.target.value = ''; // lets the user pick the same file again later
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  const zoneClass = [
    styles.zone,
    styles[variant],
    isDragging ? styles.dragging : '',
    error ? styles.hasError : '',
  ].join(' ');

  return (
    <div>
      <div
        className={zoneClass}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          className="visually-hidden"
          onChange={handleChange}
          aria-describedby={error ? `${id}-error` : undefined}
        />

        {variant === 'large' ? (
          <>
            {previewUrl ? (
              <img src={previewUrl} alt="Selected cover" className={styles.preview} />
            ) : (
              <span className={styles.bigIcon}>
                <Icon name="upload" size={28} />
              </span>
            )}
            <p className={styles.title}>{fileName || title}</p>
            {!fileName && <p className={styles.hint}>{hint}</p>}
            <div className={styles.buttons}>
              <button type="button" className={styles.browse} onClick={openPicker}>
                {fileName ? 'Change' : 'Browse'}
              </button>
              {fileName && (
                <button type="button" className={styles.remove} onClick={() => onFileSelect(null)}>
                  Remove
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <Icon name="file" size={20} className={styles.smallIcon} />
            <p className={styles.compactText}>{fileName || title}</p>
            {fileName && (
              <button type="button" className={styles.link} onClick={() => onFileSelect(null)}>
                Remove
              </button>
            )}
            <button type="button" className={styles.link} onClick={openPicker}>
              {fileName ? 'Change' : 'Browse'}
            </button>
          </>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

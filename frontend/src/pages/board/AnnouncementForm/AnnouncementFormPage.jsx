import { useRef, useState } from 'react';
import Button from '../../../components/Button/Button';
import EmptyState from '../../../components/EmptyState/EmptyState';
import FileDropzone from '../../../components/FileDropzone/FileDropzone';
import { Field, Select, TextArea, TextInput, Toggle } from '../../../components/Form/Form';
import InfoBanner from '../../../components/InfoBanner/InfoBanner';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Panel from '../../../components/Panel/Panel';
import { AUDIENCES, getAnnouncementById, saveAnnouncement } from '../../../mocks/announcements';
import { navigate } from '../../../router/hashRouter';
import { setFlash } from '../../../utils/flash';
import styles from './AnnouncementFormPage.module.css';

const FORM_ID = 'announcement-form';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

const PUBLISH_OPTIONS = [
  { value: 'now',      label: 'Now' },
  { value: 'schedule', label: 'Schedule for later' },
];

/*
 * Formatting buttons above the message. There is no rich-text library in the
 * project, so they insert simple marks around the selected text (Markdown style):
 * **bold**, _italic_, __underline__, "- " list item, [text](link).
 * TODO: the team may choose a real rich-text editor later.
 */
const FORMAT_BUTTONS = [
  { label: 'B',      title: 'Bold',          before: '**', after: '**', placeholder: 'bold text', className: 'bold' },
  { label: 'I',      title: 'Italic',        before: '_',  after: '_',  placeholder: 'italic text', className: 'italic' },
  { label: 'U',      title: 'Underline',     before: '__', after: '__', placeholder: 'underlined text', className: 'underline' },
  { label: '• List', title: 'Bulleted list', before: '\n- ', after: '', placeholder: 'list item' },
  { label: 'Link',   title: 'Insert a link', before: '[', after: '](https://)', placeholder: 'link text' },
];

const EMPTY_VALUES = {
  title: '',
  message: '',
  audience: 'all',
  publishMode: 'now',
  publishAt: '',
  pinned: false,
  attachmentName: '',
};

const scheduleFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

function validate(values, mode) {
  const errors = {};
  if (!values.title.trim()) errors.title = 'Please enter a title.';

  if (mode === 'publish') {
    if (!values.message.trim()) errors.message = 'Please write a message.';
    if (values.publishMode === 'schedule') {
      if (!values.publishAt) errors.publishAt = 'Please choose when to publish.';
      else if (new Date(values.publishAt) <= new Date()) errors.publishAt = 'Please choose a date in the future.';
    }
  }
  return errors;
}

export default function AnnouncementFormPage({ params = {} }) {
  const isEdit = Boolean(params.id);
  const existing = isEdit ? getAnnouncementById(params.id) : null;
  const messageRef = useRef(null);

  const [values, setValues] = useState(() =>
    existing
      ? { ...EMPTY_VALUES, ...existing, publishMode: existing.status === 'scheduled' ? 'schedule' : 'now' }
      : EMPTY_VALUES
  );
  const [errors, setErrors] = useState({});
  const [fileError, setFileError] = useState('');

  if (isEdit && !existing) {
    return (
      <Panel>
        <EmptyState
          title="Announcement not found"
          action={<Button variant="secondary" href="#/bureau/annonces">Back to announcements</Button>}
        >
          This announcement doesn’t exist or was deleted.
        </EmptyState>
      </Panel>
    );
  }

  const setValue = (field, value) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleChange = (field) => (e) => setValue(field, e.target.value);

  const applyFormat = ({ before, after, placeholder }) => {
    const textarea = messageRef.current;
    const { selectionStart: start, selectionEnd: end, value } = textarea;
    const selected = value.slice(start, end) || placeholder;
    setValue('message', value.slice(0, start) + before + selected + after + value.slice(end));

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  };

  const handleFileSelect = (file) => {
    setFileError('');
    if (!file) {
      setValue('attachmentName', '');
      return;
    }
    if (!FILE_TYPES.includes(file.type)) {
      setFileError('Please choose a PDF, JPG or PNG file.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError('The file is too big (5 MB maximum).');
      return;
    }
    // TODO: upload the file to the backend. For now we only keep its name.
    setValue('attachmentName', file.name);
  };

  const save = (mode) => {
    const newErrors = validate(values, mode);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    let status = 'draft';
    let dateLabel = 'Just now';
    if (mode === 'publish') {
      status = values.publishMode === 'schedule' ? 'scheduled' : 'published';
      if (status === 'scheduled') dateLabel = scheduleFormat.format(new Date(values.publishAt));
    }

    const saved = saveAnnouncement({
      ...values,
      id: existing?.id,
      title: values.title.trim(),
      status,
      dateLabel,
    });

    const messages = {
      draft: `Draft “${saved.title}” saved.`,
      published: `“${saved.title}” is published.`,
      scheduled: `“${saved.title}” is scheduled for ${dateLabel}.`,
    };
    setFlash({ tone: 'success', title: messages[status] });
    navigate('/bureau/annonces');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    save('publish');
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <div className={styles.page}>
      <PageHeader
        title={isEdit ? 'Edit announcement' : 'New announcement'}
        subtitle="Write your message and choose exactly who receives it."
        actions={
          <>
            <Button variant="ghost" href="#/bureau/annonces">
              Cancel
            </Button>
            <Button variant="secondary" onClick={() => save('draft')}>
              Save draft
            </Button>
            <Button type="submit" form={FORM_ID}>
              {values.publishMode === 'schedule' ? 'Schedule' : 'Publish now'}
            </Button>
          </>
        }
      />

      {errorCount > 0 && (
        <InfoBanner tone="danger" icon="info" title="Some fields need your attention.">
          Please fix the {errorCount === 1 ? 'highlighted field' : `${errorCount} highlighted fields`} below.
        </InfoBanner>
      )}

      <form id={FORM_ID} className={styles.layout} onSubmit={handleSubmit} noValidate>
        <Panel title="Announcement content">
          <div className={styles.fields}>
            <Field label="Title" htmlFor="title" required error={errors.title}>
              <TextInput
                id="title"
                value={values.title}
                onChange={handleChange('title')}
                placeholder="e.g. Schedule change — Lac Noir"
                invalid={!!errors.title}
              />
            </Field>

            <Field label="Message" htmlFor="message" required error={errors.message}>
              <div className={`${styles.editor} ${errors.message ? styles.editorInvalid : ''}`}>
                <div className={styles.formatBar} role="toolbar" aria-label="Text formatting">
                  {FORMAT_BUTTONS.map((button) => (
                    <button
                      key={button.title}
                      type="button"
                      className={`${styles.formatButton} ${button.className ? styles[button.className] : ''}`}
                      onClick={() => applyFormat(button)}
                      title={button.title}
                      aria-label={button.title}
                    >
                      {button.label}
                    </button>
                  ))}
                </div>
                <TextArea
                  id="message"
                  inputRef={messageRef}
                  rows={12}
                  value={values.message}
                  onChange={handleChange('message')}
                  placeholder="Write your announcement…"
                  invalid={!!errors.message}
                />
              </div>
            </Field>

            <div className={styles.attachment}>
              <label htmlFor="attachment" className={styles.attachmentLabel}>
                Attachment
              </label>
              <FileDropzone
                id="attachment"
                variant="compact"
                accept="application/pdf,image/jpeg,image/png"
                title="Add a PDF or an image"
                fileName={values.attachmentName}
                onFileSelect={handleFileSelect}
                error={fileError}
              />
            </div>
          </div>
        </Panel>

        <div className={styles.side}>
          <Panel title="Publishing">
            <div className={styles.fields}>
              <Field label="Audience" htmlFor="audience">
                <Select id="audience" options={AUDIENCES} value={values.audience} onChange={handleChange('audience')} />
              </Field>

              <Field label="Publication" htmlFor="publishMode">
                <Select
                  id="publishMode"
                  options={PUBLISH_OPTIONS}
                  value={values.publishMode}
                  onChange={handleChange('publishMode')}
                />
              </Field>

              {values.publishMode === 'schedule' && (
                <Field label="Publish on" htmlFor="publishAt" required error={errors.publishAt}>
                  <TextInput
                    id="publishAt"
                    type="datetime-local"
                    value={values.publishAt}
                    onChange={handleChange('publishAt')}
                    invalid={!!errors.publishAt}
                  />
                </Field>
              )}

              <Toggle
                id="pinned"
                label="Pin the announcement"
                description="Show it at the top of the feed"
                checked={values.pinned}
                onChange={(checked) => setValue('pinned', checked)}
              />
            </div>
          </Panel>

          <Panel title="Preview">
            <div className={styles.preview} aria-live="polite">
              <span className={styles.previewBadge}>{values.pinned ? 'Pinned' : 'Announcement'}</span>
              <p className={styles.previewTitle}>{values.title.trim() || 'Your title will appear here'}</p>
              <p className={styles.previewText}>
                {values.message.trim() || 'The content of your announcement will be visible here to the selected members.'}
              </p>
              {values.attachmentName && <p className={styles.previewFile}>Attachment: {values.attachmentName}</p>}
            </div>
          </Panel>
        </div>
      </form>
    </div>
  );
}

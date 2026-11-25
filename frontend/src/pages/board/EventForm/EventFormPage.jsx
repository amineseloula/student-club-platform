import { useState } from 'react';
import Button from '../../../components/Button/Button';
import EmptyState from '../../../components/EmptyState/EmptyState';
import FileDropzone from '../../../components/FileDropzone/FileDropzone';
import { Checkbox, Field, FormGrid, Select, TextArea, TextInput } from '../../../components/Form/Form';
import InfoBanner from '../../../components/InfoBanner/InfoBanner';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Panel from '../../../components/Panel/Panel';
import { EVENT_CATEGORIES, getEventById, saveEvent } from '../../../mocks/events';
import { navigate } from '../../../router/hashRouter';
import { setFlash } from '../../../utils/flash';
import styles from './EventFormPage.module.css';

const FORM_ID = 'event-form';
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const IMAGE_TYPES = ['image/jpeg', 'image/png'];

const EMPTY_VALUES = {
  name: '',
  description: '',
  category: 'outing',
  price: '',
  date: '',
  startTime: '',
  returnTime: '',
  location: '',
  meetingPoint: '',
  capacity: '',
  deadline: '',
  waitlist: true,
};

function toFormValues(event) {
  return {
    ...EMPTY_VALUES,
    ...event,
    price: event.price ? String(event.price) : '',
    capacity: event.capacity ? String(event.capacity) : '',
  };
}

function validate(values, mode) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Please enter a title.';

  if (mode === 'publish') {
    if (!values.date) errors.date = 'Please choose a date.';
    if (!values.location.trim()) errors.location = 'Please enter a location.';
    if (!values.capacity) errors.capacity = 'Please enter the maximum capacity.';
  }

  if (values.price !== '' && Number(values.price) < 0) errors.price = 'The price cannot be negative.';
  if (values.capacity !== '' && Number(values.capacity) < 1) errors.capacity = 'Capacity must be at least 1.';

  if (values.startTime && values.returnTime && values.returnTime <= values.startTime) {
    errors.returnTime = 'The return time must be after the departure time.';
  }
  if (values.deadline && values.date && values.deadline.slice(0, 10) > values.date) {
    errors.deadline = 'The deadline must be before the event date.';
  }

  return errors;
}

export default function EventFormPage({ params = {} }) {
  const isEdit = Boolean(params.id);
  const existing = isEdit ? getEventById(params.id) : null;

  const [values, setValues] = useState(() => (existing ? toFormValues(existing) : EMPTY_VALUES));
  const [cover, setCover] = useState(() =>
    existing?.image ? { url: existing.image, name: 'Current cover image' } : null
  );
  const [errors, setErrors] = useState({});
  const [coverError, setCoverError] = useState('');

  if (isEdit && !existing) {
    return (
      <Panel>
        <EmptyState
          title="Event not found"
          action={<Button variant="secondary" href="#/bureau/evenements">Back to events</Button>}
        >
          This event doesn’t exist or was deleted.
        </EmptyState>
      </Panel>
    );
  }

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleCoverSelect = (file) => {
    setCoverError('');
    if (!file) {
      setCover(null);
      return;
    }
    if (!IMAGE_TYPES.includes(file.type)) {
      setCoverError('Please choose a JPG or PNG image.');
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setCoverError('The image is too big (5 MB maximum).');
      return;
    }
    setCover({ url: URL.createObjectURL(file), name: file.name });
  };

  const save = (mode) => {
    const newErrors = validate(values, mode);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const capacity = Number(values.capacity) || 0;
    const registered = existing?.registered ?? 0;
    const status = mode === 'draft' ? 'draft' : registered >= capacity ? 'full' : 'open';

    const saved = saveEvent({
      ...values,
      id: existing?.id,
      name: values.name.trim(),
      price: Number(values.price) || 0,
      capacity,
      image: cover?.url ?? null,
      status,
    });

    setFlash({
      tone: 'success',
      title: mode === 'draft' ? `Draft “${saved.name}” saved.` : `“${saved.name}” is published.`,
    });
    navigate('/bureau/evenements');
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the browser from reloading the page
    save('publish');
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <div className={styles.page}>
      <PageHeader
        title={isEdit ? 'Edit event' : 'Create event'}
        subtitle="Fill in the details and publish when everything is ready."
        actions={
          <>
            <Button variant="ghost" href="#/bureau/evenements">
              Cancel
            </Button>
            <Button variant="secondary" onClick={() => save('draft')}>
              Save draft
            </Button>
            <Button type="submit" form={FORM_ID}>
              Publish
            </Button>
          </>
        }
      />

      {errorCount > 0 && (
        <InfoBanner tone="danger" icon="info" title="Some fields need your attention.">
          Please fix the {errorCount === 1 ? 'highlighted field' : `${errorCount} highlighted fields`} below.
        </InfoBanner>
      )}

      <form id={FORM_ID} className={styles.form} onSubmit={handleSubmit} noValidate>
        <p className={styles.requiredNote}>
          Fields marked with <span className={styles.star}>*</span> are required to publish.
        </p>

        <Panel title="General information" subtitle="Information visible to members.">
          <div className={styles.fields}>
            <Field label="Event title" htmlFor="name" required error={errors.name}>
              <TextInput
                id="name"
                value={values.name}
                onChange={handleChange('name')}
                placeholder="e.g. Lac Noir Trip"
                invalid={!!errors.name}
              />
            </Field>

            <Field label="Description" htmlFor="description">
              <TextArea
                id="description"
                value={values.description}
                onChange={handleChange('description')}
                placeholder="Present the experience, the programme and the important information…"
              />
            </Field>

            <FormGrid>
              <Field label="Category" htmlFor="category">
                <Select
                  id="category"
                  options={EVENT_CATEGORIES}
                  value={values.category}
                  onChange={handleChange('category')}
                />
              </Field>
              <Field label="Participation fee (DZD)" htmlFor="price" hint="Leave empty if the event is free." error={errors.price}>
                <TextInput
                  id="price"
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={values.price}
                  onChange={handleChange('price')}
                  placeholder="1200"
                  invalid={!!errors.price}
                />
              </Field>
            </FormGrid>
          </div>
        </Panel>

        <Panel title="Date & place">
          <div className={styles.fields}>
            <FormGrid>
              <Field label="Date" htmlFor="date" required error={errors.date}>
                <TextInput id="date" type="date" value={values.date} onChange={handleChange('date')} invalid={!!errors.date} />
              </Field>
              <Field label="Departure time" htmlFor="startTime">
                <TextInput id="startTime" type="time" value={values.startTime} onChange={handleChange('startTime')} />
              </Field>
              <Field label="Estimated return time" htmlFor="returnTime" error={errors.returnTime}>
                <TextInput
                  id="returnTime"
                  type="time"
                  value={values.returnTime}
                  onChange={handleChange('returnTime')}
                  invalid={!!errors.returnTime}
                />
              </Field>
              <Field label="Location / destination" htmlFor="location" required error={errors.location}>
                <TextInput
                  id="location"
                  value={values.location}
                  onChange={handleChange('location')}
                  placeholder="Akfadou, Béjaïa"
                  invalid={!!errors.location}
                />
              </Field>
            </FormGrid>

            <Field label="Meeting point" htmlFor="meetingPoint">
              <TextInput
                id="meetingPoint"
                value={values.meetingPoint}
                onChange={handleChange('meetingPoint')}
                placeholder="ESTIN campus main entrance"
              />
            </Field>
          </div>
        </Panel>

        <Panel title="Registrations">
          <div className={styles.fields}>
            <FormGrid>
              <Field label="Maximum capacity" htmlFor="capacity" required error={errors.capacity}>
                <TextInput
                  id="capacity"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={values.capacity}
                  onChange={handleChange('capacity')}
                  placeholder="50"
                  invalid={!!errors.capacity}
                />
              </Field>
              <Field label="Registration deadline" htmlFor="deadline" error={errors.deadline}>
                <TextInput
                  id="deadline"
                  type="datetime-local"
                  value={values.deadline}
                  onChange={handleChange('deadline')}
                  invalid={!!errors.deadline}
                />
              </Field>
            </FormGrid>

            <Checkbox
              label="Automatically enable a waiting list when the event is full"
              checked={values.waitlist}
              onChange={handleChange('waitlist')}
            />
          </div>
        </Panel>

        <Panel title="Cover image">
          <label htmlFor="cover" className="visually-hidden">
            Cover image
          </label>
          <FileDropzone
            id="cover"
            variant="large"
            accept="image/jpeg,image/png"
            title="Drag an image here"
            hint="JPG or PNG · 1600 × 900 recommended · 5 MB max."
            fileName={cover?.name}
            previewUrl={cover?.url}
            onFileSelect={handleCoverSelect}
            error={coverError}
          />
        </Panel>
      </form>
    </div>
  );
}

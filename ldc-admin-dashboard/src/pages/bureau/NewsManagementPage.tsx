import React, { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { ArticleStatus, NewsArticle } from '../../types/ldc';
import { PrimaryButton, SecondaryButton } from '../../components/ui/Buttons';
import { ConfirmationDialog } from '../../components/ui/ConfirmationDialog';
import { FileUpload } from '../../components/ui/FileUpload';
import { Modal } from '../../components/ui/Modal';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';

interface NewsManagementPageProps {
  articles: NewsArticle[];
  onSaveArticle: (article: NewsArticle) => void;
  onDeleteArticle: (id: string) => void;
}

const PRESET_COVERS = [
  { label: 'Kherrata', url: '/images/kherrata.jpg' },
  { label: 'Music Night', url: '/images/music-night.jpg' },
  { label: 'SmashIT', url: '/images/smashit.jpg' },
  { label: 'Akfadou', url: '/images/akfadou.jpg' },
];

const ARTICLE_CATEGORIES = ['Vie du club', 'Événement', 'Sport', 'Partenariat', 'Annonce'];

export const NewsManagementPage: React.FC<NewsManagementPageProps> = ({
  articles,
  onSaveArticle,
  onDeleteArticle,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<NewsArticle | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Vie du club');
  const [status, setStatus] = useState<ArticleStatus>('brouillon');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('/images/kherrata.jpg');
  const [uploadedCover, setUploadedCover] = useState<{
    name: string;
    sizeLabel: string;
    previewUrl?: string;
  } | null>(null);
  const [formError, setFormError] = useState('');

  const openCreateModal = () => {
    setEditingArticle(null);
    setTitle('');
    setCategory('Vie du club');
    setStatus('brouillon');
    setExcerpt('');
    setContent('');
    setImage('/images/kherrata.jpg');
    setUploadedCover(null);
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (article: NewsArticle) => {
    setEditingArticle(article);
    setTitle(article.title);
    setCategory(article.category);
    setStatus(article.status);
    setExcerpt(article.excerpt);
    setContent(article.content);
    setImage(article.image);
    setUploadedCover(null);
    setFormError('');
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      setFormError('Le titre et le contenu de l’article sont obligatoires.');
      return;
    }

    const coverUrl = uploadedCover?.previewUrl || image;
    const saved: NewsArticle = {
      id: editingArticle?.id ?? `news-${Date.now()}`,
      title: title.trim(),
      category,
      date: status === 'publie' ? (editingArticle?.date && editingArticle.date !== '—' ? editingArticle.date : '21 avr. 2025') : '—',
      status,
      image: coverUrl,
      excerpt: excerpt.trim() || content.trim().slice(0, 100),
      content: content.trim(),
    };

    onSaveArticle(saved);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-slide">
      <PageHeader
        title="Gestion des actualités"
        subtitle="Créez et mettez à jour les articles du site public."
        actions={
          <>
            <StatusBadge label="BUREAU · ÉDITION" variant="blue" />
            <PrimaryButton icon={<Plus className="w-4 h-4" />} onClick={openCreateModal}>
              Nouvel article
            </PrimaryButton>
          </>
        }
      />

      <div className="space-y-4">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white border border-[#E6D9C4] rounded-2xl p-4 sm:p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-elevated transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 min-w-0">
              <img
                src={article.image}
                alt={article.title}
                className="w-full sm:w-36 h-40 sm:h-24 rounded-xl object-cover shrink-0 border border-[#E6D9C4]/60"
              />
              <div className="min-w-0 space-y-1.5">
                <StatusBadge
                  label={article.status === 'publie' ? 'PUBLIÉ' : 'BROUILLON'}
                  variant={article.status === 'publie' ? 'green' : 'orange'}
                />
                <h2 className="font-editorial text-lg font-bold text-[#203F52] leading-snug">
                  {article.title}
                </h2>
                <p className="text-xs text-[#6D818E]">
                  {article.category} · {article.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <SecondaryButton
                icon={<Pencil className="w-3.5 h-3.5" />}
                onClick={() => openEditModal(article)}
                className="py-2 px-3.5 text-xs"
              >
                Modifier
              </SecondaryButton>
            </div>
          </article>
        ))}
      </div>

      {/* Create / Edit Article Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingArticle ? "Modifier l'article" : 'Nouvel article'}
        subtitle="Rédigez et planifiez la publication sur le site public LDC."
        size="lg"
        footer={
          <div className="w-full flex flex-wrap items-center justify-between gap-3">
            <div>
              {editingArticle && (
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setConfirmDelete(editingArticle);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#E74732] hover:bg-[#FDECE9] transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              )}
            </div>
            <div className="flex items-center gap-2.5">
              <SecondaryButton onClick={() => setModalOpen(false)}>Annuler</SecondaryButton>
              <PrimaryButton onClick={handleSubmit}>
                {status === 'publie' ? 'Publier l’article' : 'Enregistrer en brouillon'}
              </PrimaryButton>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          {formError && (
            <div className="p-3 rounded-xl bg-[#FDECE9] text-[#E74732] text-xs font-semibold">
              {formError}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#203F52] mb-1.5">
              Titre de l'article
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex : Retour sur la sortie Akfadou..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#203F52] mb-1.5">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] bg-white text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
              >
                {ARTICLE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#203F52] mb-1.5">Statut</label>
              <div className="flex items-center rounded-xl border border-[#E6D9C4] p-1 bg-[#FBF8F2]">
                {(['publie', 'brouillon'] as ArticleStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatus(st)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      status === st
                        ? 'bg-[#203F52] text-white'
                        : 'text-[#6D818E] hover:text-[#203F52]'
                    }`}
                  >
                    {st === 'publie' ? 'Publié' : 'Brouillon'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#203F52] mb-1.5">
              Accroche courte
            </label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Résumé affiché dans la liste publique..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#203F52] mb-1.5">
              Contenu de l'article
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Rédigez le corps de l'article..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#203F52] mb-2">
              Image de couverture
            </label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {PRESET_COVERS.map((preset) => (
                <button
                  key={preset.url}
                  type="button"
                  onClick={() => {
                    setImage(preset.url);
                    setUploadedCover(null);
                  }}
                  className={`relative rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                    !uploadedCover && image === preset.url
                      ? 'border-[#F5B400]'
                      : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="w-full h-14 object-cover"
                  />
                </button>
              ))}
            </div>
            <FileUpload
              value={uploadedCover}
              onChange={setUploadedCover}
              accept=".jpg,.jpeg,.png"
              title="Importer une image personnalisée"
              helperText="JPG ou PNG · 5 Mo max."
            />
          </div>
        </div>
      </Modal>

      <ConfirmationDialog
        isOpen={Boolean(confirmDelete)}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => {
          if (confirmDelete) onDeleteArticle(confirmDelete.id);
        }}
        title="Supprimer l'article"
        message={
          confirmDelete
            ? `Voulez-vous vraiment supprimer « ${confirmDelete.title} » ? Cette action est irréversible.`
            : ''
        }
        confirmLabel="Supprimer"
        tone="danger"
      />
    </div>
  );
};

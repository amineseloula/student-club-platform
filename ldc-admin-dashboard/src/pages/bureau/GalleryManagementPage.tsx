import React, { useRef, useState } from 'react';
import { Check, Pencil, Plus, Trash2, Upload } from 'lucide-react';
import { GalleryAlbum, GalleryPhoto } from '../../types/ldc';
import { PrimaryButton, SecondaryButton } from '../../components/ui/Buttons';
import { ConfirmationDialog } from '../../components/ui/ConfirmationDialog';
import { Modal } from '../../components/ui/Modal';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';

interface GalleryManagementPageProps {
  albums: GalleryAlbum[];
  onCreateAlbum: (album: GalleryAlbum) => void;
  onUpdateAlbum: (album: GalleryAlbum) => void;
  onAddPhotosToAlbum: (albumId: string, photos: GalleryPhoto[]) => void;
  onDeletePhoto: (albumId: string, photoId: string) => void;
}

const COVER_PRESETS = [
  '/images/akfadou.jpg',
  '/images/smashit.jpg',
  '/images/music-night.jpg',
  '/images/kherrata.jpg',
];

export const GalleryManagementPage: React.FC<GalleryManagementPageProps> = ({
  albums,
  onCreateAlbum,
  onUpdateAlbum,
  onAddPhotosToAlbum,
  onDeletePhoto,
}) => {
  const [createOpen, setCreateOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);

  // Create album form
  const [newTitle, setNewTitle] = useState('');
  const [newCover, setNewCover] = useState(COVER_PRESETS[0]);
  const [newTitleError, setNewTitleError] = useState('');

  // Batch upload state
  const [targetAlbumId, setTargetAlbumId] = useState(albums[0]?.id ?? '');
  const [stagedPhotos, setStagedPhotos] = useState<GalleryPhoto[]>([]);
  const batchInputRef = useRef<HTMLInputElement>(null);

  // Album editor state
  const activeAlbum = albums.find((a) => a.id === activeAlbumId) ?? null;
  const [editTitle, setEditTitle] = useState('');
  const [confirmPhotoDelete, setConfirmPhotoDelete] = useState<{
    albumId: string;
    photo: GalleryPhoto;
  } | null>(null);
  const albumUploadRef = useRef<HTMLInputElement>(null);

  const openAlbumDetail = (album: GalleryAlbum) => {
    setActiveAlbumId(album.id);
    setEditTitle(album.title);
  };

  const handleBatchFiles = (files: FileList | null, appendToAlbumId?: string) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result !== 'string') return;
        const photo: GalleryPhoto = {
          id: `ph-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          url: reader.result,
          caption: file.name.replace(/\.[^/.]+$/, ''),
          addedAt: '21 avr. 2025',
        };
        if (appendToAlbumId) {
          onAddPhotosToAlbum(appendToAlbumId, [photo]);
        } else {
          setStagedPhotos((prev) => [...prev, photo]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCreateSubmit = () => {
    if (!newTitle.trim()) {
      setNewTitleError('Veuillez donner un titre à cet album.');
      return;
    }
    const created: GalleryAlbum = {
      id: `alb-${Date.now()}`,
      title: newTitle.trim(),
      coverImage: newCover,
      updatedAt: 'Mis à jour aujourd’hui',
      photoCount: 1,
      photos: [
        {
          id: `ph-${Date.now()}`,
          url: newCover,
          caption: `${newTitle.trim()} — Couverture`,
          addedAt: '21 avr. 2025',
        },
      ],
    };
    onCreateAlbum(created);
    setCreateOpen(false);
    setNewTitle('');
    setNewTitleError('');
  };

  const handleCommitBatchImport = () => {
    if (!targetAlbumId || stagedPhotos.length === 0) return;
    onAddPhotosToAlbum(targetAlbumId, stagedPhotos);
    setStagedPhotos([]);
    setImportOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-slide">
      <PageHeader
        title="Gestion de la galerie"
        subtitle="Organisez les albums et souvenirs visibles sur le site."
        actions={
          <>
            <StatusBadge label="BUREAU" variant="blue" />
            <PrimaryButton
              icon={<Upload className="w-4 h-4" />}
              onClick={() => {
                setTargetAlbumId(albums[0]?.id ?? '');
                setStagedPhotos([]);
                setImportOpen(true);
              }}
            >
              Importer des photos
            </PrimaryButton>
          </>
        }
      />

      {/* Responsive 3-col Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {/* Create Album Card */}
        <button
          type="button"
          onClick={() => {
            setNewTitle('');
            setNewTitleError('');
            setCreateOpen(true);
          }}
          className="bg-white border border-[#E6D9C4] hover:border-[#4A9BD5] rounded-2xl min-h-[260px] p-6 flex flex-col items-center justify-center text-center shadow-card hover:shadow-elevated transition group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-[#F7F3E9] group-hover:bg-[#E6F2FA] text-[#4A9BD5] flex items-center justify-center mb-3 transition">
            <Plus className="w-6 h-6" />
          </div>
          <div className="text-sm font-bold text-[#203F52]">Créer un album</div>
          <div className="text-xs text-[#7C8F9B] mt-1">Regrouper de nouveaux souvenirs</div>
        </button>

        {/* Album Cards */}
        {albums.map((album) => (
          <article
            key={album.id}
            onClick={() => openAlbumDetail(album)}
            className="bg-white border border-[#E6D9C4] rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition cursor-pointer flex flex-col"
          >
            <div className="relative aspect-[16/10] bg-[#EFE8DA] overflow-hidden">
              <img
                src={album.coverImage}
                alt={album.title}
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#E9F5EE]/95 text-[#203F52] text-[10px] font-bold tracking-[0.06em] uppercase shadow-sm">
                {album.photoCount} PHOTOS
              </span>
            </div>

            <div className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-editorial text-base font-bold text-[#203F52] truncate">
                  {album.title}
                </h2>
                <p className="text-[11px] text-[#7C8F9B] mt-0.5">{album.updatedAt}</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openAlbumDetail(album);
                }}
                aria-label={`Modifier ${album.title}`}
                className="w-9 h-9 rounded-xl border border-[#E6D9C4] bg-white hover:bg-[#F7F3E9] text-[#203F52] flex items-center justify-center shrink-0 transition cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Create Album Modal */}
      <Modal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Créer un album"
        subtitle="Ajoutez un nouvel album photo à la galerie publique."
        size="md"
        footer={
          <>
            <SecondaryButton onClick={() => setCreateOpen(false)}>Annuler</SecondaryButton>
            <PrimaryButton onClick={handleCreateSubmit}>Créer l'album</PrimaryButton>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#203F52] mb-1.5">
              Nom de l'album
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
                setNewTitleError('');
              }}
              placeholder="Ex : Hackathon ESTIN 2025"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
            />
            {newTitleError && (
              <p className="text-xs text-[#E74732] mt-1">{newTitleError}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#203F52] mb-2">
              Image de couverture initiale
            </label>
            <div className="grid grid-cols-4 gap-2">
              {COVER_PRESETS.map((url) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => setNewCover(url)}
                  className={`rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                    newCover === url ? 'border-[#F5B400]' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="Couverture" className="w-full h-16 object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Batch Photo Import Modal */}
      <Modal
        isOpen={importOpen}
        onClose={() => setImportOpen(false)}
        title="Importer des photos"
        subtitle="Ajoutez plusieurs photos en lot dans un album existant."
        size="lg"
        footer={
          <>
            <SecondaryButton onClick={() => setImportOpen(false)}>Annuler</SecondaryButton>
            <PrimaryButton
              disabled={stagedPhotos.length === 0}
              onClick={handleCommitBatchImport}
            >
              Importer ({stagedPhotos.length})
            </PrimaryButton>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#203F52] mb-1.5">
              Album de destination
            </label>
            <select
              value={targetAlbumId}
              onChange={(e) => setTargetAlbumId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] bg-white text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
            >
              {albums.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title} ({a.photoCount} photos)
                </option>
              ))}
            </select>
          </div>

          <input
            ref={batchInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              handleBatchFiles(e.target.files);
              e.target.value = '';
            }}
          />

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleBatchFiles(e.dataTransfer.files);
            }}
            onClick={() => batchInputRef.current?.click()}
            className="rounded-2xl border-2 border-dashed border-[#DDD0BA] bg-[#FBF9F4] hover:border-[#4A9BD5] px-6 py-8 text-center cursor-pointer transition"
          >
            <Upload className="w-6 h-6 text-[#4A9BD5] mx-auto mb-2" />
            <p className="text-sm font-bold text-[#203F52]">
              Glissez vos photos ici ou cliquez pour parcourir
            </p>
            <p className="text-xs text-[#7C8F9B] mt-1">
              Sélection multiple JPG / PNG prise en charge
            </p>
          </div>

          {stagedPhotos.length > 0 && (
            <div>
              <div className="text-xs font-bold text-[#203F52] mb-2">
                {stagedPhotos.length} photo(s) prête(s) à importer
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {stagedPhotos.map((ph) => (
                  <div key={ph.id} className="relative rounded-xl overflow-hidden border border-[#E6D9C4]">
                    <img src={ph.url} alt={ph.caption} className="w-full h-24 object-cover" />
                    <button
                      type="button"
                      onClick={() =>
                        setStagedPhotos((prev) => prev.filter((item) => item.id !== ph.id))
                      }
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 text-[#E74732] flex items-center justify-center text-xs font-bold shadow cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Album Detail & Edit Modal */}
      <Modal
        isOpen={Boolean(activeAlbum)}
        onClose={() => setActiveAlbumId(null)}
        title={activeAlbum ? `Album · ${activeAlbum.title}` : ''}
        subtitle={
          activeAlbum
            ? `${activeAlbum.photoCount} photos · ${activeAlbum.updatedAt}`
            : undefined
        }
        size="xl"
        footer={
          activeAlbum && (
            <>
              <SecondaryButton onClick={() => setActiveAlbumId(null)}>Fermer</SecondaryButton>
              <PrimaryButton
                onClick={() => {
                  if (editTitle.trim()) {
                    onUpdateAlbum({
                      ...activeAlbum,
                      title: editTitle.trim(),
                      updatedAt: 'Mis à jour aujourd’hui',
                    });
                    setActiveAlbumId(null);
                  }
                }}
              >
                Enregistrer l'album
              </PrimaryButton>
            </>
          )
        }
      >
        {activeAlbum && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-end gap-3">
              <div className="flex-1">
                <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                  Titre de l'album
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                />
              </div>

              <div>
                <input
                  ref={albumUploadRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    handleBatchFiles(e.target.files, activeAlbum.id);
                    e.target.value = '';
                  }}
                />
                <SecondaryButton
                  icon={<Upload className="w-4 h-4" />}
                  onClick={() => albumUploadRef.current?.click()}
                >
                  Ajouter des photos
                </SecondaryButton>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-[#203F52] mb-2.5">
                Photos ({activeAlbum.photos.length} affichées sur {activeAlbum.photoCount})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {activeAlbum.photos.map((photo) => {
                  const isCover = activeAlbum.coverImage === photo.url;
                  return (
                    <div
                      key={photo.id}
                      className="rounded-xl border border-[#E6D9C4] overflow-hidden bg-[#FBF8F2]"
                    >
                      <div className="relative aspect-[16/10]">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                        />
                        {isCover && (
                          <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#3D9563] text-white text-[10px] font-bold">
                            <Check className="w-3 h-3" /> Couverture
                          </span>
                        )}
                      </div>
                      <div className="p-2.5 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateAlbum({
                              ...activeAlbum,
                              coverImage: photo.url,
                              updatedAt: 'Mis à jour aujourd’hui',
                            })
                          }
                          disabled={isCover}
                          className="text-[11px] font-semibold text-[#4A9BD5] hover:underline disabled:text-[#7C8F9B] disabled:no-underline cursor-pointer"
                        >
                          {isCover ? 'Couverture active' : 'Définir en couverture'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setConfirmPhotoDelete({ albumId: activeAlbum.id, photo })
                          }
                          aria-label="Supprimer la photo"
                          className="p-1.5 rounded-lg text-[#E74732] hover:bg-[#FDECE9] transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmationDialog
        isOpen={Boolean(confirmPhotoDelete)}
        onClose={() => setConfirmPhotoDelete(null)}
        onConfirm={() => {
          if (confirmPhotoDelete) {
            onDeletePhoto(confirmPhotoDelete.albumId, confirmPhotoDelete.photo.id);
          }
        }}
        title="Supprimer cette photo"
        message="La photo sera retirée de l'album public. Continuer ?"
        confirmLabel="Supprimer"
        tone="danger"
      />
    </div>
  );
};

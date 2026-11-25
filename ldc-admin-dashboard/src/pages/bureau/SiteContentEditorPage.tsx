import React, { useState } from 'react';
import { ChevronRight, FileText, Home, MapPin, Search, Users } from 'lucide-react';
import { SiteContentState, SitePageKey } from '../../types/ldc';
import { PrimaryButton, SecondaryButton } from '../../components/ui/Buttons';
import { ConfirmationDialog } from '../../components/ui/ConfirmationDialog';
import { LdcLogo } from '../../components/ui/LdcLogo';
import { Modal } from '../../components/ui/Modal';
import { PageHeader } from '../../components/ui/PageHeader';

interface SiteContentEditorPageProps {
  publishedContent: SiteContentState;
  onPublish: (nextContent: SiteContentState) => void;
  onSaveDraft: () => void;
}

const SITE_PAGES: Array<{
  key: SitePageKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { key: 'accueil', label: 'Accueil', icon: Home },
  { key: 'apropos', label: 'À propos', icon: FileText },
  { key: 'bureau', label: 'Membres du bureau', icon: Users },
  { key: 'contact', label: 'Contact', icon: MapPin },
];

export const SiteContentEditorPage: React.FC<SiteContentEditorPageProps> = ({
  publishedContent,
  onPublish,
  onSaveDraft,
}) => {
  const [selectedPage, setSelectedPage] = useState<SitePageKey>('accueil');
  const [draft, setDraft] = useState<SiteContentState>(publishedContent);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [confirmPublishOpen, setConfirmPublishOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const activeMeta = SITE_PAGES.find((p) => p.key === selectedPage)!;

  const updateField = <K extends SitePageKey>(
    page: K,
    field: keyof SiteContentState[K],
    value: string
  ) => {
    setHasUnsavedChanges(true);
    setDraft((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6 animate-fade-slide">
      <PageHeader
        title="Contenu du site"
        subtitle="Modifiez les textes et informations des pages publiques."
        actions={
          <>
            <SecondaryButton
              icon={<Search className="w-4 h-4" />}
              onClick={() => setPreviewOpen(true)}
            >
              Prévisualiser
            </SecondaryButton>
            <PrimaryButton onClick={() => setConfirmPublishOpen(true)}>
              Publier les modifications
            </PrimaryButton>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigation Panel */}
        <aside className="lg:col-span-3 bg-white border border-[#E6D9C4] rounded-2xl p-2.5 shadow-card space-y-1">
          {SITE_PAGES.map((item) => {
            const Icon = item.icon;
            const isActive = selectedPage === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setSelectedPage(item.key)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-[#F4ECDD] text-[#203F52] font-bold'
                    : 'text-[#6D818E] hover:bg-[#FBF8F2] hover:text-[#203F52]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </button>
            );
          })}
        </aside>

        {/* Right Editor Card */}
        <section className="lg:col-span-9 bg-white border border-[#E6D9C4] rounded-2xl p-6 sm:p-7 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E6D9C4]/70">
            <div>
              <h2 className="font-editorial text-lg font-bold text-[#203F52]">
                Page · {activeMeta.label}
              </h2>
              <p className="text-xs text-[#6D818E] mt-0.5">
                Les modifications restent en brouillon jusqu'à publication.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setHasUnsavedChanges(false);
                onSaveDraft();
              }}
              className="text-xs font-semibold text-[#4A9BD5] hover:underline self-start sm:self-center cursor-pointer"
            >
              {hasUnsavedChanges ? 'Enregistrer le brouillon' : 'Brouillon synchronisé'}
            </button>
          </div>

          {/* Fields per page */}
          {selectedPage === 'accueil' && (
            <div className="space-y-4 mt-5">
              <div>
                <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                  Surtitre
                </label>
                <input
                  type="text"
                  value={draft.accueil.surtitre}
                  onChange={(e) => updateField('accueil', 'surtitre', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#4D6372] focus:text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                  Titre principal
                </label>
                <input
                  type="text"
                  value={draft.accueil.titrePrincipal}
                  onChange={(e) => updateField('accueil', 'titrePrincipal', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#4D6372] focus:text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                  Introduction
                </label>
                <textarea
                  rows={5}
                  value={draft.accueil.introduction}
                  onChange={(e) => updateField('accueil', 'introduction', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#4D6372] focus:text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                  Texte du bouton
                </label>
                <input
                  type="text"
                  value={draft.accueil.texteBouton}
                  onChange={(e) => updateField('accueil', 'texteBouton', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#4D6372] focus:text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                />
              </div>
            </div>
          )}

          {selectedPage === 'apropos' && (
            <div className="space-y-4 mt-5">
              <div>
                <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                  Surtitre
                </label>
                <input
                  type="text"
                  value={draft.apropos.surtitre}
                  onChange={(e) => updateField('apropos', 'surtitre', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                  Titre principal
                </label>
                <input
                  type="text"
                  value={draft.apropos.titrePrincipal}
                  onChange={(e) => updateField('apropos', 'titrePrincipal', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                  Mission du club
                </label>
                <textarea
                  rows={4}
                  value={draft.apropos.mission}
                  onChange={(e) => updateField('apropos', 'mission', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                  Nos valeurs
                </label>
                <input
                  type="text"
                  value={draft.apropos.valeurs}
                  onChange={(e) => updateField('apropos', 'valeurs', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                />
              </div>
            </div>
          )}

          {selectedPage === 'bureau' && (
            <div className="space-y-4 mt-5">
              <div>
                <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                  Surtitre
                </label>
                <input
                  type="text"
                  value={draft.bureau.surtitre}
                  onChange={(e) => updateField('bureau', 'surtitre', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                  Titre principal
                </label>
                <input
                  type="text"
                  value={draft.bureau.titrePrincipal}
                  onChange={(e) => updateField('bureau', 'titrePrincipal', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                  Présentation de l'équipe
                </label>
                <textarea
                  rows={4}
                  value={draft.bureau.description}
                  onChange={(e) => updateField('bureau', 'description', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                  Composition affichée
                </label>
                <input
                  type="text"
                  value={draft.bureau.mandat}
                  onChange={(e) => updateField('bureau', 'mandat', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                />
              </div>
            </div>
          )}

          {selectedPage === 'contact' && (
            <div className="space-y-4 mt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                    Surtitre
                  </label>
                  <input
                    type="text"
                    value={draft.contact.surtitre}
                    onChange={(e) => updateField('contact', 'surtitre', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                    Titre principal
                  </label>
                  <input
                    type="text"
                    value={draft.contact.titrePrincipal}
                    onChange={(e) => updateField('contact', 'titrePrincipal', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                  Email officiel
                </label>
                <input
                  type="email"
                  value={draft.contact.email}
                  onChange={(e) => updateField('contact', 'email', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                  Adresse campus
                </label>
                <input
                  type="text"
                  value={draft.contact.adresse}
                  onChange={(e) => updateField('contact', 'adresse', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#203F52] mb-1.5">
                  Message d'accueil du formulaire
                </label>
                <textarea
                  rows={3}
                  value={draft.contact.messageAccueil}
                  onChange={(e) => updateField('contact', 'messageAccueil', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                />
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Live Preview Modal */}
      <Modal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={`Aperçu public · ${activeMeta.label}`}
        subtitle="Rendu simulé avec vos modifications actuelles."
        size="lg"
        footer={<SecondaryButton onClick={() => setPreviewOpen(false)}>Fermer l'aperçu</SecondaryButton>}
      >
        <div className="rounded-2xl border border-[#E6D9C4] bg-[#F7F3E9] p-8 text-center">
          <div className="flex justify-center mb-4">
            <LdcLogo size="md" />
          </div>
          {selectedPage === 'accueil' && (
            <>
              <span className="inline-block px-3 py-1 rounded-full bg-[#FAEBE0] text-[#C46A34] text-xs font-bold uppercase tracking-wider">
                {draft.accueil.surtitre}
              </span>
              <h3 className="font-editorial text-3xl font-extrabold text-[#203F52] mt-4">
                {draft.accueil.titrePrincipal}
              </h3>
              <p className="text-sm text-[#4D6372] mt-3 max-w-md mx-auto">
                {draft.accueil.introduction}
              </p>
              <div className="mt-6">
                <span className="inline-flex px-5 py-2.5 rounded-xl bg-[#F5B400] text-[#203F52] text-sm font-bold shadow-sm">
                  {draft.accueil.texteBouton}
                </span>
              </div>
            </>
          )}
          {selectedPage === 'apropos' && (
            <>
              <div className="text-xs font-bold uppercase tracking-wider text-[#4A9BD5]">
                {draft.apropos.surtitre}
              </div>
              <h3 className="font-editorial text-2xl font-extrabold text-[#203F52] mt-2">
                {draft.apropos.titrePrincipal}
              </h3>
              <p className="text-sm text-[#4D6372] mt-3 max-w-lg mx-auto">
                {draft.apropos.mission}
              </p>
              <p className="text-xs font-semibold text-[#3D9563] mt-4">{draft.apropos.valeurs}</p>
            </>
          )}
          {selectedPage === 'bureau' && (
            <>
              <div className="text-xs font-bold uppercase tracking-wider text-[#4A9BD5]">
                {draft.bureau.surtitre}
              </div>
              <h3 className="font-editorial text-2xl font-extrabold text-[#203F52] mt-2">
                {draft.bureau.titrePrincipal}
              </h3>
              <p className="text-sm text-[#4D6372] mt-3 max-w-lg mx-auto">
                {draft.bureau.description}
              </p>
              <p className="text-xs font-semibold text-[#203F52] mt-4 bg-white inline-block px-4 py-2 rounded-xl border border-[#E6D9C4]">
                {draft.bureau.mandat}
              </p>
            </>
          )}
          {selectedPage === 'contact' && (
            <>
              <div className="text-xs font-bold uppercase tracking-wider text-[#4A9BD5]">
                {draft.contact.surtitre}
              </div>
              <h3 className="font-editorial text-2xl font-extrabold text-[#203F52] mt-2">
                {draft.contact.titrePrincipal}
              </h3>
              <p className="text-sm text-[#4D6372] mt-3 max-w-md mx-auto">
                {draft.contact.messageAccueil}
              </p>
              <div className="mt-4 text-xs text-[#203F52] space-y-1 font-medium">
                <div>{draft.contact.email}</div>
                <div className="text-[#6D818E]">{draft.contact.adresse}</div>
              </div>
            </>
          )}
        </div>
      </Modal>

      <ConfirmationDialog
        isOpen={confirmPublishOpen}
        onClose={() => setConfirmPublishOpen(false)}
        onConfirm={() => {
          setHasUnsavedChanges(false);
          onPublish(draft);
        }}
        title="Publier les modifications"
        message="Les textes mis à jour seront immédiatement visibles sur le site public LDC by ESTIN. Confirmer la publication ?"
        confirmLabel="Publier"
        tone="primary"
      />
    </div>
  );
};

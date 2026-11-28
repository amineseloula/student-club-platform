import React, { useState } from 'react';
import { Calendar, Check, Mail, Megaphone, User, Users, Wallet, X } from 'lucide-react';
import {
  ClubCandidate,
  ContactMessage,
  EventBudget,
  GalleryAlbum,
  MembershipFee,
  NewsArticle,
  PageId,
} from '../../types/ldc';
import { formatDzd } from '../../utils/formatters';
import { PrimaryButton, SecondaryButton } from '../../components/ui/Buttons';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { SummaryCard } from '../../components/ui/SummaryCard';

interface BureauExtraPagesProps {
  page: PageId;
  articles: NewsArticle[];
  albums: GalleryAlbum[];
  events: EventBudget[];
  members: MembershipFee[];
  candidates: ClubCandidate[];
  messages: ContactMessage[];
  onNavigate: (page: PageId, space?: 'tresorier' | 'bureau') => void;
  onUpdateCandidate: (id: string, status: ClubCandidate['status']) => void;
  onMarkMessageRead: (id: string) => void;
  onNotify: (title: string, description?: string) => void;
}

export const BureauExtraPages: React.FC<BureauExtraPagesProps> = ({
  page,
  articles,
  albums,
  events,
  members,
  candidates,
  messages,
  onNavigate,
  onUpdateCandidate,
  onMarkMessageRead,
  onNotify,
}) => {
  const [announcementText, setAnnouncementText] = useState('');
  const [announcements, setAnnouncements] = useState([
    {
      id: 'ann-1',
      title: 'Inscriptions ouvertes · Sortie Lac Noir',
      audience: 'Tous les membres',
      date: '19 avr. 2025',
    },
    {
      id: 'ann-2',
      title: 'Réunion préparatoire SmashIT 2025',
      audience: 'Pôle Sport & Logistique',
      date: '15 avr. 2025',
    },
  ]);

  if (page === 'bureau-overview') {
    const pendingCount = candidates.filter((c) => c.status === 'en_attente').length;
    return (
      <div className="space-y-6 animate-fade-slide">
        <PageHeader
          title="Vue d'ensemble Bureau"
          subtitle="Pilotage administratif et éditorial du club LDC by ESTIN."
          actions={
            <PrimaryButton onClick={() => onNavigate('actualites')}>
              Gérer les actualités
            </PrimaryButton>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <SummaryCard
            variant="navy"
            title="Membres actifs"
            value="284"
            subtitle="Mandat 2024–2025"
            icon={<Users className="w-6 h-6 text-[#F5B400]" />}
          />
          <SummaryCard
            title="Candidatures en attente"
            value={String(pendingCount + 3)}
            subtitle="À examiner par le Bureau"
          />
          <SummaryCard
            title="Articles publiés"
            value={String(articles.filter((a) => a.status === 'publie').length)}
            subtitle={`${articles.length} articles au total`}
          />
          <SummaryCard
            title="Albums galerie"
            value={String(albums.length)}
            subtitle={`${albums.reduce((s, a) => s + a.photoCount, 0)} photos en ligne`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <button
            type="button"
            onClick={() => onNavigate('actualites')}
            className="text-left bg-white border border-[#E6D9C4] rounded-2xl p-5 shadow-card hover:shadow-elevated transition cursor-pointer"
          >
            <StatusBadge label="SITE PUBLIC" variant="blue" />
            <h3 className="font-editorial text-lg font-bold text-[#203F52] mt-3">
              Actualités du site
            </h3>
            <p className="text-xs text-[#6D818E] mt-1">
              Publiez de nouveaux articles et gérez les brouillons.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('galerie')}
            className="text-left bg-white border border-[#E6D9C4] rounded-2xl p-5 shadow-card hover:shadow-elevated transition cursor-pointer"
          >
            <StatusBadge label="MÉDIAS" variant="green" />
            <h3 className="font-editorial text-lg font-bold text-[#203F52] mt-3">
              Galerie du site
            </h3>
            <p className="text-xs text-[#6D818E] mt-1">
              Créez des albums et importez les photos des événements.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('pages-site')}
            className="text-left bg-white border border-[#E6D9C4] rounded-2xl p-5 shadow-card hover:shadow-elevated transition cursor-pointer"
          >
            <StatusBadge label="CMS" variant="orange" />
            <h3 className="font-editorial text-lg font-bold text-[#203F52] mt-3">
              Pages du site
            </h3>
            <p className="text-xs text-[#6D818E] mt-1">
              Éditez les textes Accueil, À propos, Bureau et Contact.
            </p>
          </button>
        </div>
      </div>
    );
  }

  if (page === 'bureau-evenements') {
    return (
      <div className="space-y-6 animate-fade-slide">
        <PageHeader
          title="Événements du club"
          subtitle="Calendrier et suivi organisationnel des activités."
          actions={
            <SecondaryButton
              icon={<Wallet className="w-4 h-4" />}
              onClick={() => onNavigate('budgets-evenements', 'tresorier')}
            >
              Voir les budgets
            </SecondaryButton>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white border border-[#E6D9C4] rounded-2xl p-5 shadow-card flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E6F2FA] text-[#4A9BD5] flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-editorial text-base font-bold text-[#203F52]">{ev.name}</h3>
                  <p className="text-xs text-[#6D818E]">
                    Budget alloué : {formatDzd(ev.planned)}
                  </p>
                </div>
              </div>
              <StatusBadge
                label={ev.actual > 0 ? 'En cours' : 'Planifié'}
                variant={ev.actual > 0 ? 'green' : 'gray'}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (page === 'bureau-annonces') {
    return (
      <div className="space-y-6 animate-fade-slide">
        <PageHeader
          title="Annonces internes"
          subtitle="Diffusez des communications aux membres du club."
        />
        <div className="bg-white border border-[#E6D9C4] rounded-2xl p-6 shadow-card space-y-4">
          <label className="block text-xs font-bold text-[#203F52]">Nouvelle annonce</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="Ex : Permanence bureau jeudi à 12h30..."
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] text-sm text-[#203F52]"
            />
            <PrimaryButton
              icon={<Megaphone className="w-4 h-4" />}
              onClick={() => {
                if (!announcementText.trim()) return;
                setAnnouncements((prev) => [
                  {
                    id: `ann-${Date.now()}`,
                    title: announcementText.trim(),
                    audience: 'Tous les membres',
                    date: '21 avr. 2025',
                  },
                  ...prev,
                ]);
                setAnnouncementText('');
                onNotify('Annonce publiée', 'Visible dans l’espace membre.');
              }}
            >
              Publier
            </PrimaryButton>
          </div>
        </div>
        <div className="space-y-3">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="bg-white border border-[#E6D9C4] rounded-2xl p-5 shadow-card flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-editorial text-base font-bold text-[#203F52]">{a.title}</h3>
                <p className="text-xs text-[#6D818E] mt-0.5">
                  {a.audience} · {a.date}
                </p>
              </div>
              <StatusBadge label="DIFFUSÉE" variant="green" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (page === 'bureau-membres') {
    return (
      <div className="space-y-6 animate-fade-slide">
        <PageHeader
          title="Membres du club"
          subtitle="Annuaire des membres inscrits pour le mandat 2024–2025."
          actions={
            <SecondaryButton onClick={() => onNavigate('cotisations', 'tresorier')}>
              Suivi des cotisations
            </SecondaryButton>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((m) => (
            <div
              key={m.id}
              className="bg-white border border-[#E6D9C4] rounded-2xl p-4 shadow-card flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#203F52] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {m.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#203F52] truncate">{m.name}</div>
                  <div className="text-xs text-[#6D818E]">N° {m.memberNumber}</div>
                </div>
              </div>
              <StatusBadge
                label={m.status === 'payee' ? 'Actif' : 'À régulariser'}
                variant={m.status === 'payee' ? 'green' : 'orange'}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (page === 'bureau-candidatures') {
    return (
      <div className="space-y-6 animate-fade-slide">
        <PageHeader
          title="Candidatures"
          subtitle="Examinez les demandes d'adhésion des étudiants ESTIN."
        />
        <div className="space-y-3">
          {candidates.map((cand) => (
            <div
              key={cand.id}
              className="bg-white border border-[#E6D9C4] rounded-2xl p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#4A9BD5] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {cand.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-editorial text-base font-bold text-[#203F52]">
                      {cand.name}
                    </h3>
                    <StatusBadge label={cand.pole} variant="blue" />
                  </div>
                  <p className="text-xs text-[#6D818E] mt-0.5">
                    {cand.year} · Reçue le {cand.submittedAt}
                  </p>
                  <p className="text-xs text-[#4D6372] mt-1.5">{cand.motivation}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {cand.status === 'en_attente' ? (
                  <>
                    <SecondaryButton
                      icon={<X className="w-3.5 h-3.5" />}
                      onClick={() => onUpdateCandidate(cand.id, 'refusee')}
                      className="py-2 px-3 text-xs"
                    >
                      Refuser
                    </SecondaryButton>
                    <PrimaryButton
                      icon={<Check className="w-3.5 h-3.5" />}
                      onClick={() => onUpdateCandidate(cand.id, 'acceptee')}
                      className="py-2 px-3 text-xs"
                    >
                      Accepter
                    </PrimaryButton>
                  </>
                ) : (
                  <StatusBadge
                    label={cand.status === 'acceptee' ? 'ACCEPTÉE' : 'REFUSÉE'}
                    variant={cand.status === 'acceptee' ? 'green' : 'red'}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (page === 'bureau-budget') {
    return (
      <div className="space-y-6 animate-fade-slide">
        <PageHeader
          title="Aperçu Budget"
          subtitle="Synthèse financière partagée avec le Bureau exécutif."
          actions={
            <PrimaryButton onClick={() => onNavigate('vue-financiere', 'tresorier')}>
              Ouvrir l'Espace Trésorier
            </PrimaryButton>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard
            variant="navy"
            title="Solde club"
            value="184 250 DZD"
            subtitle="Disponible après engagements"
          />
          <SummaryCard
            title="Recettes d'avril"
            value="128 500 DZD"
            subtitle="+18,2% vs mars"
          />
          <SummaryCard
            title="Dépenses d'avril"
            value="86 450 DZD"
            subtitle="72% du budget mensuel"
          />
        </div>
      </div>
    );
  }

  if (page === 'bureau-messages') {
    return (
      <div className="space-y-6 animate-fade-slide">
        <PageHeader
          title="Messages contact"
          subtitle="Messages reçus depuis le formulaire de contact du site public."
        />
        <div className="bg-white border border-[#E6D9C4] rounded-2xl shadow-card divide-y divide-[#E6D9C4]/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => onMarkMessageRead(msg.id)}
              className={`p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-[#FBF8F2] transition ${
                msg.unread ? 'bg-[#FFFDF8]' : ''
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#E6F2FA] text-[#4A9BD5] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-[#203F52]">{msg.sender}</span>
                    {msg.unread && <StatusBadge label="NOUVEAU" variant="yellow" />}
                  </div>
                  <div className="text-xs font-semibold text-[#203F52] mt-0.5">{msg.subject}</div>
                  <p className="text-xs text-[#6D818E] mt-0.5 truncate">{msg.preview}</p>
                </div>
              </div>
              <span className="text-[11px] text-[#7C8F9B] shrink-0">{msg.date}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Shared: Mon espace membre
  return (
    <div className="space-y-6 animate-fade-slide">
      <PageHeader
        title="Mon espace membre"
        subtitle="Informations personnelles et accès au mandat 2024–2025."
      />
      <div className="bg-white border border-[#E6D9C4] rounded-2xl p-6 shadow-card max-w-2xl">
        <div className="flex items-center gap-4 pb-5 border-b border-[#E6D9C4]/70">
          <div className="w-14 h-14 rounded-full bg-[#3D9563] text-white font-bold text-lg flex items-center justify-center">
            AM
          </div>
          <div>
            <h2 className="font-editorial text-xl font-bold text-[#203F52]">Amine Meziane</h2>
            <p className="text-xs text-[#6D818E]">
              Trésorier & Membre du Bureau · N° membre 2025-001
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 text-sm">
          <div>
            <span className="text-xs text-[#6D818E] block">Email ESTIN</span>
            <span className="font-semibold text-[#203F52]">a.meziane@estin.dz</span>
          </div>
          <div>
            <span className="text-xs text-[#6D818E] block">Cotisation 2024–2025</span>
            <StatusBadge label="PAYÉE" variant="green" />
          </div>
          <div>
            <span className="text-xs text-[#6D818E] block">Accès administrateur</span>
            <span className="font-semibold text-[#203F52]">Trésorier & Bureau</span>
          </div>
          <div>
            <span className="text-xs text-[#6D818E] block">Rôle rapide</span>
            <button
              type="button"
              onClick={() => onNavigate('vue-financiere', 'tresorier')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4A9BD5] hover:underline cursor-pointer"
            >
              <User className="w-3.5 h-3.5" /> Retour au tableau financier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

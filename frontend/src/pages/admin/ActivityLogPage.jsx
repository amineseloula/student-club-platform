import { useMemo, useState } from 'react';

const initial = [
  ['Amine Meziane', 'a publié l’annonce', 'Inscriptions ouvertes · Sortie Lac Noir', 'Aujourd’hui · 09:42', 'Contenu'],
  ['Yasmine Amrani', 'a validé la candidature de', 'Nassim B.', 'Hier · 16:18', 'Membres'],
  ['Riad Saadi', 'a ajouté une transaction', 'Location bus — Lac Noir · 42 000 DZD', 'Hier · 11:05', 'Budget'],
  ['Amine Meziane', 'a modifié les paramètres', 'Année académique 2024–2025', '18 avr. 2025 · 14:30', 'Paramètres'],
  ['Lina Nouri', 'a créé l’événement', 'Tournoi de Volleyball', '17 avr. 2025 · 10:12', 'Événement'],
];

export default function ActivityLogPage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const filtered = useMemo(() => initial.filter((row) => `${row.join(' ')}`.toLowerCase().includes(query.toLowerCase()) && (!type || row[4] === type)), [query, type]);
  const exportLog = () => {
    const csv = ['Utilisateur,Action,Détail,Date,Type', ...filtered.map((r) => r.map((v) => `"${v.replaceAll('"', '""')}"`).join(','))].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'journal-activite-ldc.csv'; link.click(); URL.revokeObjectURL(url);
  };
  return <div className="space-y-6 animate-fade-slide">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="font-editorial text-3xl font-bold text-[#203F52]">Journal d’activité</h1><p className="text-sm text-[#6D818E] mt-1">Traçabilité complète des actions sensibles du club.</p></div><button onClick={exportLog} className="px-4 py-2.5 rounded-xl bg-white border border-[#E6D9C4] text-sm font-bold text-[#203F52]">↓ Exporter le journal</button></div>
    <div className="flex flex-wrap gap-3"><label className="flex-1 min-w-[240px] flex items-center gap-2 bg-white border border-[#E6D9C4] rounded-xl px-4"><span className="text-[#6D818E]">⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher une action ou un membre..." className="w-full py-3 outline-none text-sm" /></label><select value={type} onChange={(e) => setType(e.target.value)} className="bg-white border border-[#E6D9C4] rounded-xl px-4 text-sm"><option value="">Action : toutes</option>{['Contenu','Membres','Budget','Paramètres','Événement'].map((v) => <option key={v}>{v}</option>)}</select></div>
    <section className="bg-white border border-[#E6D9C4] rounded-2xl shadow-card overflow-hidden"><ul className="divide-y divide-[#E6D9C4]">{filtered.map((row) => <li key={`${row[0]}-${row[2]}`} className="flex items-center gap-4 p-5"><span className="w-10 h-10 rounded-full bg-[#3D9563] text-white grid place-items-center font-bold">{row[0].split(' ').map((p) => p[0]).join('')}</span><div className="flex-1 text-sm text-[#203F52]"><strong>{row[0]}</strong> {row[1]} <strong>{row[2]}</strong><small className="block mt-1 text-xs text-[#6D818E]">{row[3]}</small></div><span className="px-3 py-1.5 rounded-full bg-[#E8EFF8] text-[#3C6AA0] text-[10px] font-bold uppercase">{row[4]}</span></li>)}{filtered.length === 0 && <li className="p-10 text-center text-sm text-[#6D818E]">Aucune action ne correspond à ces filtres.</li>}</ul><footer className="flex justify-between p-4 text-xs text-[#6D818E]"><span>{filtered.length} actions</span><span>Page 1 / 1</span></footer></section>
  </div>;
}

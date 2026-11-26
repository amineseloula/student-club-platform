import {
  Sun, Clock, FileText, Calendar, Megaphone, Users, Bell, PenLine, Upload, Home, User,
} from "lucide-react";

/* `roles` = who sees the item AND who may open the route. */
export const NAV = [
  { path: "settings", label: "Paramètres du club", icon: Sun, roles: ["president"] },
  { path: "journal", label: "Journal d’activité", icon: Clock, roles: ["president"] },
  { path: "report", label: "Rapport annuel", icon: FileText, roles: ["president"] },
  { path: "events", label: "Événements", icon: Calendar, roles: ["president", "board"] },
  { path: "announcements", label: "Annonces", icon: Megaphone, roles: ["president", "board"] },
  { path: "members", label: "Membres", icon: Users, roles: ["president", "board"] },
  { path: "messages", label: "Messages contact", icon: Bell, roles: ["president", "board"] },
  { path: "news", label: "Actualités", icon: PenLine, roles: ["president", "board"] },
  { path: "gallery", label: "Galerie", icon: Upload, roles: ["president", "board"] },
  { path: "content", label: "Contenu du site", icon: Home, roles: ["president", "board"] },
];

export const MEMBER_ITEM = { path: "member", label: "Mon espace membre", icon: User, roles: ["president", "board", "member"] };

export const navFor = (user) =>
  user?.role === "member" ? [MEMBER_ITEM] : NAV.filter((n) => n.roles.includes(user?.role));

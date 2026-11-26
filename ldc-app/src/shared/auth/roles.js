/* Role -> where the user lands after login, and what a status forces. */
export const isStaff = (user) => user?.role === "president" || user?.role === "board";

export function homeFor(user) {
  if (!user) return "/login";
  if (user.status === "pending") return "/application/pending";
  if (user.status === "rejected") return "/application/rejected";
  if (isStaff(user)) return "/dashboard";
  return "/dashboard/member";
}

/* Can this user open a route that requires one of `roles`? (undefined = any approved user) */
export const canAccess = (user, roles) =>
  !!user && user.status === "approved" && (!roles || roles.includes(user.role));

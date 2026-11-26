import { request, USE_MOCK } from "./client.js";
import { settingsMock } from "./mock/settings.mock.js";

/* Club settings. Every route is PRESIDENT-ONLY: the backend must answer 403 to other roles.
   Club         { fullName, shortName, school, founded, slogan, tagline, email, phone }
   Calendar     { year:{label,start,end}, terms:[{id,name,start,end}], breaks:[{id,name,start,end}] }  (dates: YYYY-MM-DD)
   Category     { id, name, color:"#rrggbb", description, active }
   BudgetClass  { id, code, name, type:"income"|"expense", ceiling:number|null, active }
   Validation errors: 409/422 with { message, fields:{ name: "..." } } */
const crud = (path) => ({
  list: () => request(path),
  create: (data) => request(path, { method: "POST", body: data }),
  update: (id, data) => request(`${path}/${id}`, { method: "PUT", body: data }),
  remove: (id) => request(`${path}/${id}`, { method: "DELETE" }),
});

const real = {
  getClub: () => request("/settings/club"),
  updateClub: (data) => request("/settings/club", { method: "PUT", body: data }),
  getCalendar: () => request("/settings/calendar"),
  updateCalendar: (data) => request("/settings/calendar", { method: "PUT", body: data }),
  categories: crud("/settings/event-categories"),
  budgetClasses: crud("/settings/budget-classes"),
};

export const settingsApi = USE_MOCK ? settingsMock : real;

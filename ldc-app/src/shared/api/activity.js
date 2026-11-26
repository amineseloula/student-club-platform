import { request, USE_MOCK } from "./client.js";
import { activityMock } from "./mock/activity.mock.js";

/* Audit trail. PRESIDENT-ONLY (403 otherwise).
   GET /activity?q=&actorId=&type=&from=YYYY-MM-DD&to=YYYY-MM-DD&page=1&pageSize=10
     -> { items: Entry[], total, page, pageSize }
   Entry: { id, actor:{id,name,ini,color}, verb, what, type, at:ISO date }
          type in: event | budget | member | content | report | settings | auth
   GET /activity/actors -> [{ id, name }]            (fills the "user" filter)
   GET /activity/export?<same filters> -> CSV file (blob) */
const real = {
  list: (params) => request("/activity", { params }),
  listActors: () => request("/activity/actors"),
  exportCsv: (params) => request("/activity/export", { params, blob: true }),
};

export const activityApi = USE_MOCK ? activityMock : real;

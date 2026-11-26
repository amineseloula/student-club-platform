# LDC – front-end (auth, status pages, president dashboard)

Vite + React + React Router, plain CSS. **Front-end only**: everything runs on in-browser mock data
until the backend exists. Switching to the real API is one env variable (see below).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
```

## Pages covered

| Page | Route | Notes |
|---|---|---|
| 10 Sign up | `/signup` | Student ID, field of study, study year, password strength meter, validation, server-side field errors |
| 11 Login | `/login` | Redirect by status then role (see below), "remember me", returns to the page you were trying to open |
| 12 Forgot password | `/forgot-password` | Sent confirmation, 30 s resend cooldown, no account enumeration |
| 13 Reset password | `/reset-password?token=…` | Token validated on open: checking / valid / invalid / expired / done |
| 14 Pending | `/application/pending` | Next-steps breakdown, application recap, **Vérifier mon statut** re-check |
| 15 Rejected | `/application/rejected` | Optional reason from the board, contact links (config.js) |
| 16 404 | `*` | Illustration + home / back / my-space navigation |
| 17 403 | `/403` | Current role badge + return path |
| 39 Club settings | `/dashboard/settings?tab=` | President only. Info · Academic calendar · Event categories · Budget classes |
| 40 Activity log | `/dashboard/journal` | President only. Search, user / action / date filters, pagination, CSV export |
| 41 Annual report | `/dashboard/report` | President only. KPIs, charts, year switch, PDF trigger |

The language switch has been removed everywhere (component, imports, CSS).

## Frontend handoff notes

- The notification bell now opens an honest empty-state panel; it is not connected to a notification service yet.
- Buttons, tabs, icon actions and pagination share a consistent reset and keyboard-focus treatment.
- The login return-path check accounts for role-restricted dashboard routes, including routes with query strings.
- Password-reset mock links are created only for an existing demo account; the public confirmation remains the same for unknown e-mails.
- Demo names, contact details, mandate dates, academic dates and report figures are sample data. Replace them with approved club information or backend responses before release.

## Role / status redirect rules

`shared/auth/roles.js` → `homeFor(user)`:
pending → `/application/pending` · rejected → `/application/rejected` · president/board → `/dashboard` · member → `/dashboard/member`.
Route guards (`shared/auth/guards.jsx`): no session → `/login`, wrong role → `/403`, pending/rejected → their status page.
Which role sees which dashboard page is declared once in `features/dashboard/nav.js`.

## Demo accounts (mock mode)

Password for all: `Password1!`
`president@estin.dz` · `board@estin.dz` · `member@estin.dz` · `pending@estin.dz` · `rejected@estin.dz`

Console helpers in `npm run dev`:
`__ldcMock.setStatus("pending@estin.dz","approved")` then click "Vérifier mon statut" · `__ldcMock.reset()` wipes mock data.
Mock password-reset links are shown on the "sent" screen in dev; `?token=demo-valid` and `?token=expired` always work.

## Connecting the backend (next week)

1. Copy `.env.example` to `.env`, set `VITE_USE_MOCK=false` and `VITE_API_URL=https://…/api`.
2. Every request lives in `src/shared/api/*.js` (`auth`, `settings`, `activity`, `reports`). Each file has the real
   calls and a comment with the exact shape expected. The mock (`api/mock/`) has the same function signatures,
   so no page code changes.
3. Auth: the token returned by login/register is sent as `Authorization: Bearer <token>`. Any `401` logs the user out.
4. Errors: return `{ "message": "...", "code": "...", "fields": { "email": "déjà utilisé" } }` and the forms display it.
5. Enforce roles on the server too (settings, activity, reports = president only); the guards are only UX.

| Endpoint | Used by |
|---|---|
| `POST /auth/login` `{email,password,remember}` → `{token,user}` | Login |
| `POST /auth/register` `{firstName,lastName,email,studentId,fieldOfStudy,studyYear,password}` → `{token,user}` (status `pending`) | Sign up |
| `GET /auth/me` → `user` | session sync, "Vérifier mon statut" |
| `POST /auth/logout` | Logout |
| `POST /auth/forgot-password` `{email}` · `GET /auth/reset-password/validate?token=` (400 `TOKEN_INVALID` / 410 `TOKEN_EXPIRED`) · `POST /auth/reset-password` `{token,password}` | Forgot / reset |
| `GET/PUT /settings/club`, `GET/PUT /settings/calendar` | Settings tabs 1–2 |
| `GET/POST/PUT/DELETE /settings/event-categories[/:id]`, `/settings/budget-classes[/:id]` | Settings tabs 3–4 |
| `GET /activity?q&actorId&type&from&to&page&pageSize`, `GET /activity/actors`, `GET /activity/export` (CSV) | Activity log |
| `GET /reports/annual/years`, `GET /reports/annual/:year`, `POST /reports/annual/:year/pdf` | Annual report |

Data shapes are documented at the top of each `shared/api/*.js` file (the report shape is in `mock/reports.mock.js`).

**PDF**: while the backend has no PDF generator, the button opens the browser print dialog ("Save as PDF") with
print CSS already prepared. Once `POST …/pdf` exists, the same button downloads the file.

## Config you may want to adjust (`src/shared/config.js`)

`STUDENT_EMAIL_DOMAIN` (set to `null` to accept any e-mail), `STUDENT_ID_PATTERN`, field-of-study list, study years,
board contact links, `SITE_URL`.

## Folders

```
src/
  features/auth/        AuthLayout, login, signup, forgot / reset
  features/status/      pending, rejected, 403, 404 (+ Scene illustration)
  features/dashboard/   layout, nav (roles), settings/ (4 tabs), activity log, annual report
  shared/
    api/                client.js, session.js, auth|settings|activity|reports.js, mock/
    auth/               AuthContext, guards, roles
    components/         Field, PasswordField, PasswordStrength, Modal, Toast, charts, …
    hooks/ utils/ styles/ config.js images.js
```

import { request, USE_MOCK } from "./client.js";
import { authMock } from "./mock/auth.mock.js";

/* Real backend contract.
   Session shape returned by login/register: { token: string, user: User }
   User: { id, firstName, lastName, email, studentId, fieldOfStudy, studyYear,
           role: "president"|"board"|"member", status: "pending"|"approved"|"rejected",
           rejectionReason: string|null, submittedAt: ISO date } */
const real = {
  login: ({ email, password, remember }) => request("/auth/login", { method: "POST", body: { email, password, remember } }),
  register: (data) => request("/auth/register", { method: "POST", body: data }),
  me: () => request("/auth/me"),
  logout: () => request("/auth/logout", { method: "POST" }),
  requestPasswordReset: ({ email }) => request("/auth/forgot-password", { method: "POST", body: { email } }),
  validateResetToken: ({ token }) => request("/auth/reset-password/validate", { params: { token } }),
  resetPassword: ({ token, password }) => request("/auth/reset-password", { method: "POST", body: { token, password } }),
};

export const authApi = USE_MOCK ? authMock : real;

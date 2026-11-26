import { useState } from 'react';
import {
  getStoredUser,
  isBoardRole,
  loginWithEmail,
  logoutUser,
  registerVisitorAccount,
} from '../services/authService';
import { AuthContext } from './useAuth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());

  const login = (email) => {
    const result = loginWithEmail(email);
    if (result.ok) {
      setUser(result.user);
    }
    return result;
  };

  const registerVisitor = (payload) => {
    const result = registerVisitorAccount(payload);
    if (result.ok) {
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isBoardMember: Boolean(user && isBoardRole(user.role)),
    login,
    registerVisitor,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

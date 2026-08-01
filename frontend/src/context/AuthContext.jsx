import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  getAuthSnapshot,
  getCurrentUser,
  isAuthenticated,
  login as loginRequest,
  logout as logoutRequest,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const snapshot = getAuthSnapshot();
  const [user, setUser] = useState(snapshot.user);
  const [authenticated, setAuthenticated] = useState(Boolean(snapshot.accessToken));
  const [isHydrating, setIsHydrating] = useState(Boolean(snapshot.accessToken) && !snapshot.user);

  useEffect(() => {
    let isMounted = true;

    const hydrateUser = async () => {
      if (!isAuthenticated()) {
        if (isMounted) {
          setIsHydrating(false);
          setAuthenticated(false);
          setUser(null);
        }
        return;
      }

      if (snapshot.user) {
        if (isMounted) {
          setIsHydrating(false);
          setAuthenticated(true);
        }
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        if (!isMounted) return;
        localStorage.setItem('current_user', JSON.stringify(currentUser));
        setUser(currentUser);
        setAuthenticated(true);
      } catch {
        if (!isMounted) return;
        await logoutRequest();
        setUser(null);
        setAuthenticated(false);
      } finally {
        if (isMounted) {
          setIsHydrating(false);
        }
      }
    };

    hydrateUser();

    return () => {
      isMounted = false;
    };
    // snapshot is intentionally omitted to avoid refetching after every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (username, password) => {
    const result = await loginRequest(username, password);
    setUser(result.user);
    setAuthenticated(true);
    setIsHydrating(false);
    return result.user;
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
    setAuthenticated(false);
  };

  const value = useMemo(() => ({
    user,
    authenticated,
    isHydrating,
    login,
    logout,
    setUser,
    setAuthenticated,
  }), [authenticated, isHydrating, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

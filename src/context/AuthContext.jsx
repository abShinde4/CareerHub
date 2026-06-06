import { useState, useEffect } from 'react';
import { AuthContext } from './authContextValue';

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('careerhub-admin');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (admin?.token) {
      localStorage.setItem('careerhub-admin-token', admin.token);
      localStorage.setItem('careerhub-admin', JSON.stringify(admin));
    }
  }, [admin]);

  const login = (data) => setAdmin(data);
  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('careerhub-admin-token');
    localStorage.removeItem('careerhub-admin');
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuthenticated: !!admin?.token }}>
      {children}
    </AuthContext.Provider>
  );
}

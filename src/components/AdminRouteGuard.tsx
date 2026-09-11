import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Loader2 } from 'lucide-react';
import { AdminView } from '../views/AdminView';
import { AdminLoginView } from '../views/AdminLoginView';
import { useApp } from '../context/AppContext';

export const AdminRouteGuard: React.FC = () => {
  const { showToast } = useApp();
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<{ email: string; role: string } | null>(null);

  // Check admin session with the server
  useEffect(() => {
    let isMounted = true;

    async function verifySession() {
      try {
        const response = await fetch('/api/admin/session', {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          },
          credentials: 'include' // Send HttpOnly cookie
        });

        if (!isMounted) return;

        if (response.ok) {
          const data = await response.json();
          if (data.authenticated && data.user && data.user.role === 'admin') {
            setIsAuthenticated(true);
            setAdminUser(data.user);
          } else {
            setIsAuthenticated(false);
            setAdminUser(null);
          }
        } else {
          setIsAuthenticated(false);
          setAdminUser(null);
        }
      } catch (err) {
        if (!isMounted) return;
        setIsAuthenticated(false);
        setAdminUser(null);
      } finally {
        if (isMounted) {
          setChecking(false);
        }
      }
    }

    verifySession();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLoginSuccess = (user: { email: string; role: string }) => {
    setIsAuthenticated(true);
    setAdminUser(user);
    showToast('Admin session verified. Welcome back!');
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch {
      // Ignore network errors during logout
    } finally {
      setIsAuthenticated(false);
      setAdminUser(null);
      showToast('Admin session terminated. You have been logged out.');
    }
  };

  // Loading state while verifying server session
  if (checking) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-2">
          <Shield className="w-3.5 h-3.5 text-indigo-500" />
          <span>Security Verification</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
          Verifying Admin Authorization...
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
          Checking HttpOnly session credentials and authorization roles with the secure gateway.
        </p>
      </div>
    );
  }

  // If authenticated as admin, render full Admin Hub
  if (isAuthenticated && adminUser) {
    return <AdminView onLogout={handleLogout} adminEmail={adminUser.email} />;
  }

  // Otherwise, render secure Login portal
  return <AdminLoginView onLoginSuccess={handleLoginSuccess} />;
};

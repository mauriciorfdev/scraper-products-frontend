import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
  getMe,
  loginService,
  logoutService,
  registerService,
} from '../services/authService';
import type {
  LoginData,
  AuthContextType,
  User,
  RegisterData,
} from '../src/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const user = await getMe();
      console.log(user);
      setUser(user);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginAuth = async (credentials: LoginData) => {
    await loginService(credentials); //genera cookie
    await checkAuth();
  };

  const logoutAuth = async () => {
    try {
      await logoutService();
    } finally {
      setUser(null);
    }
  };

  const registerAuth = async (credentials: RegisterData) => {
    await registerService(credentials);
  };

  return (
    <AuthContext
      value={{ user, checkAuth, loading, loginAuth, logoutAuth, registerAuth }}
    >
      {children}
    </AuthContext>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error('Debe usar useAuth dentro de AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getMe, loginService } from '../services/authService';

interface User {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  checkAuth: () => void;
  loginAuth: (credentials: LoginData) => Promise<void>;
}

interface LoginData {
  email: string;
  password: string;
}

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

  return (
    <AuthContext value={{ user, checkAuth, loading, loginAuth }}>
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

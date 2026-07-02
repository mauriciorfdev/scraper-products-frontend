export type FilterMode = 'include' | 'exclude';

export type ThemeMode = 'light' | 'dark';

export type IngredientFilters = {
  search: string;
  filterMode: FilterMode;
};

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
  loginAuth: (credentials: LoginData) => Promise<void>;
  logoutAuth: () => Promise<void>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

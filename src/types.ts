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

export interface RegisterData extends LoginData {
  name: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
  loginAuth: (credentials: LoginData) => Promise<void>;
  logoutAuth: () => Promise<void>;
  registerAuth: (credentials: RegisterData) => Promise<void>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

//api error from backend
export interface ApiErrorResponse {
  message: string;
  errors?: {
    path: string;
    message: string;
  }[];
}

//api error on frontend service
export interface ApiError extends ApiErrorResponse {
  status: number;
}

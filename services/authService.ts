const API_URL = import.meta.env.VITE_API_URL;
import type { LoginData, RegisterData } from '../src/types';

const loginService = async (credentials: LoginData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include', //indica a la peticion incluir credenciales del servidor
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  console.log(data);

  if (!response.ok)
    throw {
      status: response.status,
      message: data.message,
      errors: data.errors,
    };

  return data;
};

const getMe = async () => {
  const response = await fetch(`${API_URL}/auth/me`, {
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message); //msje backend
  }
  return data;
};

const logoutService = async () => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include', //indica a la peticion incluir credenciales del servidor
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error(data.message); //msje backend
  }
  return data;
};

const registerService = async (credentials: RegisterData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error(data.message); //msje backend
  }
  return data;
};

export { loginService, getMe, logoutService, registerService };

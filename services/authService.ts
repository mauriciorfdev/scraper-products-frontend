const API_URL = import.meta.env.VITE_API_URL;

interface LoginData {
  email: string;
  password: string;
}

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

  if (!response.ok) throw new Error('Error al obtener datos');

  return data;
};

const getMe = async () => {
  const response = await fetch(`${API_URL}/auth/me`, {
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg); //msje backend
  }
  return data;
};

export { loginService, getMe };

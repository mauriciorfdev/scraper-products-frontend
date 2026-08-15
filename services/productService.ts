const API_URL = import.meta.env.VITE_API_URL;
import { ApiError } from '../src/errors/ApiError';

const analyzeProductService = async (productId: string) => {
  const url = `${API_URL}/products/${productId}/analysis`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new ApiError(data.message, response.status, data.errors);
  }

  return data;
};

export { analyzeProductService };

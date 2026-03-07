const BASE_URL = 'https://dummyjson.com/products';

export const getProducts = async (limit = 8, skip = 0) => {
  try {
    const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
    return await response.json();
  } catch (error) {
    return { products: [], total: 0 };
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search?q=${query}`);
    return await response.json();
  } catch (error) {
    return { products: [], total: 0 };
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    return await response.json();
  } catch (error) {
    return null;
  }
};
// api.js
const API_URL = 'https://api.udhhyog.com/v1/test';

export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
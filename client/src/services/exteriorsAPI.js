const API_BASE = 'http://localhost:3001/api';

export const getAllWheels = async () => {
  const response = await fetch(`${API_BASE}/wheels`);
  if (!response.ok) throw new Error('Failed to fetch wheels');
  return response.json();
};